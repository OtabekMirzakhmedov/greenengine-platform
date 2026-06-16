import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Building2,
  Edit,
  Globe2,
  Leaf,
  Map,
  Plus,
  Target,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import type { GoalObjective } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

type GoalObjectiveType = "vision" | "objective" | "stat";

interface GoalObjectiveFormData {
  itemType: GoalObjectiveType;
  title: string;
  description: string;
  metric: string;
  kpisText: string;
  icon: string;
  order: number;
  isPublished: boolean;
}

const emptyFormData: GoalObjectiveFormData = {
  itemType: "objective",
  title: "",
  description: "",
  metric: "",
  kpisText: "",
  icon: "target",
  order: 0,
  isPublished: true,
};

const typeLabels: Record<GoalObjectiveType, string> = {
  vision: "Vision block",
  objective: "Objective card",
  stat: "Consortium stat",
};

const iconOptions = [
  { value: "target", label: "Target", icon: Target },
  { value: "trending-up", label: "Growth", icon: TrendingUp },
  { value: "users", label: "People", icon: Users },
  { value: "award", label: "Award", icon: Award },
  { value: "leaf", label: "Sustainability", icon: Leaf },
  { value: "book-open", label: "Education", icon: BookOpen },
  { value: "building", label: "Institution", icon: Building2 },
  { value: "globe", label: "Global", icon: Globe2 },
  { value: "map", label: "Regions", icon: Map },
];

const getIcon = (value: string) => iconOptions.find((option) => option.value === value)?.icon ?? Target;

const toFormData = (item: GoalObjective): GoalObjectiveFormData => ({
  itemType: (item.itemType as GoalObjectiveType) || "objective",
  title: item.title,
  description: item.description || "",
  metric: item.metric || "",
  kpisText: Array.isArray(item.kpis) ? item.kpis.join("\n") : "",
  icon: item.icon || "target",
  order: item.order,
  isPublished: item.isPublished,
});

const toPayload = (formData: GoalObjectiveFormData) => ({
  itemType: formData.itemType,
  title: formData.title.trim(),
  description: formData.description.trim() || null,
  metric: formData.metric.trim() || null,
  kpis: formData.kpisText
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean),
  icon: formData.icon,
  order: formData.order,
  isPublished: formData.isPublished,
});

