import { useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Link2,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import type { PassportSection } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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

type PassportLink = { label: string; url: string };
type PassportTranslations = Record<
  string,
  {
    title?: string;
    navLabel?: string;
    summary?: string;
    content?: string;
    imageUrl?: string;
    mediaUrl?: string;
    links?: PassportLink[];
  }
>;

interface PassportSectionFormData {
  title: string;
  navLabel: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl: string;
  mediaUrl: string;
  links: PassportLink[];
  translations: string;
  order: number;
  isVisible: boolean;
  showInMenu: boolean;
  isLanding: boolean;
}

type PassportSectionPayload = Omit<PassportSectionFormData, "translations" | "imageUrl" | "mediaUrl"> & {
  imageUrl: string | null;
  mediaUrl: string | null;
  translations: PassportTranslations;
};

const emptyFormData: PassportSectionFormData = {
  title: "",
  navLabel: "",
  slug: "",
  summary: "",
  content: "",
  imageUrl: "",
  mediaUrl: "",
  links: [],
  translations: "{}",
  order: 0,
  isVisible: true,
  showInMenu: true,
  isLanding: false,
};

const formatTranslations = (value: PassportTranslations | null | undefined) =>
  JSON.stringify(value ?? {}, null, 2);

export default function PassportSectionsAdmin() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PassportSectionFormData>(emptyFormData);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data: sections, isLoading } = useQuery<PassportSection[]>({
    queryKey: ["/api/admin/passport-sections"],
  });

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setFormData(emptyFormData);
  };

  const invalidateSections = () => {
    queryClient.invalidateQueries({
      predicate: ({ queryKey }) =>
        typeof queryKey[0] === "string" &&
        String(queryKey[0]).startsWith("/api/passport-sections"),
    });
    queryClient.invalidateQueries({ queryKey: ["/api/admin/passport-sections"] });
  };

  const createMutation = useMutation({
    mutationFn: async (data: PassportSectionPayload) =>
      apiRequest("POST", "/api/passport-sections", data),
    onSuccess: () => {
      invalidateSections();
      toast({ title: "Passport section created", description: "The passport module has been updated." });
      closeDialog();
    },
    onError: (error: Error) => {
      toast({ title: "Create failed", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: PassportSectionPayload }) =>
      apiRequest("PUT", `/api/passport-sections/${id}`, data),
    onSuccess: () => {
      invalidateSections();
      toast({ title: "Passport section updated", description: "Changes are now live in the passport module." });
      closeDialog();
    },
    onError: (error: Error) => {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/passport-sections/${id}`),
    onSuccess: () => {
      invalidateSections();
      toast({ title: "Passport section deleted", description: "The section has been removed." });
    },
    onError: (error: Error) => {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    },
  });

  const generateSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const uploadFile = async (file: File) => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: uploadFormData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return response.json();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const data = await uploadFile(file);
      setFormData((prev) => ({ ...prev, imageUrl: data.url }));
      toast({ title: "Image uploaded", description: "The passport hero image is ready to use." });
    } catch (error) {
      toast({ title: "Upload failed", description: "Failed to upload image.", variant: "destructive" });
    } finally {
      setIsUploadingImage(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  const openCreateDialog = () => {
    setEditingId(null);
    setFormData({
      ...emptyFormData,
      order: sections?.length ?? 0,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (section: PassportSection) => {
    setEditingId(section.id);
    setFormData({
      title: section.title,
      navLabel: section.navLabel,
      slug: section.slug,
      summary: section.summary || "",
      content: section.content || "",
      imageUrl: section.imageUrl || "",
      mediaUrl: section.mediaUrl || "",
      links: section.links || [],
      translations: formatTranslations(section.translations),
      order: section.order,
      isVisible: section.isVisible,
      showInMenu: section.showInMenu,
      isLanding: section.isLanding,
    });
    setDialogOpen(true);
  };

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, { label: "", url: "" }],
    }));
  };

  const updateLink = (index: number, field: keyof PassportLink, value: string) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.map((link, linkIndex) =>
        linkIndex === index ? { ...link, [field]: value } : link,
      ),
    }));
  };

  const removeLink = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let translations: PassportTranslations = {};
    try {
      translations = JSON.parse(formData.translations || "{}");
    } catch {
      toast({
        title: "Translations JSON is invalid",
        description: "Please fix the translations field before saving.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      title: formData.title,
      navLabel: formData.navLabel,
      slug: formData.slug,
      summary: formData.summary,
      content: formData.content,
      imageUrl: formData.imageUrl || null,
      mediaUrl: formData.mediaUrl || null,
      links: formData.links.filter((link) => link.label.trim() && link.url.trim()),
      translations,
      order: formData.order,
      isVisible: formData.isVisible,
      showInMenu: formData.showInMenu,
      isLanding: formData.isLanding,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
      return;
    }

    createMutation.mutate(payload);
  };

  const sortedSections = [...(sections ?? [])].sort((a, b) => {
    if (a.isLanding !== b.isLanding) {
      return a.isLanding ? -1 : 1;
    }
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.title.localeCompare(b.title);
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" data-testid="button-back">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Intercultural Passport</h1>
                <p className="text-sm text-muted-foreground">
                  Manage the navbar label, submenu order, section visibility, and page content from one module.
                </p>
              </div>
            </div>
            <Button size="sm" onClick={openCreateDialog} data-testid="button-add-passport-section">
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-44 w-full rounded-[1.5rem]" />
            ))}
          </div>
        ) : sortedSections.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="mb-4 text-muted-foreground">No passport sections have been added yet.</p>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Section
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sortedSections.map((section) => (
              <Card key={section.id} className="overflow-hidden rounded-[1.75rem] hover-elevate" data-testid={`card-passport-${section.slug}`}>
                {section.imageUrl ? (
                  <div className="h-44 overflow-hidden bg-muted">
                    <img src={section.imageUrl} alt={section.title} className="h-full w-full object-cover" />
                  </div>
                ) : null}
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">/{section.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(section)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Passport Section</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove "{section.title}" from the Intercultural Passport module.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(section.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {section.isLanding ? <Badge>Landing page</Badge> : null}
                    <Badge variant={section.isVisible ? "default" : "secondary"}>
                      {section.isVisible ? "Visible" : "Hidden"}
                    </Badge>
                    <Badge variant="outline">{section.showInMenu ? "In menu" : "Menu hidden"}</Badge>
                    <Badge variant="outline">Order {section.order}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">
                    {section.summary || "No summary added yet."}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      {section.isVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                      <span>{section.links?.length ?? 0} link(s)</span>
                    </div>
                    {section.mediaUrl ? (
                      <a href={section.mediaUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                        Media
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Passport Section" : "Create Passport Section"}</DialogTitle>
            <DialogDescription>
              Configure the navbar label, page copy, media, ordering, links, and multilingual content for this passport section.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-5 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="title">Page Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      const nextTitle = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        title: nextTitle,
                        navLabel: prev.navLabel || nextTitle,
                        slug: prev.slug || generateSlug(nextTitle),
                      }));
                    }}
                    placeholder="Intercultural Passport"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="navLabel">Navbar Label *</Label>
                  <Input
                    id="navLabel"
                    value={formData.navLabel}
                    onChange={(e) => setFormData((prev) => ({ ...prev, navLabel: e.target.value }))}
                    placeholder="Overview"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="passport-overview"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData((prev) => ({ ...prev, order: Number.parseInt(e.target.value, 10) || 0 }))}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center justify-between rounded-2xl border bg-muted/20 px-4 py-4">
                  <div>
                    <p className="font-medium text-foreground">Visible</p>
                    <p className="text-sm text-muted-foreground">Show the page publicly</p>
                  </div>
                  <Switch checked={formData.isVisible} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isVisible: checked }))} />
                </div>
                <div className="flex items-center justify-between rounded-2xl border bg-muted/20 px-4 py-4">
                  <div>
                    <p className="font-medium text-foreground">Show in Menu</p>
                    <p className="text-sm text-muted-foreground">Display in header submenu</p>
                  </div>
                  <Switch checked={formData.showInMenu} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, showInMenu: checked }))} />
                </div>
                <div className="flex items-center justify-between rounded-2xl border bg-muted/20 px-4 py-4">
                  <div>
                    <p className="font-medium text-foreground">Landing Page</p>
                    <p className="text-sm text-muted-foreground">Use for `/passport`</p>
                  </div>
                  <Switch checked={formData.isLanding} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isLanding: checked }))} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                  placeholder="Short description used in the hero and menu cards"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content">Full Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="HTML or rich text content for the page body"
                  rows={10}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="imageUrl">Hero Image</Label>
                  <div className="flex gap-2">
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="https://example.com/passport-image.jpg"
                    />
                    <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    <Button type="button" variant="outline" onClick={() => imageInputRef.current?.click()} disabled={isUploadingImage}>
                      {isUploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    </Button>
                  </div>
                  {formData.imageUrl ? (
                    <div className="mt-2 h-36 overflow-hidden rounded-xl border bg-muted">
                      <img src={formData.imageUrl} alt="Passport preview" className="h-full w-full object-cover" />
                    </div>
                  ) : null}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="mediaUrl">Supporting Media URL</Label>
                  <Input
                    id="mediaUrl"
                    value={formData.mediaUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, mediaUrl: e.target.value }))}
                    placeholder="https://example.com/video-or-resource"
                  />
                  <p className="text-xs leading-6 text-muted-foreground">
                    Use this for a video, downloadable file, or external resource shown on the detail page.
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Related Links</Label>
                    <p className="text-sm text-muted-foreground">Add CTA links that should appear on the landing page or section detail.</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addLink}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Link
                  </Button>
                </div>

                {formData.links.length > 0 ? (
                  <div className="space-y-3">
                    {formData.links.map((link, index) => (
                      <div key={index} className="grid gap-3 rounded-2xl border bg-muted/20 p-4 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)_auto]">
                        <Input
                          value={link.label}
                          onChange={(e) => updateLink(index, "label", e.target.value)}
                          placeholder="Link label"
                        />
                        <Input
                          value={link.url}
                          onChange={(e) => updateLink(index, "url", e.target.value)}
                          placeholder="/passport/storytelling or https://..."
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeLink(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
                    No links added yet.
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="translations">Translations JSON</Label>
                <Textarea
                  id="translations"
                  value={formData.translations}
                  onChange={(e) => setFormData((prev) => ({ ...prev, translations: e.target.value }))}
                  rows={10}
                  placeholder={`{\n  "ru": {\n    "title": "Межкультурный паспорт",\n    "navLabel": "Обзор",\n    "summary": "Краткое описание",\n    "content": "<p>Локализованный контент</p>"\n  }\n}`}
                />
                <p className="text-xs leading-6 text-muted-foreground">
                  Optional. Use locale keys like `ru`, `uz`, or `en` to provide multilingual content overrides.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : editingId ? "Update Section" : "Create Section"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
