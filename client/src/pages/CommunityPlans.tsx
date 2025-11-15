import { useQuery } from "@tanstack/react-query";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CommunityPlan } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function CommunityPlans() {
  const { data: communityPlans, isLoading } = useQuery<CommunityPlan[]>({
    queryKey: ["/api/community-plans"],
  });

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Community Development Plans"
        description="Supporting local communities through educational innovation and partnerships"
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Comprehensive development plans designed to create lasting impact in partner communities through education, sustainability, and collaborative initiatives.
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
          ) : communityPlans && communityPlans.length > 0 ? (
            <div className="space-y-6">
              {communityPlans.map((plan) => (
                <Card key={plan.id} data-testid={`card-community-plan-${plan.slug}`}>
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
                        Download the PDF to view the complete community development plan.
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
                <h3 className="text-lg font-semibold mb-2 text-foreground">No Community Plans Available</h3>
                <p className="text-muted-foreground">
                  Community development plans will be published as they are developed with local stakeholders.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