export default function GoalsObjectivesAdmin() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<GoalObjectiveFormData>(emptyFormData);
  const [formError, setFormError] = useState<string | null>(null);

  const { data: items, isLoading } = useQuery<GoalObjective[]>({
    queryKey: ["/api/admin/goal-objectives"],
  });

  const groupedItems = useMemo(() => {
    const allItems = items ?? [];
    return {
      vision: allItems.filter((item) => item.itemType === "vision"),
      objective: allItems.filter((item) => item.itemType === "objective"),
      stat: allItems.filter((item) => item.itemType === "stat"),
    };
  }, [items]);

  const invalidateGoalObjectives = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/admin/goal-objectives"] });
    queryClient.invalidateQueries({ queryKey: ["/api/goal-objectives"] });
  };

  const createMutation = useMutation({
    mutationFn: async (data: ReturnType<typeof toPayload>) => apiRequest("POST", "/api/goal-objectives", data),
    onSuccess: () => {
      invalidateGoalObjectives();
      setDialogOpen(false);
      setFormData(emptyFormData);
      toast({ title: "Item created", description: "Goals and Objectives content has been added." });
    },
    onError: (error: Error) => {
      toast({
        title: "Create failed",
        description: error.message || "Failed to create item.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ReturnType<typeof toPayload> }) =>
      apiRequest("PUT", `/api/goal-objectives/${id}`, data),
    onSuccess: () => {
      invalidateGoalObjectives();
      setDialogOpen(false);
      setEditingId(null);
      setFormData(emptyFormData);
      toast({ title: "Item updated", description: "Saved changes are now live on the public page." });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update item.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/goal-objectives/${id}`),
    onSuccess: () => {
      invalidateGoalObjectives();
      toast({ title: "Item deleted", description: "The selected content item has been removed." });
    },
    onError: (error: Error) => {
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete item.",
        variant: "destructive",
      });
    },
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormError(null);
    setFormData({
      ...emptyFormData,
      order: items?.length ? Math.max(...items.map((item) => item.order)) + 10 : 0,
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (item: GoalObjective) => {
    setEditingId(item.id);
    setFormError(null);
    setFormData(toFormData(item));
    setDialogOpen(true);
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      return "Title is required.";
    }

    if ((formData.itemType === "vision" || formData.itemType === "objective") && !formData.description.trim()) {
      return "Description is required for vision and objective items.";
    }

    if (formData.itemType === "objective" && toPayload(formData).kpis.length === 0) {
      return "Add at least one key performance indicator for an objective card.";
    }

    if (formData.itemType === "stat" && !formData.metric.trim()) {
      return "Metric is required for a consortium stat.";
    }

    return null;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationMessage = validateForm();

    if (validationMessage) {
      setFormError(validationMessage);
      toast({ title: "Check required fields", description: validationMessage, variant: "destructive" });
      return;
    }

    const payload = toPayload(formData);

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
      return;
    }

    createMutation.mutate(payload);
  };

  const renderItemCard = (item: GoalObjective) => {
    const Icon = getIcon(item.icon);
    const kpis = Array.isArray(item.kpis) ? item.kpis : [];

    return (
      <Card key={item.id} className="hover-elevate" data-testid={`card-goal-objective-${item.id}`}>
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant={item.isPublished ? "default" : "secondary"}>
                    {item.isPublished ? "Published" : "Hidden"}
                  </Badge>
                  <Badge variant="outline">{typeLabels[item.itemType as GoalObjectiveType] || item.itemType}</Badge>
                  <span className="text-xs text-muted-foreground">Order {item.order}</span>
                </div>
                <CardTitle className="text-xl">{item.metric ? `${item.metric} ${item.title}` : item.title}</CardTitle>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleOpenEdit(item)}
                data-testid={`button-edit-goal-objective-${item.id}`}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid={`button-delete-goal-objective-${item.id}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete item</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{item.title}"? This action cannot be undone and it will be
                      removed from the public Goals and Objectives page.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteMutation.mutate(item.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {item.description ? <p className="text-sm leading-6 text-muted-foreground">{item.description}</p> : null}
          {kpis.length > 0 ? (
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">Key Performance Indicators</p>
              <ul className="space-y-2">
                {kpis.map((kpi, index) => (
                  <li key={`${item.id}-${index}`} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{kpi}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </CardContent>
      </Card>
    );
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="icon" data-testid="button-back">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Goals and Objectives</h1>
                <p className="text-sm text-muted-foreground">Manage public page vision, objectives, and stats</p>
              </div>
            </div>
            <Button onClick={handleOpenCreate} data-testid="button-add-goal-objective">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-56 w-full" />
            ))}
          </div>
        ) : !items || items.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="mb-4 text-muted-foreground">No Goals and Objectives content found</p>
              <Button onClick={handleOpenCreate} data-testid="button-add-first-goal-objective">
                <Plus className="mr-2 h-4 w-4" />
                Add First Item
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <section className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Vision Blocks</h2>
                <p className="text-sm text-muted-foreground">Introductory copy displayed before the objective cards.</p>
              </div>
              <div className="grid gap-4">{groupedItems.vision.map(renderItemCard)}</div>
            </section>

            <section className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Objective Cards</h2>
                <p className="text-sm text-muted-foreground">Main cards shown in the Goals and Objectives grid.</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">{groupedItems.objective.map(renderItemCard)}</div>
            </section>

            <section className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Consortium Stats</h2>
                <p className="text-sm text-muted-foreground">Number tiles displayed at the bottom of the public page.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{groupedItems.stat.map(renderItemCard)}</div>
            </section>
          </>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Goals/Objectives Item" : "Add Goals/Objectives Item"}</DialogTitle>
            <DialogDescription>
              Saved changes update the public Goals and Objectives page automatically.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="itemType">Content Type *</Label>
                <Select
                  value={formData.itemType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, itemType: value as GoalObjectiveType }))
                  }
                >
                  <SelectTrigger id="itemType">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vision">Vision block</SelectItem>
                    <SelectItem value="objective">Objective card</SelectItem>
                    <SelectItem value="stat">Consortium stat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="title">{formData.itemType === "stat" ? "Label *" : "Title *"}</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
                  placeholder={formData.itemType === "stat" ? "Partner Organizations" : "Enter item title"}
                  required
                />
              </div>

              {formData.itemType === "stat" ? (
                <div className="grid gap-2">
                  <Label htmlFor="metric">Metric *</Label>
                  <Input
                    id="metric"
                    value={formData.metric}
                    onChange={(event) => setFormData((prev) => ({ ...prev, metric: event.target.value }))}
                    placeholder="11"
                    required
                  />
                </div>
              ) : null}

              <div className="grid gap-2">
                <Label htmlFor="description">
                  Description {formData.itemType === "stat" ? "" : "*"}
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
                  placeholder="Write the public page copy"
                  rows={5}
                  required={formData.itemType !== "stat"}
                />
              </div>

              {formData.itemType === "objective" ? (
                <div className="grid gap-2">
                  <Label htmlFor="kpisText">Key Performance Indicators *</Label>
                  <Textarea
                    id="kpisText"
                    value={formData.kpisText}
                    onChange={(event) => setFormData((prev) => ({ ...prev, kpisText: event.target.value }))}
                    placeholder={"Add one KPI per line"}
                    rows={5}
                    required
                  />
                </div>
              ) : null}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="icon">Icon *</Label>
                  <Select
                    value={formData.icon}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, icon: value }))}
                  >
                    <SelectTrigger id="icon">
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        order: Number.parseInt(event.target.value, 10) || 0,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="isPublished">Published</Label>
                  <p className="text-sm text-muted-foreground">Hidden items stay saved but do not appear publicly.</p>
                </div>
                <Switch
                  id="isPublished"
                  checked={formData.isPublished}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublished: checked }))}
                />
              </div>

              {formError ? <p className="text-sm font-medium text-destructive">{formError}</p> : null}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : editingId ? "Update Item" : "Create Item"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
