import { useQuery } from "@tanstack/react-query";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, CheckCircle2 } from "lucide-react";
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our detailed action plans outlining strategies, timelines, and deliverables for the GREENENGINE project's key initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-muted/30 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Key Activities</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                  <span className="text-muted-foreground">Analysis of current curricula and EU best practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                  <span className="text-muted-foreground">Development of Creative Green Engineering courses</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                  <span className="text-muted-foreground">Faculty training on innovative methodologies</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                  <span className="text-muted-foreground">Course implementation and evaluation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                  <span className="text-muted-foreground">Student Winter Camps promoting teamwork and eco-innovation</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Expected Results</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Development of new sustainability focused courses – 14</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Establishment of VR labs in UZ and GE universities – 6</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Integration of courses into existing engineering curricula (launch of new courses by Sep 2026)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Building teacher capacity – 30 teachers at UOI, and 100 locally (multiplication trainings)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Total number of students engaged in modernized programs by the end of the project – 500</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Strengthen international cooperation – bilateral/multilateral cooperation agreements between partners</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
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
                          <a href={plan.fileUrl} download target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" />
                            Download File
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {plan.description ? (
                      <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                        {plan.description}
                      </p>
                    ) : (
                      <p className="text-muted-foreground italic">
                        Download the file to view the complete action plan.
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
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="mx-auto mb-4 h-10 w-10 text-muted-foreground/60" />
                <h3 className="mb-2 text-xl font-semibold">No action plans available yet</h3>
                <p className="text-muted-foreground">
                  Once plans are added in the admin panel, they will appear here automatically.
                </p>
              </CardContent>
            </Card>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
