import { useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { format } from "date-fns";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, Edit, FileText, Image as ImageIcon, Loader2, Plus, Search, Trash2, Upload, X } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Attachment = { name: string; url: string; size: string };

export interface EditorialItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  imageUrl: string | null;
  attachments: Attachment[] | null;
  status: string;
  publishedAt: Date | string;
  order: number;
}

interface EditorialFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  attachments: Attachment[];
  status: "draft" | "published";
  publishedAt: string;
  order: number;
}

interface EditorialAdminProps {
  title: string;
  description: string;
  singularLabel: string;
  pluralLabel: string;
  endpoint: "/api/news" | "/api/tenders";
  adminEndpoint: "/api/admin/news" | "/api/admin/tenders";
  sectionLabel?: string;
  highlights?: string[];
}

const emptyFormData: EditorialFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  imageUrl: "",
  attachments: [],
  status: "draft",
  publishedAt: new Date().toISOString().split("T")[0],
  order: 0,
};

export default function EditorialAdmin(props: EditorialAdminProps) {
  const { title, description, singularLabel, pluralLabel, endpoint, adminEndpoint, sectionLabel, highlights = [] } = props;
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formData, setFormData] = useState<EditorialFormData>(emptyFormData);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const attachmentsInputRef = useRef<HTMLInputElement>(null);

  const { data: items, isLoading } = useQuery<EditorialItem[]>({ queryKey: [adminEndpoint] });

  const invalidateContentQueries = () => {
    queryClient.invalidateQueries({
      predicate: ({ queryKey }) =>
        typeof queryKey[0] === "string" &&
        (String(queryKey[0]).startsWith(endpoint) || String(queryKey[0]).startsWith(adminEndpoint)),
    });
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setFormData(emptyFormData);
  };

  const createMutation = useMutation({
    mutationFn: async (data: EditorialFormData) => apiRequest("POST", endpoint, { ...data, publishedAt: new Date(data.publishedAt) }),
    onSuccess: () => {
      invalidateContentQueries();
      closeDialog();
      toast({ title: `${singularLabel} created`, description: `${singularLabel} has been saved successfully.` });
    },
    onError: (error: Error) => {
      toast({ title: "Save failed", description: error.message || `Failed to create ${singularLabel.toLowerCase()}.`, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EditorialFormData }) =>
      apiRequest("PUT", `${endpoint}/${id}`, { ...data, publishedAt: new Date(data.publishedAt) }),
    onSuccess: () => {
      invalidateContentQueries();
      closeDialog();
      toast({ title: `${singularLabel} updated`, description: `Changes to this ${singularLabel.toLowerCase()} are now saved.` });
    },
    onError: (error: Error) => {
      toast({ title: "Update failed", description: error.message || `Failed to update ${singularLabel.toLowerCase()}.`, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `${endpoint}/${id}`),
    onSuccess: () => {
      invalidateContentQueries();
      toast({ title: `${singularLabel} deleted`, description: `${singularLabel} has been removed.` });
    },
    onError: (error: Error) => {
      toast({ title: "Delete failed", description: error.message || `Failed to delete ${singularLabel.toLowerCase()}.`, variant: "destructive" });
    },
  });

  const publishedCount = items?.filter((item) => item.status === "published").length ?? 0;
  const draftCount = items?.filter((item) => item.status !== "published").length ?? 0;

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const nextItems = (items ?? []).filter((item) => {
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.slug.toLowerCase().includes(normalizedSearch) ||
        (item.excerpt ?? "").toLowerCase().includes(normalizedSearch);
      return matchesStatus && matchesSearch;
    });

    return nextItems.sort((a, b) => {
      if (endpoint === "/api/news") {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }

      if (a.order !== b.order) {
        return a.order - b.order;
      }

      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [endpoint, items, search, statusFilter]);

  const openCreateDialog = () => {
    setEditingId(null);
    setFormData({
      ...emptyFormData,
      order: endpoint === "/api/news" ? 0 : items?.length ?? 0,
      status: endpoint === "/api/news" ? "published" : "draft",
      publishedAt: new Date().toISOString().split("T")[0],
    });
    setDialogOpen(true);
  };

  const openEditDialog = (item: EditorialItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt || "",
      content: item.content || "",
      imageUrl: item.imageUrl || "",
      attachments: item.attachments || [],
      status: item.status === "published" ? "published" : "draft",
      publishedAt: new Date(item.publishedAt).toISOString().split("T")[0],
      order: item.order,
    });
    setDialogOpen(true);
  };

  const generateSlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const formatFileSize = (size: number) => (size < 1024 * 1024 ? `${(size / 1024).toFixed(1)} KB` : `${(size / (1024 * 1024)).toFixed(1)} MB`);

  const uploadFile = async (file: File) => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    const response = await fetch("/api/upload", { method: "POST", body: uploadFormData, credentials: "include" });
    if (!response.ok) throw new Error("Upload failed");
    return response.json();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);
    try {
      const data = await uploadFile(file);
      setFormData((prev) => ({ ...prev, imageUrl: data.url }));
      toast({ title: "Image uploaded", description: "The cover image is ready to use." });
    } catch {
      toast({ title: "Upload failed", description: "Failed to upload the image.", variant: "destructive" });
    } finally {
      setIsUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const handleAttachmentsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setIsUploadingFiles(true);
    try {
      const nextAttachments: Attachment[] = [];
      for (const file of files) {
        const data = await uploadFile(file);
        nextAttachments.push({ name: file.name, url: data.url, size: formatFileSize(file.size) });
      }
      setFormData((prev) => ({ ...prev, attachments: [...prev.attachments, ...nextAttachments] }));
      toast({ title: "Files uploaded", description: `${nextAttachments.length} file(s) added.` });
    } catch {
      toast({ title: "Upload failed", description: "Failed to upload one or more files.", variant: "destructive" });
    } finally {
      setIsUploadingFiles(false);
      if (attachmentsInputRef.current) attachmentsInputRef.current.value = "";
    }
  };

  const removeAttachment = (indexToRemove: number) => {
    setFormData((prev) => ({ ...prev, attachments: prev.attachments.filter((_, index) => index !== indexToRemove) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
      return;
    }
    createMutation.mutate(formData);
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/25 to-background">
      <header className="sticky top-0 z-10 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/admin"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />Back</Button></Link>
              <div><h1 className="text-2xl font-bold">{title}</h1><p className="text-sm text-muted-foreground">{description}</p></div>
            </div>
            <Button onClick={openCreateDialog}><Plus className="mr-2 h-4 w-4" />Add {singularLabel}</Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {sectionLabel ? (
          <Card className="overflow-hidden border-primary/10 bg-[linear-gradient(135deg,rgba(16,53,31,0.96),rgba(33,95,57,0.96))] text-white shadow-[0_24px_70px_rgba(16,53,31,0.28)]">
            <CardContent className="grid gap-6 p-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/70">{sectionLabel}</p>
                <h2 className="mt-3 text-2xl font-semibold md:text-3xl">{title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">{description}</p>
              </div>
              {highlights.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {highlights.map((highlight) => (
                    <div key={highlight} className="rounded-2xl border border-white/12 bg-white/10 px-4 py-4 text-sm leading-6 text-white/85 backdrop-blur-sm">
                      {highlight}
                    </div>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        ) : null}

        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardHeader className="pb-2"><CardDescription>Total {pluralLabel}</CardDescription><CardTitle className="text-3xl">{items?.length ?? 0}</CardTitle></CardHeader></Card>
          <Card><CardHeader className="pb-2"><CardDescription>Published</CardDescription><CardTitle className="text-3xl text-emerald-600">{publishedCount}</CardTitle></CardHeader></Card>
          <Card><CardHeader className="pb-2"><CardDescription>Drafts</CardDescription><CardTitle className="text-3xl text-amber-600">{draftCount}</CardTitle></CardHeader></Card>
        </div>

        <Card className="mt-6">
          <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${pluralLabel.toLowerCase()}`} className="pl-9" />
            </div>
            <div className="w-full md:w-52">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger><SelectValue placeholder="Filter by status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 overflow-hidden">
          <CardHeader className="border-b bg-muted/20">
            <CardTitle className="text-xl">{pluralLabel} Library</CardTitle>
            <CardDescription>Manage content, visibility, and uploaded assets in one place.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="space-y-3 p-6">{[...Array(4)].map((_, index) => <Skeleton key={index} className="h-16 w-full" />)}</div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center"><p className="mb-4 text-muted-foreground">No {pluralLabel.toLowerCase()} match the current filters.</p><Button onClick={openCreateDialog}>Create {singularLabel}</Button></div>
            ) : (
              <>
                <div className="hidden md:block">
                  <Table>
                    <TableHeader><TableRow><TableHead>{singularLabel}</TableHead><TableHead>Status</TableHead><TableHead>Published</TableHead><TableHead>Assets</TableHead><TableHead>Order</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="min-w-[320px]"><div className="flex items-start gap-4"><div className="h-16 w-20 overflow-hidden rounded-lg bg-muted">{item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-muted-foreground"><ImageIcon className="h-4 w-4" /></div>}</div><div className="min-w-0 space-y-1"><p className="line-clamp-1 font-medium">{item.title}</p><p className="text-xs text-muted-foreground">/{item.slug}</p><p className="line-clamp-2 text-sm text-muted-foreground">{item.excerpt || "No summary provided yet."}</p></div></div></TableCell>
                          <TableCell><Badge variant={item.status === "published" ? "default" : "secondary"} className={item.status === "published" ? "bg-emerald-600 hover:bg-emerald-600" : ""}>{item.status}</Badge></TableCell>
                          <TableCell>{format(new Date(item.publishedAt), "MMM d, yyyy")}</TableCell>
                          <TableCell>{item.attachments?.length ?? 0} files</TableCell>
                          <TableCell>{item.order}</TableCell>
                          <TableCell className="text-right"><div className="flex justify-end gap-2"><Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}><Edit className="h-4 w-4" /></Button><AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete {singularLabel}</AlertDialogTitle><AlertDialogDescription>This will permanently remove "{item.title}".</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => deleteMutation.mutate(item.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="grid gap-4 p-4 md:hidden">
                  {filteredItems.map((item) => (
                    <Card key={item.id}><CardContent className="space-y-4 p-4"><div className="flex gap-4"><div className="h-20 w-24 overflow-hidden rounded-lg bg-muted">{item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" /> : null}</div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><Badge variant={item.status === "published" ? "default" : "secondary"} className={item.status === "published" ? "bg-emerald-600 hover:bg-emerald-600" : ""}>{item.status}</Badge><span className="text-xs text-muted-foreground">{format(new Date(item.publishedAt), "MMM d, yyyy")}</span></div><p className="mt-2 font-medium">{item.title}</p><p className="mt-1 text-xs text-muted-foreground">/{item.slug}</p></div></div><p className="text-sm text-muted-foreground">{item.excerpt || "No summary provided yet."}</p><div className="flex items-center justify-between"><div className="text-xs text-muted-foreground">Order {item.order} • {item.attachments?.length ?? 0} files</div><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => openEditDialog(item)}>Edit</Button><AlertDialog><AlertDialogTrigger asChild><Button variant="outline" size="sm">Delete</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete {singularLabel}</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => deleteMutation.mutate(item.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div></div></CardContent></Card>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
          <DialogHeader><DialogTitle>{editingId ? `Edit ${singularLabel}` : `Create ${singularLabel}`}</DialogTitle><DialogDescription>Set the content, files, and publishing status for this {singularLabel.toLowerCase()}.</DialogDescription></DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-5 py-4">
              <div className="grid gap-2"><Label htmlFor="title">Title *</Label><Input id="title" value={formData.title} onChange={(e) => { const nextTitle = e.target.value; setFormData((prev) => ({ ...prev, title: nextTitle, slug: prev.slug || generateSlug(nextTitle) })); }} placeholder={`Enter ${singularLabel.toLowerCase()} title`} required /></div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2"><Label htmlFor="slug">Slug *</Label><Input id="slug" value={formData.slug} onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))} placeholder="content-slug" required /></div>
                <div className="grid gap-2"><Label htmlFor="status">Status *</Label><Select value={formData.status} onValueChange={(value: "draft" | "published") => setFormData((prev) => ({ ...prev, status: value }))}><SelectTrigger id="status"><SelectValue placeholder="Select status" /></SelectTrigger><SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="published">Published</SelectItem></SelectContent></Select></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2"><Label htmlFor="publishedAt">Publish Date *</Label><Input id="publishedAt" type="date" value={formData.publishedAt} onChange={(e) => setFormData((prev) => ({ ...prev, publishedAt: e.target.value }))} required /></div>
                <div className="grid gap-2"><Label htmlFor="order">Display Order</Label><Input id="order" type="number" value={formData.order} onChange={(e) => setFormData((prev) => ({ ...prev, order: Number.parseInt(e.target.value, 10) || 0 }))} /></div>
              </div>
              <div className="grid gap-2"><Label htmlFor="excerpt">Short Description</Label><Textarea id="excerpt" value={formData.excerpt} onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))} placeholder="Short summary for cards and listings" rows={3} /></div>
              <div className="grid gap-2"><Label htmlFor="content">Full Content</Label><Textarea id="content" value={formData.content} onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))} placeholder="Detailed page content" rows={10} /></div>
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Featured Image</Label>
                <div className="flex gap-2"><Input id="imageUrl" value={formData.imageUrl} onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))} placeholder="https://example.com/cover.jpg" /><input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} /><Button type="button" variant="outline" onClick={() => imageInputRef.current?.click()} disabled={isUploadingImage}>{isUploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}</Button></div>
                {formData.imageUrl ? <div className="mt-2 h-44 overflow-hidden rounded-xl bg-muted"><img src={formData.imageUrl} alt="Preview" className="h-full w-full object-cover" /></div> : null}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-4"><div><Label>Attachments</Label><p className="text-sm text-muted-foreground">Upload supporting files for visitors to download.</p></div><div><input ref={attachmentsInputRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.png,.jpg,.jpeg" multiple className="hidden" onChange={handleAttachmentsUpload} /><Button type="button" variant="outline" onClick={() => attachmentsInputRef.current?.click()} disabled={isUploadingFiles}>{isUploadingFiles ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}<span className="ml-2">Upload Files</span></Button></div></div>
                {formData.attachments.length > 0 ? <div className="space-y-2">{formData.attachments.map((attachment, index) => <div key={`${attachment.url}-${index}`} className="flex items-center justify-between gap-3 rounded-xl border bg-muted/30 px-3 py-3"><div className="min-w-0"><a href={attachment.url} target="_blank" rel="noopener noreferrer" className="block truncate text-sm font-medium text-primary underline-offset-4 hover:underline">{attachment.name}</a><p className="text-xs text-muted-foreground">{attachment.size}</p></div><button type="button" onClick={() => removeAttachment(index)} className="rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground" aria-label={`Remove attachment ${attachment.name}`}><X className="h-4 w-4" /></button></div>)}</div> : <div className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">No files uploaded yet.</div>}
              </div>
            </div>
            <DialogFooter><Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button><Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : editingId ? `Update ${singularLabel}` : `Create ${singularLabel}`}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
