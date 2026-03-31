import { useRef, useState } from "react";
import { Link } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, Edit, Loader2, Plus, Trash2, Upload } from "lucide-react";
import type { HeroSection } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface HeroSectionFormData {
  title: string;
  subtitle: string;
  imageUrl: string;
  order: number;
}

const emptyFormData: HeroSectionFormData = {
  title: "",
  subtitle: "",
  imageUrl: "",
  order: 0,
};

export default function HeroSectionsAdmin() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<HeroSectionFormData>(emptyFormData);
  const [isUploading, setIsUploading] = useState(false);

  const { data: heroSections, isLoading } = useQuery<HeroSection[]>({
    queryKey: ["/api/hero-sections"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/hero-sections/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hero-sections"] });
      toast({ title: "Success", description: "Hero slide deleted successfully" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete hero slide",
        variant: "destructive",
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: HeroSectionFormData) => apiRequest("POST", "/api/hero-sections", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hero-sections"] });
      setDialogOpen(false);
      setFormData(emptyFormData);
      toast({ title: "Success", description: "Hero slide created successfully" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create hero slide",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: HeroSectionFormData }) =>
      apiRequest("PUT", `/api/hero-sections/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hero-sections"] });
      setDialogOpen(false);
      setEditingId(null);
      setFormData(emptyFormData);
      toast({ title: "Success", description: "Hero slide updated successfully" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update hero slide",
        variant: "destructive",
      });
    },
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      ...emptyFormData,
      order: heroSections?.length ?? 0,
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (section: HeroSection) => {
    setEditingId(section.id);
    setFormData({
      title: section.title,
      subtitle: section.subtitle,
      imageUrl: section.imageUrl,
      order: section.order,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, imageUrl: data.url }));
      toast({ title: "Success", description: "Image uploaded successfully" });
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

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
              <h1 className="text-2xl font-bold">Hero Slides</h1>
            </div>
            <Button onClick={handleOpenCreate} data-testid="button-add-hero-slide">
              <Plus className="mr-2 h-4 w-4" />
              Add Hero Slide
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-44 w-full" />
            ))}
          </div>
        ) : !heroSections || heroSections.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="mb-4 text-muted-foreground">No hero slides found</p>
              <Button onClick={handleOpenCreate} data-testid="button-add-first-hero-slide">
                <Plus className="mr-2 h-4 w-4" />
                Add First Hero Slide
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {heroSections.map((section) => (
              <Card key={section.id} className="overflow-hidden hover-elevate" data-testid={`card-hero-slide-${section.id}`}>
                <div className="relative h-52 bg-muted">
                  <img src={section.imageUrl} alt={section.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <div className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                      Slide {section.order + 1}
                    </div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                    <p className="mt-2 line-clamp-2 text-sm text-white/85">{section.subtitle}</p>
                  </div>
                </div>
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
                  <CardTitle className="text-base font-semibold">Order: {section.order}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(section)} data-testid={`button-edit-hero-slide-${section.id}`}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-delete-hero-slide-${section.id}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete hero slide</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{section.title}"? This action cannot be undone.
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
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Hero Slide" : "Add Hero Slide"}</DialogTitle>
            <DialogDescription>
              Manage the image, main title, and subtitle used in the homepage hero slider.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Main Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter hero title"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subtitle">Subtitle *</Label>
                <Textarea
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Enter hero subtitle"
                  rows={4}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Image *</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://example.com/hero-image.jpg"
                    required
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  </Button>
                </div>
                {formData.imageUrl ? (
                  <div className="relative mt-2 h-40 overflow-hidden rounded-md bg-muted">
                    <img src={formData.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="order">Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      order: Number.parseInt(e.target.value, 10) || 0,
                    }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : editingId
                    ? "Update Hero Slide"
                    : "Create Hero Slide"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
