import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useRoute } from "wouter";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StoryGallery } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function StoryDetail() {
  const [, params] = useRoute("/stories/:slug");
  const slug = params?.slug;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: gallery, isLoading } = useQuery<StoryGallery>({
    queryKey: ["/api/story-galleries/slug", slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const response = await fetch(`/api/story-galleries/slug/${slug}`);
      if (!response.ok) {
        throw new Error("Gallery not found");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="h-[40vh] min-h-[300px] bg-muted animate-pulse" />
        <div className="flex-1 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="flex flex-col min-h-screen">
        <PageHero title="Gallery Not Found" description="The story gallery you're looking for doesn't exist" />
        <div className="flex-1 py-12 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Story Not Available</h2>
            <p className="text-muted-foreground mb-6">This gallery could not be found.</p>
            <Link href="/stories">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Stories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const storyGallery = gallery;

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title={storyGallery.title}
        description={storyGallery.description || "Explore the full set of photos in this story gallery"}
        imageUrl={storyGallery.images?.[0] || undefined}
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/stories">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Stories
              </Button>
            </Link>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Images className="h-5 w-5" />
                <span>{storyGallery.images?.length ?? 0} photos</span>
              </div>
              {storyGallery.description ? (
                <p className="text-muted-foreground leading-relaxed">{storyGallery.description}</p>
              ) : (
                <p className="text-muted-foreground italic">
                  This gallery contains a visual story collection managed from the admin panel.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Photo Gallery</h2>
              {storyGallery.images && storyGallery.images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {storyGallery.images.map((imageUrl, index) => (
                    <button
                      key={`${imageUrl}-${index}`}
                      type="button"
                      className="group aspect-square overflow-hidden rounded-md bg-muted text-left"
                      onClick={() => setSelectedImage(imageUrl)}
                      data-testid={`story-gallery-image-${index}`}
                    >
                      <img
                        src={imageUrl}
                        alt={`${storyGallery.title} photo ${index + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  No photos have been uploaded to this gallery yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={Boolean(selectedImage)} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-5xl border-none bg-black/95 p-2">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={storyGallery.title}
              className="max-h-[85vh] w-full rounded-md object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
