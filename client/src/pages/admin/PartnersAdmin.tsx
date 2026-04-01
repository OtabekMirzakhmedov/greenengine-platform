import { useRef, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus, Edit, Trash2, ArrowLeft, Users, Upload, Loader2 } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Partner } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

type PartnerFormData = {
  name: string;
  country: string;
  established: string;
  description: string;
  roleInProject: string;
  pic: string;
  address: string;
  phone: string;
  email: string;
  logoUrl: string;
  websiteUrl: string;
  order: number;
};

const emptyFormData: PartnerFormData = {
  name: "",
  country: "",
  established: "",
  description: "",
  roleInProject: "",
  pic: "",
  address: "",
  phone: "",
  email: "",
  logoUrl: "",
  websiteUrl: "",
  order: 0,
};

export default function PartnersAdmin() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState<PartnerFormData>(emptyFormData);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data: partners, isLoading } = useQuery<Partner[]>({
    queryKey: ["/api/partners"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: PartnerFormData) => {
      return apiRequest("POST", "/api/partners", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      toast({
        title: "Success",
        description: "Partner created successfully",
      });
      closeDialog();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create partner",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: PartnerFormData }) => {
      return apiRequest("PUT", `/api/partners/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      toast({
        title: "Success",
        description: "Partner updated successfully",
      });
      closeDialog();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update partner",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/partners/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      toast({
        title: "Success",
        description: "Partner deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete partner",
        variant: "destructive",
      });
    },
  });

  const openAddDialog = () => {
    setEditingPartner(null);
    setFormData({
      ...emptyFormData,
      order: partners?.length ?? 0,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      country: partner.country || "",
      established: partner.established || "",
      description: partner.description || "",
      roleInProject: partner.roleInProject || "",
      pic: partner.pic || "",
      address: partner.address || "",
      phone: partner.phone || "",
      email: partner.email || "",
      logoUrl: partner.logoUrl || "",
      websiteUrl: partner.websiteUrl || "",
      order: partner.order,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingPartner(null);
    setFormData(emptyFormData);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
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

      const data = await response.json();
      setFormData((prev) => ({ ...prev, logoUrl: data.url }));
      toast({
        title: "Success",
        description: "Partner photo uploaded successfully",
      });
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to upload partner photo",
        variant: "destructive",
      });
    } finally {
      setIsUploadingImage(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPartner) {
      updateMutation.mutate({ id: editingPartner.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

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
              <h1 className="text-2xl font-bold text-foreground">Partners</h1>
            </div>
            <Button size="sm" data-testid="button-add-partner" onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Partner
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
        ) : !partners || partners.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="text-muted-foreground mb-4">No partners found</p>
              <Button data-testid="button-add-first-partner" onClick={openAddDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Partner
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <Card key={partner.id} className="hover-elevate" data-testid={`card-partner-${partner.id}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
                  <CardTitle className="text-lg font-semibold line-clamp-1">
                    {partner.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" data-testid={`button-edit-${partner.id}`} onClick={() => openEditDialog(partner)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-delete-${partner.id}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Partner</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{partner.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(partner.id)}
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
                  <div className="space-y-3">
                    {partner.logoUrl && (
                      <div className="h-16 flex items-center justify-center bg-muted rounded-md">
                        <img
                          src={partner.logoUrl}
                          alt={partner.name}
                          className="max-h-full max-w-full object-contain p-2"
                        />
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 text-xs">
                      {partner.country && (
                        <span className="bg-muted px-2 py-1 rounded">{partner.country}</span>
                      )}
                      {partner.established && (
                        <span className="bg-muted px-2 py-1 rounded">Est. {partner.established}</span>
                      )}
                    </div>
                    {partner.description && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Brief Info</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {partner.description}
                        </p>
                      </div>
                    )}
                    {partner.roleInProject && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Role in Project</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {partner.roleInProject}
                        </p>
                      </div>
                    )}
                    {partner.websiteUrl && (
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit website
                      </a>
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
            <DialogTitle>{editingPartner ? "Edit Partner" : "Add Partner"}</DialogTitle>
            <DialogDescription>
              {editingPartner ? "Update the partner information below." : "Fill in the partner information below."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="established">Established</Label>
                <Input
                  id="established"
                  value={formData.established}
                  onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                  placeholder="e.g., 1930"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Brief Information</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleInProject">Role in Project</Label>
                <Textarea
                  id="roleInProject"
                  value={formData.roleInProject}
                  onChange={(e) => setFormData({ ...formData, roleInProject: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pic">PIC</Label>
                  <Input
                    id="pic"
                    value={formData.pic}
                    onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Photo / Logo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="logoUrl"
                      value={formData.logoUrl}
                      onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                      placeholder="Image URL"
                      className="flex-1"
                    />
                    <input
                      type="file"
                      ref={imageInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => imageInputRef.current?.click()}
                      disabled={isUploadingImage}
                    >
                      {isUploadingImage ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {formData.logoUrl ? (
                    <div className="mt-2 h-28 overflow-hidden rounded-md bg-muted">
                      <img
                        src={formData.logoUrl}
                        alt="Partner preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL</Label>
                  <Input
                    id="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : editingPartner ? "Update Partner" : "Add Partner"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
