import { useQuery } from "@tanstack/react-query";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ExternalLink, Images } from "lucide-react";
import type { StoryGallery } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import heroImage from "@assets/stock_images/university_campus_ed_b4274d37.jpg";

export default function Stories() {
  const { data: galleries, isLoading } = useQuery<StoryGallery[]>({
    queryKey: ["/api/story-galleries"],
  });

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Stories of GREENENGINE"
        description="Browse project photo galleries grouped into story collections"
        imageUrl={heroImage}
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4 text-foreground">Photo Story Galleries</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Each story now works as a gallery collection. Open any gallery to explore the full set of uploaded images in a responsive photo grid.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-48 w-full mb-4 rounded-md" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : galleries && galleries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((gallery) => (
                <Link key={gallery.id} href={`/stories/${gallery.slug}`}>
                  <Card className="h-full hover-elevate active-elevate-2 transition-all cursor-pointer overflow-hidden" data-testid={`card-story-gallery-${gallery.slug}`}>
                    {gallery.images && gallery.images.length > 0 && (
                      <div className="relative h-48 overflow-hidden rounded-t-md">
                        <img
                          src={gallery.images[0]}
                          alt={gallery.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl leading-tight">{gallery.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <Images className="h-4 w-4" />
                        {gallery.images?.length ?? 0} photos
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                        {gallery.description || "Open this gallery to explore the full photo story."}
                      </p>
                      <div className="flex items-center gap-2 text-primary font-medium mt-4">
                        <span className="text-sm">Open Gallery</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Images className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">No Story Galleries Yet</h3>
                <p className="text-muted-foreground">
                  Story galleries will appear here once they are added by administrators.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
