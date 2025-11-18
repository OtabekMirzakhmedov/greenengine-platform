import { useQuery } from "@tanstack/react-query";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ActionPlan } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import heroImage from "@assets/stock_images/modern_green_sustain_b56e3a5e.jpg";

export default function ActionPlans() {
  const { data: actionPlans, isLoading } = useQuery<ActionPlan[]>({
    queryKey: ["/api/action-plans"],
  });

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Action"
        description="Strategic implementation frameworks for sustainable educational development"
        imageUrl={heroImage}
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our detailed action plans outlining strategies, timelines, and deliverables for the GREENENGINE project's key initiatives.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-20 w-full" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : actionPlans && actionPlans.length > 0 ? (
            <div className="space-y-6">
              {actionPlans.map((plan) => (
                <Card key={plan.id} data-testid={`card-action-plan-${plan.slug}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <CardTitle className="text-2xl flex-1">{plan.title}</CardTitle>
                      {plan.fileUrl && (
                        <Button variant="default" size="sm" asChild data-testid={`button-download-${plan.slug}`}>
                          <a href={plan.fileUrl} download>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {plan.description ? (
                      <div
                        className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: plan.description }}
                      />
                    ) : (
                      <p className="text-muted-foreground italic">
                        Download the PDF to view the complete action plan.
                      </p>
                    )}
                    {plan.fileSize && (
                      <div className="mt-4 text-sm text-muted-foreground">
                        File size: {plan.fileSize}
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
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">No Action Plans Available</h3>
                <p className="text-muted-foreground">
                  Action plans will be published here as they are developed and approved.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
