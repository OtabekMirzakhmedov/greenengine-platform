import { useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Edit,
  FileText,
  Image as ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { format } from "date-fns";
import type { Activity } from "@shared/schema";
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

type Attachment = { name: string; url: string; size: string };

interface ActivityFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string;
  gallery: string[];
  attachments: Attachment[];
  author: string;
  ctaText: string;
  ctaLink: string;
  order: number;
  publishedAt: string;
}

const emptyFormData: ActivityFormData = {
  title: "",
  slug: "",
  description: "",
  content: "",
  imageUrl: "",
  gallery: [],
  attachments: [],
  author: "",
  ctaText: "Read Activity",
  ctaLink: "",
  order: 0,
  publishedAt: new Date().toISOString().split("T")[0],
};

export default function ActivitiesAdmin() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ActivityFormData>(emptyFormData);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [isUploadingAttachments, setIsUploadingAttachments] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const attachmentsInputRef = useRef<HTMLInputElement>(null);

  const { data: activities, isLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setFormData(emptyFormData);
  };

  const createMutation = useMutation({
    mutationFn: async (data: ActivityFormData) =>
      apiRequest("POST", "/api/activities", {
        ...data,
        publishedAt: new Date(data.publishedAt),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({ title: "Success", description: "Activity created successfully" });
      closeDialog();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create activity",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ActivityFormData }) =>
      apiRequest("PUT", `/api/activities/${id}`, {
        ...data,
        publishedAt: new Date(data.publishedAt),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({ title: "Success", description: "Activity updated successfully" });
      closeDialog();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update activity",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/activities/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({ title: "Success", description: "Activity deleted successfully" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete activity",
        variant: "destructive",
      });
    },
  });

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const formatFileSize = (size: number) =>
    size < 1024 * 1024
      ? `${(size / 1024).toFixed(1)} KB`
      : `${(size / (1024 * 1024)).toFixed(1)} MB`;

  const uploadFile = async (file: File) => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formDataUpload,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return response.json();
  };

  const openCreateDialog = () => {
    setEditingId(null);
    setFormData({
      ...emptyFormData,
      order: activities?.length ?? 0,
      publishedAt: new Date().toISOString().split("T")[0],
    });
    setDialogOpen(true);
  };

  const openEditDialog = (activity: Activity) => {
    setEditingId(activity.id);
    setFormData({
      title: activity.title,
      slug: activity.slug,
      description: activity.description,
      content: activity.content || "",
      imageUrl: activity.imageUrl,
      gallery: activity.gallery || [],
      attachments: activity.attachments || [],
      author: activity.author || "",
      ctaText: activity.ctaText,
      ctaLink: activity.ctaLink || "",
      order: activity.order,
      publishedAt: new Date(activity.publishedAt).toISOString().split("T")[0],
    });
    setDialogOpen(true);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    try {
      const data = await uploadFile(file);
      setFormData((prev) => ({ ...prev, imageUrl: data.url }));
      toast({ title: "Success", description: "Cover image uploaded successfully" });
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to upload cover image",
        variant: "destructive",
      });
    } finally {
      setIsUploadingCover(false);
      if (coverInputRef.current) {
        coverInputRef.current.value = "";
      }
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploadingGallery(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const data = await uploadFile(file);
        uploadedUrls.push(data.url);
      }

      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...uploadedUrls],
      }));
      toast({ title: "Success", description: "Gallery images uploaded successfully" });
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to upload gallery images",
        variant: "destructive",
      });
    } finally {
      setIsUploadingGallery(false);
      if (galleryInputRef.current) {
        galleryInputRef.current.value = "";
      }
    }
  };

  const handleAttachmentsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploadingAttachments(true);
    try {
      const uploadedAttachments: Attachment[] = [];
      for (const file of files) {
        const data = await uploadFile(file);
        uploadedAttachments.push({
          name: file.name,
          url: data.url,
          size: formatFileSize(file.size),
        });
      }

      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...uploadedAttachments],
      }));
      toast({ title: "Success", description: "Attachments uploaded successfully" });
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to upload attachments",
        variant: "destructive",
      });
    } finally {
      setIsUploadingAttachments(false);
      if (attachmentsInputRef.current) {
        attachmentsInputRef.current.value = "";
      }
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, index) => index !== indexToRemove),
    }));
  };

  const removeAttachment = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      ctaLink: formData.ctaLink || `/activities/${formData.slug}`,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
      return;
    }
    createMutation.mutate(payload);
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
              <h1 className="text-2xl font-bold text-foreground">Activities</h1>
            </div>
            <Button size="sm" onClick={openCreateDialog} data-testid="button-add-activity">
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
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
        ) : !activities || activities.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="mb-4 text-muted-foreground">No activities found</p>
              <Button onClick={openCreateDialog} data-testid="button-add-first-activity">
                <Plus className="mr-2 h-4 w-4" />
                Add First Activity
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {activities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden hover-elevate" data-testid={`card-activity-${activity.slug}`}>
                {activity.imageUrl && (
                  <div className="h-48 overflow-hidden bg-muted">
                    <img src={activity.imageUrl} alt={activity.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
                  <div className="min-w-0">
                    <CardTitle className="line-clamp-2 text-lg">{activity.title}</CardTitle>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{format(new Date(activity.publishedAt), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(activity)} data-testid={`button-edit-${activity.slug}`}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-delete-${activity.slug}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Activity</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{activity.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(activity.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="line-clamp-3 text-sm text-muted-foreground">{activity.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="rounded bg-muted px-2 py-1">Order {activity.order}</span>
                    {activity.author ? <span className="rounded bg-muted px-2 py-1">{activity.author}</span> : null}
                    {activity.gallery?.length ? <span className="rounded bg-muted px-2 py-1">{activity.gallery.length} gallery</span> : null}
                    {activity.attachments?.length ? <span className="rounded bg-muted px-2 py-1">{activity.attachments.length} files</span> : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Activity" : "Add Activity"}</DialogTitle>
            <DialogDescription>
              Manage the activity card, list item, and single activity detail content from one place.
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
                  placeholder="Activity title"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="activity-slug"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="publishedAt">Date *</Label>
                  <Input
                    id="publishedAt"
                    type="date"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, publishedAt: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                    placeholder="Author name"
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
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Short card and listing description"
                  rows={3}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Full Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Full activity content"
                  rows={8}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Cover Image *</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://example.com/activity-image.jpg"
                    required
                  />
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverUpload}
                  />
                  <Button type="button" variant="outline" onClick={() => coverInputRef.current?.click()} disabled={isUploadingCover}>
                    {isUploadingCover ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  </Button>
                </div>
                {formData.imageUrl ? (
                  <div className="mt-2 h-40 overflow-hidden rounded-md bg-muted">
                    <img src={formData.imageUrl} alt="Cover preview" className="h-full w-full object-cover" />
                  </div>
                ) : null}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="ctaText">Button Text *</Label>
                  <Input
                    id="ctaText"
                    value={formData.ctaText}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ctaText: e.target.value }))}
                    placeholder="Read Activity"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ctaLink">Optional Button Link</Label>
                  <Input
                    id="ctaLink"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ctaLink: e.target.value }))}
                    placeholder="/activities/your-activity-slug"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Gallery</Label>
                <div className="flex gap-2">
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleGalleryUpload}
                  />
                  <Button type="button" variant="outline" onClick={() => galleryInputRef.current?.click()} disabled={isUploadingGallery}>
                    {isUploadingGallery ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
                    <span className="ml-2">Upload Gallery</span>
                  </Button>
                </div>
                {formData.gallery.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {formData.gallery.map((imageUrl, index) => (
                      <div key={`${imageUrl}-${index}`} className="relative overflow-hidden rounded-md border bg-muted">
                        <img src={imageUrl} alt={`Gallery ${index + 1}`} className="h-28 w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white transition hover:bg-black"
                          aria-label={`Remove gallery image ${index + 1}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Uploaded gallery images will appear here.</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label>Attachments</Label>
                <div className="flex gap-2">
                  <input
                    ref={attachmentsInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.png,.jpg,.jpeg"
                    multiple
                    className="hidden"
                    onChange={handleAttachmentsUpload}
                  />
                  <Button type="button" variant="outline" onClick={() => attachmentsInputRef.current?.click()} disabled={isUploadingAttachments}>
                    {isUploadingAttachments ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                    <span className="ml-2">Upload Attachments</span>
                  </Button>
                </div>
                {formData.attachments.length > 0 ? (
                  <div className="space-y-2">
                    {formData.attachments.map((attachment, index) => (
                      <div key={`${attachment.url}-${index}`} className="flex items-center justify-between gap-3 rounded-md border bg-muted/40 px-3 py-2">
                        <div className="min-w-0">
                          <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="block truncate text-sm font-medium text-primary underline-offset-4 hover:underline">
                            {attachment.name}
                          </a>
                          <p className="text-xs text-muted-foreground">{attachment.size}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                          aria-label={`Remove attachment ${attachment.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Uploaded attachments will appear here.</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : editingId ? "Update Activity" : "Create Activity"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
