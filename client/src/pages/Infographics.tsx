import { useQuery } from "@tanstack/react-query";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Infographic } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import heroImage from "@assets/stock_images/diverse_students_col_55923d1a.jpg";

export default function Infographics() {
  const { data: infographics, isLoading } = useQuery<Infographic[]>({
    queryKey: ["/api/infographics"],
  });

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Infographic Reports"
        description="Visual insights and data-driven analysis of project outcomes"
        imageUrl={heroImage}
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore visual representations of GREENENGINE's impact, progress, and key findings through our comprehensive infographic reports.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-64 w-full mb-4 rounded-md" />
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : infographics && infographics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {infographics.map((infographic) => (
                <Card key={infographic.id} className="h-full" data-testid={`card-infographic-${infographic.slug}`}>
                  {infographic.imageUrl && (
                    <div className="relative h-64 overflow-hidden rounded-t-md bg-muted">
                      <img
                        src={infographic.imageUrl}
                        alt={infographic.title}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl leading-tight">{infographic.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {infographic.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {infographic.description}
                      </p>
                    )}
                    <div className="flex flex-col gap-2">
                      {infographic.pdfUrl && (
                        <Button variant="default" size="sm" className="w-full" asChild data-testid={`button-download-${infographic.slug}`}>
                          <a href={infographic.pdfUrl} download>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </a>
                        </Button>
                      )}
                      {infographic.imageUrl && (
                        <Button variant="outline" size="sm" className="w-full" asChild data-testid={`button-view-${infographic.slug}`}>
                          <a href={infographic.imageUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Full Size
                          </a>
                        </Button>
                      )}
                    </div>
                    {infographic.pdfSize && (
                      <div className="text-xs text-muted-foreground">
                        PDF size: {infographic.pdfSize}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">No Infographics Available</h3>
                <p className="text-muted-foreground">
                  Infographic reports will be published as project data and outcomes become available.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
