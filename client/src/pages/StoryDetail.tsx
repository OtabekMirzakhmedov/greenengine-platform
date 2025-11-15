import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Institution } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function StoryDetail() {
  const [, params] = useRoute("/stories/:slug");
  const slug = params?.slug;

  const { data: institutions, isLoading } = useQuery<Institution[]>({
    queryKey: ["/api/institutions"],
  });

  const institution = institutions?.find((inst) => inst.slug === slug);

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

  if (!institution) {
    return (
      <div className="flex flex-col min-h-screen">
        <PageHero title="Institution Not Found" description="The institution you're looking for doesn't exist" />
        <div className="flex-1 py-12 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Story Not Available</h2>
            <p className="text-muted-foreground mb-6">This institution story could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title={institution.name}
        imageUrl={institution.heroImageUrl || undefined}
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {institution.logoUrl && (
            <div className="mb-8 flex justify-center">
              <img
                src={institution.logoUrl}
                alt={`${institution.name} logo`}
                className="h-20 object-contain"
              />
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <MapPin className="h-5 w-5" />
            <span className="text-lg">{institution.country}</span>
          </div>

          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="grid w-full grid-cols-4 mb-8" data-testid="tabs-institution">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="achievements" data-testid="tab-achievements">Achievements</TabsTrigger>
              <TabsTrigger value="media" data-testid="tab-media">Media</TabsTrigger>
              <TabsTrigger value="documents" data-testid="tab-documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">About {institution.name}</h2>
                  {institution.description && (
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {institution.description}
                    </p>
                  )}

                  {institution.story && (
                    <div className="prose prose-lg max-w-none">
                      <div
                        className="text-muted-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: institution.story }}
                      />
                    </div>
                  )}

                  {!institution.description && !institution.story && (
                    <p className="text-muted-foreground italic">
                      Detailed information about this institution will be available soon.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Key Achievements</h2>
                  {institution.achievements ? (
                    <div
                      className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: institution.achievements }}
                    />
                  ) : (
                    <p className="text-muted-foreground italic">
                      Achievement information will be added as the project progresses.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              {institution.videoUrl && (
                <Card className="mb-8">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Featured Video</h2>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <a
                        href={institution.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                        data-testid="link-video"
                      >
                        <ExternalLink className="h-5 w-5" />
                        <span>Watch Video</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6 text-foreground">Photo Gallery</h2>
                  {institution.gallery && institution.gallery.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {institution.gallery.map((imageUrl, index) => (
                        <div key={index} className="aspect-video bg-muted rounded-md overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={`${institution.name} photo ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Photos from this institution will be added soon.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6 text-foreground">Downloadable Documents</h2>
                  {institution.attachments && institution.attachments.length > 0 ? (
                    <div className="space-y-4">
                      {institution.attachments.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-muted/50 rounded-md hover-elevate"
                          data-testid={`document-${index}`}
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Download className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-foreground">{doc.name}</div>
                              <div className="text-sm text-muted-foreground">{doc.size}</div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            data-testid={`button-download-${index}`}
                          >
                            <a href={doc.url} download>
                              Download
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Documents and resources will be available soon.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
