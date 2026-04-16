import { useRef, useState, type ChangeEvent } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  ArrowLeft,
  Calendar,
  Edit,
  Eye,
  EyeOff,
  FileUp,
  Globe2,
  Image as ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import type { PassportSection, PassportStory } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type UploadedAttachment = { name: string; url: string; size: string };
type StoryTranslations = Record<
  string,
  {
    title?: string;
    excerpt?: string;
    content?: string;
    imageUrl?: string;
    mediaUrl?: string;
    author?: string;
    gallery?: string[];
    attachments?: UploadedAttachment[];
  }
>;

interface StoryFormData {
  sectionId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  mediaUrl: string;
  author: string;
  gallery: string[];
  attachments: UploadedAttachment[];
  translations: string;
  order: number;
  isPublished: boolean;
  publishedAt: string;
}

const emptyFormData: StoryFormData = {
  sectionId: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  imageUrl: "",
  mediaUrl: "",
  author: "",
  gallery: [],
  attachments: [],
  translations: "{}",
  order: 0,
  isPublished: true,
  publishedAt: new Date().toISOString().slice(0, 10),
};

const formatTranslations = (value: StoryTranslations | null | undefined) =>
  JSON.stringify(value ?? {}, null, 2);

const formatDate = (value: Date | string | null | undefined) => {
  if (!value) return "Not scheduled";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "Not scheduled";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

export default function PassportStoriesAdmin() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<StoryFormData>(emptyFormData);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [isUploadingAttachment, setIsUploadingAttachment] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  const { data: sections = [] as PassportSection[], isLoading: sectionsLoading } = useQuery<PassportSection[]>({
    queryKey: ["/api/admin/passport-sections"],
  });

  const { data: stories = [] as PassportStory[], isLoading: storiesLoading } = useQuery<PassportStory[]>({
    queryKey: ["/api/admin/passport-stories"],
  });

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setFormData(emptyFormData);
  };

  const invalidateStories = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/admin/passport-stories"] });
    queryClient.invalidateQueries({
      predicate: ({ queryKey }) =>
        typeof queryKey[0] === "string" &&
        (String(queryKey[0]).startsWith("/api/passport-sections/") || String(queryKey[0]).startsWith("/api/passport-sections")),
    });
  };

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

  const createMutation = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => apiRequest("POST", "/api/passport-stories", payload),
    onSuccess: () => {
      invalidateStories();
      toast({ title: "Story created", description: "The Digital Storytelling card is now available to publish." });
      closeDialog();
    },
    onError: (error: Error) => {
      toast({ title: "Create failed", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      apiRequest("PUT", `/api/passport-stories/${id}`, payload),
    onSuccess: () => {
      invalidateStories();
      toast({ title: "Story updated", description: "The storytelling content is now refreshed." });
      closeDialog();
    },
    onError: (error: Error) => {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/passport-stories/${id}`),
    onSuccess: () => {
      invalidateStories();
      toast({ title: "Story deleted", description: "The storytelling item has been removed." });
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

  const openCreateDialog = () => {
    const digitalStorytellingSection =
      sections.find((section) => section.slug === "digital-storytelling") ?? sections[0];

    setEditingId(null);
    setFormData({
      ...emptyFormData,
      sectionId: digitalStorytellingSection?.id ?? "",
      order: stories.length,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (story: PassportStory) => {
    setEditingId(story.id);
    setFormData({
      sectionId: story.sectionId,
      title: story.title,
      slug: story.slug,
      excerpt: story.excerpt || "",
      content: story.content || "",
      imageUrl: story.imageUrl || "",
      mediaUrl: story.mediaUrl || "",
      author: story.author || "",
      gallery: story.gallery || [],
      attachments: story.attachments || [],
      translations: formatTranslations(story.translations),
      order: story.order,
      isPublished: story.isPublished,
      publishedAt: story.publishedAt ? new Date(story.publishedAt).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
    });
    setDialogOpen(true);
  };

  const buildPayload = () => {
    let translations: StoryTranslations = {};

    try {
      translations = formData.translations.trim() ? JSON.parse(formData.translations) : {};
    } catch {
      throw new Error("Translations must be valid JSON");
    }

    return {
      sectionId: formData.sectionId,
      title: formData.title.trim(),
      slug: formData.slug.trim(),
      excerpt: formData.excerpt.trim() || null,
      content: formData.content.trim() || null,
      imageUrl: formData.imageUrl.trim() || null,
      mediaUrl: formData.mediaUrl.trim() || null,
      author: formData.author.trim() || null,
      gallery: formData.gallery,
      attachments: formData.attachments,
      translations,
      order: Number(formData.order) || 0,
      isPublished: formData.isPublished,
      publishedAt: formData.publishedAt ? new Date(formData.publishedAt) : new Date(),
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.sectionId) {
      toast({ title: "Section required", description: "Choose the passport section for this story.", variant: "destructive" });
      return;
    }

    try {
      const payload = buildPayload();

      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
    } catch (error) {
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Unable to save story.",
        variant: "destructive",
      });
    }
  };

  const handleCoverUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    try {
      const data = await uploadFile(file);
      setFormData((prev) => ({ ...prev, imageUrl: data.url }));
      toast({ title: "Cover uploaded", description: "The storytelling cover image is ready." });
    } catch {
      toast({ title: "Upload failed", description: "Could not upload the cover image.", variant: "destructive" });
    } finally {
      setIsUploadingCover(false);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  };

  const handleGalleryUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setIsUploadingGallery(true);
    try {
      const uploaded = await Promise.all(files.map(uploadFile));
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...uploaded.map((item) => item.url)],
      }));
      toast({ title: "Gallery updated", description: "New story images were added." });
    } catch {
      toast({ title: "Upload failed", description: "Could not upload one or more gallery images.", variant: "destructive" });
    } finally {
      setIsUploadingGallery(false);
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  };

  const handleAttachmentUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setIsUploadingAttachment(true);
    try {
      const uploaded = await Promise.all(files.map(uploadFile));
      setFormData((prev) => ({
        ...prev,
        attachments: [
          ...prev.attachments,
          ...uploaded.map((item, index) => ({
            name: files[index]?.name || item.url.split("/").pop() || "Attachment",
            url: item.url,
            size: files[index] ? `${Math.max(1, Math.round(files[index].size / 1024))} KB` : "",
          })),
        ],
      }));
      toast({ title: "Attachments uploaded", description: "Supporting story files are attached." });
    } catch {
      toast({ title: "Upload failed", description: "Could not upload one or more attachments.", variant: "destructive" });
    } finally {
      setIsUploadingAttachment(false);
      if (attachmentInputRef.current) attachmentInputRef.current.value = "";
    }
  };

  const selectedSectionLabel = (sectionId: string) =>
    sections.find((section) => section.id === sectionId)?.title ?? "Unassigned section";

  const busy = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="rounded-full px-0 text-muted-foreground hover:bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">Digital Storytelling Stories</h1>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              Manage the story cards and detail pages shown on the existing Digital Storytelling page, including
              publishing, multilingual content, media, and ordering.
            </p>
          </div>
          <Button onClick={openCreateDialog} className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Add story
          </Button>
        </div>

        {storiesLoading || sectionsLoading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-72 rounded-[1.75rem]" />
            ))}
          </div>
        ) : stories.length === 0 ? (
          <Card className="rounded-[2rem] border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#f5fbf5_100%)] shadow-[0_24px_70px_rgba(21,48,30,0.08)]">
            <CardContent className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Globe2 className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">No storytelling stories yet</h2>
                <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                  Add the first Digital Storytelling item and it will appear as a story card on the public page.
                </p>
              </div>
              <Button onClick={openCreateDialog} className="rounded-full">
                <Plus className="mr-2 h-4 w-4" />
                Create first story
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {stories.map((story) => (
              <Card
                key={story.id}
                className="overflow-hidden rounded-[1.9rem] border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf7_100%)] shadow-[0_20px_60px_rgba(21,48,30,0.08)]"
              >
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  {story.imageUrl ? (
                    <img src={story.imageUrl} alt={story.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <ImageIcon className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="secondary" className="rounded-full">
                      {selectedSectionLabel(story.sectionId)}
                    </Badge>
                    <Badge variant={story.isPublished ? "default" : "outline"} className="rounded-full">
                      {story.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <div>
                    <CardTitle className="line-clamp-2 text-2xl leading-tight">{story.title}</CardTitle>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {story.excerpt || "This story is ready for richer content from the admin panel."}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(story.publishedAt)}
                    </span>
                    <span>{story.gallery?.length || 0} images</span>
                    <span>{story.attachments?.length || 0} files</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs text-muted-foreground">Order {story.order}</div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="rounded-full" onClick={() => openEditDialog(story)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" className="rounded-full text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete story?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove the story card and its public detail page.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteMutation.mutate(story.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={(open) => (!open ? closeDialog() : setDialogOpen(true))}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit storytelling story" : "Create storytelling story"}</DialogTitle>
            <DialogDescription>
              Build multilingual story cards and detail pages for the existing Digital Storytelling section.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Passport section</Label>
                <Select value={formData.sectionId} onValueChange={(value) => setFormData((prev) => ({ ...prev, sectionId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="story-title">Title</Label>
                <Input
                  id="story-title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                      slug: editingId ? prev.slug : generateSlug(e.target.value),
                    }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="story-slug">Slug</Label>
                <Input id="story-slug" value={formData.slug} onChange={(e) => setFormData((prev) => ({ ...prev, slug: generateSlug(e.target.value) }))} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="story-author">Author</Label>
                <Input id="story-author" value={formData.author} onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="story-order">Display order</Label>
                <Input id="story-order" type="number" value={formData.order} onChange={(e) => setFormData((prev) => ({ ...prev, order: Number(e.target.value) }))} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="story-publishedAt">Published date</Label>
                <Input id="story-publishedAt" type="date" value={formData.publishedAt} onChange={(e) => setFormData((prev) => ({ ...prev, publishedAt: e.target.value }))} />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="story-excerpt">Short description</Label>
                <Textarea id="story-excerpt" rows={4} value={formData.excerpt} onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="story-media">Media link</Label>
                <Input id="story-media" value={formData.mediaUrl} onChange={(e) => setFormData((prev) => ({ ...prev, mediaUrl: e.target.value }))} placeholder="YouTube, Vimeo, or external media URL" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="story-content">Full content</Label>
              <Textarea id="story-content" rows={12} value={formData.content} onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))} />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="rounded-[1.5rem] border-primary/10">
                <CardHeader>
                  <CardTitle className="text-lg">Cover image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input value={formData.imageUrl} onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))} placeholder="https:// or /uploads/..." />
                  <div className="flex flex-wrap gap-3">
                    <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
                    <Button type="button" variant="outline" className="rounded-full" onClick={() => coverInputRef.current?.click()} disabled={isUploadingCover}>
                      {isUploadingCover ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                      Upload cover
                    </Button>
                    {formData.imageUrl ? (
                      <Button type="button" variant="ghost" className="rounded-full" onClick={() => setFormData((prev) => ({ ...prev, imageUrl: "" }))}>
                        <X className="mr-2 h-4 w-4" />
                        Clear
                      </Button>
                    ) : null}
                  </div>
                  {formData.imageUrl ? (
                    <div className="overflow-hidden rounded-[1.25rem] border border-primary/10 bg-muted/20">
                      <img src={formData.imageUrl} alt="Story cover preview" className="h-52 w-full object-cover" />
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              <Card className="rounded-[1.5rem] border-primary/10">
                <CardHeader>
                  <CardTitle className="text-lg">Visibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-[1.25rem] border border-primary/10 px-4 py-4">
                    <div>
                      <p className="font-medium text-foreground">Published</p>
                      <p className="text-sm text-muted-foreground">Only published stories appear on the public page.</p>
                    </div>
                    <Switch checked={formData.isPublished} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublished: checked }))} />
                  </div>
                  <div className="rounded-[1.25rem] border border-primary/10 bg-secondary/20 px-4 py-4 text-sm text-muted-foreground">
                    {formData.isPublished ? (
                      <span className="inline-flex items-center gap-2">
                        <Eye className="h-4 w-4 text-primary" />
                        This story will be visible on the Digital Storytelling page.
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <EyeOff className="h-4 w-4" />
                        This story is saved as a draft and hidden from public visitors.
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="rounded-[1.5rem] border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg">Gallery images</CardTitle>
                  <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => galleryInputRef.current?.click()} disabled={isUploadingGallery}>
                    {isUploadingGallery ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImageIcon className="mr-2 h-4 w-4" />}
                    Add images
                  </Button>
                  <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
                </CardHeader>
                <CardContent>
                  {formData.gallery.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {formData.gallery.map((imageUrl, index) => (
                        <div key={`${imageUrl}-${index}`} className="group relative overflow-hidden rounded-[1.1rem] border border-primary/10">
                          <img src={imageUrl} alt={`Gallery image ${index + 1}`} className="h-32 w-full object-cover" />
                          <button
                            type="button"
                            className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-destructive shadow-sm"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                gallery: prev.gallery.filter((_, galleryIndex) => galleryIndex !== index),
                              }))
                            }
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No gallery images yet.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-[1.5rem] border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg">Attachments</CardTitle>
                  <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => attachmentInputRef.current?.click()} disabled={isUploadingAttachment}>
                    {isUploadingAttachment ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileUp className="mr-2 h-4 w-4" />}
                    Add files
                  </Button>
                  <input ref={attachmentInputRef} type="file" multiple className="hidden" onChange={handleAttachmentUpload} />
                </CardHeader>
                <CardContent className="space-y-3">
                  {formData.attachments.length > 0 ? (
                    formData.attachments.map((attachment, index) => (
                      <div key={`${attachment.url}-${index}`} className="flex items-center justify-between gap-3 rounded-[1rem] border border-primary/10 px-4 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">{attachment.size || "File attached"}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              attachments: prev.attachments.filter((_, attachmentIndex) => attachmentIndex !== index),
                            }))
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No downloadable files attached yet.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <Label htmlFor="story-translations">Multilingual translations JSON</Label>
              <Textarea
                id="story-translations"
                rows={10}
                value={formData.translations}
                onChange={(e) => setFormData((prev) => ({ ...prev, translations: e.target.value }))}
                placeholder='{"ru":{"title":"..."}, "uz":{"title":"..."}}'
                className="font-mono text-xs"
              />
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" className="rounded-full" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-full" disabled={busy}>
                {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {editingId ? "Save changes" : "Create story"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
