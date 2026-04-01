import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus, Edit, Trash2, ArrowLeft, Calendar as CalendarIcon, Upload, Loader2, X, Image as ImageIcon, FileText } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Event } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
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

interface EventFormData {
  title: string;
  slug: string;
  date: string;
  location: string;
  venue: string;
  overview: string;
  agenda: string;
  agendaPdfUrl: string;
  gallery: string[];
  documents: Array<{ name: string; url: string; size: string }>;
  attendeeCount: number | null;
}

const emptyFormData: EventFormData = {
  title: "",
  slug: "",
  date: new Date().toISOString().split("T")[0],
  location: "",
  venue: "",
  overview: "",
  agenda: "",
  agendaPdfUrl: "",
  gallery: [],
  documents: [],
  attendeeCount: null,
};

export default function EventsAdmin() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<EventFormData>(emptyFormData);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [isUploadingDocuments, setIsUploadingDocuments] = useState(false);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const documentsInputRef = useRef<HTMLInputElement>(null);

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete event",
        variant: "destructive",
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: EventFormData) => {
      return apiRequest("POST", "/api/events", {
        ...data,
        date: new Date(data.date),
        photoCount: data.gallery.length,
        attendeeCount: data.attendeeCount || undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setDialogOpen(false);
      setEditingId(null);
      setFormData(emptyFormData);
      toast({
        title: "Success",
        description: "Event created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create event",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EventFormData }) => {
      return apiRequest("PUT", `/api/events/${id}`, {
        ...data,
        date: new Date(data.date),
        photoCount: data.gallery.length,
        attendeeCount: data.attendeeCount || undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setDialogOpen(false);
      setEditingId(null);
      setFormData(emptyFormData);
      toast({
        title: "Success",
        description: "Event updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update event",
        variant: "destructive",
      });
    },
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      ...emptyFormData,
      date: new Date().toISOString().split("T")[0],
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (event: Event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      slug: event.slug,
      date: new Date(event.date).toISOString().split("T")[0],
      location: event.location || "",
      venue: event.venue || "",
      overview: event.overview || "",
      agenda: event.agenda || "",
      agendaPdfUrl: event.agendaPdfUrl || "",
      gallery: event.gallery || [],
      documents: event.documents || [],
      attendeeCount: event.attendeeCount || null,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPdf(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
        credentials: "include",
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setFormData((prev) => ({ ...prev, agendaPdfUrl: data.url }));
      toast({
        title: "Success",
        description: "PDF uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload PDF",
        variant: "destructive",
      });
    } finally {
      setIsUploadingPdf(false);
      if (pdfInputRef.current) {
        pdfInputRef.current.value = "";
      }
    }
  };

  const formatFileSize = (size: number) => {
    return size < 1024 * 1024
      ? `${(size / 1024).toFixed(1)} KB`
      : `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploadingImages(true);
    try {
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formDataUpload,
          credentials: "include",
        });

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();
        uploadedUrls.push(data.url);
      }

      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...uploadedUrls],
      }));
      toast({
        title: "Success",
        description: `${uploadedUrls.length} photo${uploadedUrls.length > 1 ? "s" : ""} uploaded successfully`,
      });
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to upload event photos",
        variant: "destructive",
      });
    } finally {
      setIsUploadingImages(false);
      if (galleryInputRef.current) {
        galleryInputRef.current.value = "";
      }
    }
  };

  const handleDocumentsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploadingDocuments(true);
    try {
      const uploadedDocuments: Array<{ name: string; url: string; size: string }> = [];

      for (const file of files) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formDataUpload,
          credentials: "include",
        });

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();
        uploadedDocuments.push({
          name: file.name,
          url: data.url,
          size: formatFileSize(file.size),
        });
      }

      setFormData((prev) => ({
        ...prev,
        documents: [...prev.documents, ...uploadedDocuments],
      }));
      toast({
        title: "Success",
        description: `${uploadedDocuments.length} material${uploadedDocuments.length > 1 ? "s" : ""} uploaded successfully`,
      });
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to upload event materials",
        variant: "destructive",
      });
    } finally {
      setIsUploadingDocuments(false);
      if (documentsInputRef.current) {
        documentsInputRef.current.value = "";
      }
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, index) => index !== indexToRemove),
    }));
  };

  const removeDocument = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, index) => index !== indexToRemove),
    }));
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
              <h1 className="text-2xl font-bold text-foreground">Events</h1>
            </div>
            <Button size="sm" onClick={handleOpenCreate} data-testid="button-add-event">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
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
        ) : !events || events.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="text-muted-foreground mb-4">No events found</p>
              <Button onClick={handleOpenCreate} data-testid="button-add-first-event">
                <Plus className="h-4 w-4 mr-2" />
                Add First Event
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="hover-elevate" data-testid={`card-event-${event.slug}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
                  <CardTitle className="text-lg font-semibold line-clamp-1">
                    {event.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(event)} data-testid={`button-edit-${event.slug}`}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-delete-${event.slug}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Event</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{event.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(event.id)}
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{format(new Date(event.date), "PPP")}</span>
                    </div>
                    {event.location && (
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    )}
                    {event.overview && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.overview}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Event" : "Add Event"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the event details below."
                : "Fill in the details for the new event."}
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
                    setFormData({
                      ...formData,
                      title: newTitle,
                      slug: formData.slug || generateSlug(newTitle),
                    });
                  }}
                  placeholder="Event title"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="event-slug"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="City, Country"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                    placeholder="Venue name"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="overview">Overview</Label>
                <Textarea
                  id="overview"
                  value={formData.overview}
                  onChange={(e) =>
                    setFormData({ ...formData, overview: e.target.value })
                  }
                  placeholder="Brief overview of the event"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agenda">Agenda</Label>
                <Textarea
                  id="agenda"
                  value={formData.agenda}
                  onChange={(e) =>
                    setFormData({ ...formData, agenda: e.target.value })
                  }
                  placeholder="Event agenda (supports HTML)"
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agendaPdfUrl">Agenda PDF</Label>
                <div className="flex gap-2">
                  <Input
                    id="agendaPdfUrl"
                    value={formData.agendaPdfUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, agendaPdfUrl: e.target.value })
                    }
                    placeholder="PDF URL"
                    className="flex-1"
                  />
                  <input
                    type="file"
                    ref={pdfInputRef}
                    onChange={handlePdfUpload}
                    accept=".pdf"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => pdfInputRef.current?.click()}
                    disabled={isUploadingPdf}
                  >
                    {isUploadingPdf ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {formData.agendaPdfUrl ? (
                  <div className="space-y-1">
                    <a
                      href={formData.agendaPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary underline-offset-4 hover:underline"
                    >
                      Preview uploaded agenda PDF
                    </a>
                    <p className="text-xs text-muted-foreground">Agenda PDF is now attached to this event draft.</p>
                  </div>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label>Event Photos</Label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={galleryInputRef}
                    onChange={handleGalleryUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => galleryInputRef.current?.click()}
                    disabled={isUploadingImages}
                  >
                    {isUploadingImages ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ImageIcon className="h-4 w-4" />
                    )}
                    <span className="ml-2">Upload Photos</span>
                  </Button>
                </div>
                {formData.gallery.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {formData.gallery.map((imageUrl, index) => (
                      <div key={`${imageUrl}-${index}`} className="relative overflow-hidden rounded-md border bg-muted">
                        <img src={imageUrl} alt={`Event gallery ${index + 1}`} className="h-28 w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white transition hover:bg-black"
                          aria-label={`Remove photo ${index + 1}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Uploaded event photos will appear here.</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label>Event Materials</Label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={documentsInputRef}
                    onChange={handleDocumentsUpload}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip"
                    multiple
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => documentsInputRef.current?.click()}
                    disabled={isUploadingDocuments}
                  >
                    {isUploadingDocuments ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                    <span className="ml-2">Upload Materials</span>
                  </Button>
                </div>
                {formData.documents.length > 0 ? (
                  <div className="space-y-2">
                    {formData.documents.map((doc, index) => (
                      <div
                        key={`${doc.url}-${index}`}
                        className="flex items-center justify-between gap-3 rounded-md border bg-muted/40 px-3 py-2"
                      >
                        <div className="min-w-0">
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block truncate text-sm font-medium text-primary underline-offset-4 hover:underline"
                          >
                            {doc.name}
                          </a>
                          <p className="text-xs text-muted-foreground">{doc.size}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                          aria-label={`Remove document ${doc.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Uploaded event materials will appear here.</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="attendeeCount">Attendee Count</Label>
                <Input
                  id="attendeeCount"
                  type="number"
                  value={formData.attendeeCount || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      attendeeCount: e.target.value ? parseInt(e.target.value) : null,
                    })
                  }
                  placeholder="Number of attendees"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : editingId
                  ? "Update Event"
                  : "Create Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
