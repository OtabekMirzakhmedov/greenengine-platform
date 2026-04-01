import { useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Edit,
  Images,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import type { StoryGallery } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

interface StoryGalleryFormData {
  title: string;
  slug: string;
  description: string;
  images: string[];
  order: number;
}

const emptyFormData: StoryGalleryFormData = {
  title: "",
  slug: "",
  description: "",
  images: [],
  order: 0,
};

export default function StoryGalleriesAdmin() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<StoryGallery | null>(null);
  const [formData, setFormData] = useState<StoryGalleryFormData>(emptyFormData);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const { data: galleries, isLoading } = useQuery<StoryGallery[]>({
    queryKey: ["/api/story-galleries"],
  });

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingGallery(null);
    setFormData(emptyFormData);
  };

  const createMutation = useMutation({
    mutationFn: async (data: StoryGalleryFormData) => apiRequest("POST", "/api/story-galleries", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/story-galleries"] });
      toast({ title: "Success", description: "Story gallery created successfully" });
      closeDialog();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create story gallery",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: StoryGalleryFormData }) =>
      apiRequest("PUT", `/api/story-galleries/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/story-galleries"] });
      toast({ title: "Success", description: "Story gallery updated successfully" });
      closeDialog();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update story gallery",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/story-galleries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/story-galleries"] });
      toast({ title: "Success", description: "Story gallery deleted successfully" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete story gallery",
        variant: "destructive",
      });
    },
  });

  const uploadFile = async (file: File) => {
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

    return response.json();
  };

  const handleOpenCreate = () => {
    setEditingGallery(null);
    setFormData({
      ...emptyFormData,
      order: galleries?.length ?? 0,
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (gallery: StoryGallery) => {
    setEditingGallery(gallery);
    setFormData({
      title: gallery.title,
      slug: gallery.slug,
      description: gallery.description || "",
      images: gallery.images || [],
      order: gallery.order,
    });
    setDialogOpen(true);
  };

  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploadingImages(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const data = await uploadFile(file);
        uploadedUrls.push(data.url);
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
      toast({ title: "Success", description: "Gallery images uploaded successfully" });
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to upload gallery images",
        variant: "destructive",
      });
    } finally {
      setIsUploadingImages(false);
      if (imagesInputRef.current) {
        imagesInputRef.current.value = "";
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    setFormData((prev) => {
      const images = [...prev.images];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= images.length) {
        return prev;
      }
      [images[index], images[targetIndex]] = [images[targetIndex], images[index]];
      return { ...prev, images };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGallery) {
      updateMutation.mutate({ id: editingGallery.id, data: formData });
      return;
    }
    createMutation.mutate(formData);
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" data-testid="button-back">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">Stories Galleries</h1>
            </div>
            <Button size="sm" onClick={handleOpenCreate} data-testid="button-add-story-gallery">
              <Plus className="mr-2 h-4 w-4" />
              Add Gallery
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        ) : galleries && galleries.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {galleries.map((gallery) => (
              <Card key={gallery.id} className="overflow-hidden hover-elevate" data-testid={`card-story-gallery-${gallery.id}`}>
                {gallery.images?.[0] ? (
                  <div className="h-48 overflow-hidden bg-muted">
                    <img src={gallery.images[0]} alt={gallery.title} className="h-full w-full object-cover" />
                  </div>
                ) : null}
                <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
                  <div className="min-w-0">
                    <CardTitle className="line-clamp-2 text-lg">{gallery.title}</CardTitle>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Images className="h-4 w-4" />
                      <span>{gallery.images?.length ?? 0} photos</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(gallery)} data-testid={`button-edit-story-gallery-${gallery.id}`}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-delete-story-gallery-${gallery.id}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Story Gallery</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{gallery.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(gallery.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {gallery.description || "Open this gallery to manage the grouped story images."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="mb-4 text-muted-foreground">No story galleries added yet</p>
              <Button onClick={handleOpenCreate} data-testid="button-add-first-story-gallery">
                <Plus className="mr-2 h-4 w-4" />
                Add First Gallery
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingGallery ? "Edit Story Gallery" : "Add Story Gallery"}</DialogTitle>
            <DialogDescription>
              Create grouped photo galleries for the Stories section and control the image order inside each gallery.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      title: newTitle,
                      slug: prev.slug || generateSlug(newTitle),
                    }));
                  }}
                  placeholder="Gallery title"
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="story-gallery-slug"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="order">Display Order</Label>
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
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Optional gallery description"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label>Gallery Images *</Label>
                <div className="flex gap-2">
                  <input
                    ref={imagesInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImagesUpload}
                  />
                  <Button type="button" variant="outline" onClick={() => imagesInputRef.current?.click()} disabled={isUploadingImages}>
                    {isUploadingImages ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    <span className="ml-2">Upload Images</span>
                  </Button>
                </div>
                {formData.images.length > 0 ? (
                  <div className="grid gap-3 md:grid-cols-2">
                    {formData.images.map((imageUrl, index) => (
                      <div key={`${imageUrl}-${index}`} className="overflow-hidden rounded-md border bg-muted">
                        <div className="relative h-40">
                          <img src={imageUrl} alt={`Gallery image ${index + 1}`} className="h-full w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white transition hover:bg-black"
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2">
                          <span className="text-sm text-muted-foreground">Position {index + 1}</span>
                          <div className="flex gap-1">
                            <Button type="button" variant="ghost" size="icon" disabled={index === 0} onClick={() => moveImage(index, "up")}>
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="ghost" size="icon" disabled={index === formData.images.length - 1} onClick={() => moveImage(index, "down")}>
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Upload multiple images to build this gallery.</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : editingGallery ? "Update Gallery" : "Create Gallery"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
