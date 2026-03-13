import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus, Edit, Trash2, ArrowLeft, BarChart3, Upload, Loader2 } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Infographic } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface InfographicFormData {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  pdfUrl: string;
  pdfSize: string;
  order: number;
}

const emptyFormData: InfographicFormData = {
  title: "",
  slug: "",
  description: "",
  imageUrl: "",
  pdfUrl: "",
  pdfSize: "",
  order: 0,
};

export default function InfographicsAdmin() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<InfographicFormData>(emptyFormData);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const { data: infographics, isLoading } = useQuery<Infographic[]>({
    queryKey: ["/api/infographics"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/infographics/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/infographics"] });
      toast({
        title: "Success",
        description: "Infographic deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete infographic",
        variant: "destructive",
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InfographicFormData) => {
      return apiRequest("POST", "/api/infographics", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/infographics"] });
      setDialogOpen(false);
      setFormData(emptyFormData);
      toast({ title: "Success", description: "Infographic created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to create infographic", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InfographicFormData }) => {
      return apiRequest("PUT", `/api/infographics/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/infographics"] });
      setDialogOpen(false);
      setEditingId(null);
      setFormData(emptyFormData);
      toast({ title: "Success", description: "Infographic updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to update infographic", variant: "destructive" });
    },
  });

  const handleOpenCreate = () => { setEditingId(null); setFormData(emptyFormData); setDialogOpen(true); };

  const handleOpenEdit = (item: Infographic) => {
    setEditingId(item.id);
    setFormData({
      title: item.title, slug: item.slug, description: item.description || "",
      imageUrl: item.imageUrl || "", pdfUrl: item.pdfUrl || "", pdfSize: item.pdfSize || "", order: item.order,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) { updateMutation.mutate({ id: editingId, data: formData }); }
    else { createMutation.mutate(formData); }
  };

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "pdf") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const setUploading = type === "image" ? setIsUploadingImage : setIsUploadingPdf;
    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body: formDataUpload, credentials: "include" });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      if (type === "image") {
        setFormData((prev) => ({ ...prev, imageUrl: data.url }));
      } else {
        const fileSize = file.size < 1024 * 1024 ? `${(file.size / 1024).toFixed(1)} KB` : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
        setFormData((prev) => ({ ...prev, pdfUrl: data.url, pdfSize: fileSize }));
      }
      toast({ title: "Success", description: "File uploaded successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to upload file", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" data-testid="button-back">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">Infographics</h1>
            </div>
            <Button size="sm" onClick={handleOpenCreate} data-testid="button-add-infographic">
              <Plus className="h-4 w-4 mr-2" />
              Add Infographic
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : !infographics || infographics.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="text-muted-foreground mb-4">No infographics found</p>
              <Button onClick={handleOpenCreate} data-testid="button-add-first-infographic">
                <Plus className="h-4 w-4 mr-2" />
                Add First Infographic
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {infographics.map((infographic) => (
              <Card key={infographic.id} className="hover-elevate" data-testid={`card-infographic-${infographic.slug}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
                  <CardTitle className="text-lg font-semibold line-clamp-1">
                    {infographic.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(infographic)} data-testid={`button-edit-${infographic.slug}`}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-delete-${infographic.slug}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Infographic</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{infographic.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(infographic.id)}
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
                  <div className="space-y-2">
                    {infographic.imageUrl && (
                      <div className="aspect-video bg-muted rounded-md overflow-hidden">
                        <img
                          src={infographic.imageUrl}
                          alt={infographic.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {infographic.pdfUrl && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BarChart3 className="h-4 w-4" />
                        <span>{infographic.pdfSize || "Unknown size"}</span>
                      </div>
                    )}
                    {infographic.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {infographic.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Infographic" : "Add Infographic"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Update the infographic details below." : "Fill in the details for the new infographic."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" value={formData.title} onChange={(e) => {
                  const newTitle = e.target.value;
                  setFormData({ ...formData, title: newTitle, slug: formData.slug || generateSlug(newTitle) });
                }} placeholder="Infographic title" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input id="slug" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="infographic-slug" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Brief description" rows={2} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Image</Label>
                <div className="flex gap-2">
                  <Input id="imageUrl" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="Image URL" className="flex-1" />
                  <input type="file" ref={imageInputRef} onChange={(e) => handleFileUpload(e, "image")} accept="image/*" className="hidden" />
                  <Button type="button" variant="outline" onClick={() => imageInputRef.current?.click()} disabled={isUploadingImage}>
                    {isUploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  </Button>
                </div>
                {formData.imageUrl && (
                  <div className="mt-2 h-24 rounded-md overflow-hidden bg-muted">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pdfUrl">PDF File</Label>
                <div className="flex gap-2">
                  <Input id="pdfUrl" value={formData.pdfUrl} onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })} placeholder="PDF URL" className="flex-1" />
                  <input type="file" ref={pdfInputRef} onChange={(e) => handleFileUpload(e, "pdf")} accept=".pdf" className="hidden" />
                  <Button type="button" variant="outline" onClick={() => pdfInputRef.current?.click()} disabled={isUploadingPdf}>
                    {isUploadingPdf ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  </Button>
                </div>
                {formData.pdfUrl && <p className="text-sm text-muted-foreground">PDF: {formData.pdfSize || "Uploaded"}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="order">Order</Label>
                <Input id="order" type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? "Saving..." : editingId ? "Update Infographic" : "Create Infographic"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
