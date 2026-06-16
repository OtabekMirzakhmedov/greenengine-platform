import { useQuery } from "@tanstack/react-query";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { GoalObjective } from "@shared/schema";
import { Award, BookOpen, Building2, Globe2, Leaf, Map, Target, TrendingUp, Users } from "lucide-react";

const iconMap = {
  target: Target,
  "trending-up": TrendingUp,
  users: Users,
  award: Award,
  leaf: Leaf,
  "book-open": BookOpen,
  building: Building2,
  globe: Globe2,
  map: Map,
};

const getIcon = (value: string) => iconMap[value as keyof typeof iconMap] ?? Target;

export default function Goals() {
  const { data: items, isLoading } = useQuery<GoalObjective[]>({
    queryKey: ["/api/goal-objectives"],
  });

  const allItems = items ?? [];
  const visionItems = allItems.filter((item) => item.itemType === "vision");
  const objectives = allItems.filter((item) => item.itemType === "objective");
  const stats = allItems.filter((item) => item.itemType === "stat");

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Goals and Objectives"
        description="Strategic objectives driving meaningful impact across partner institutions"
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="mb-12 max-w-3xl space-y-4">
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-28 w-full" />
            </div>
          ) : (
            <div className="mb-12 space-y-8">
              {visionItems.map((item) => (
                <div key={item.id} className="max-w-3xl">
                  <h2 className="text-3xl font-semibold mb-4 text-foreground">{item.title}</h2>
                  {item.description ? (
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                  ) : null}
                </div>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-80 w-full" />
              ))}
            </div>
          ) : objectives.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {objectives.map((objective, index) => {
                const Icon = getIcon(objective.icon);
                const kpis = Array.isArray(objective.kpis) ? objective.kpis : [];

                return (
                  <Card key={objective.id} className="h-full" data-testid={`card-objective-${index}`}>
                    <CardHeader>
                      <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{objective.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {objective.description ? (
                        <p className="text-muted-foreground leading-relaxed">{objective.description}</p>
                      ) : null}

                      {kpis.length > 0 ? (
                        <div>
                          <h4 className="font-semibold mb-3 text-foreground">Key Performance Indicators</h4>
                          <ul className="space-y-2">
                            {kpis.map((kpi, kpiIndex) => (
                              <li key={kpiIndex} className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                                <span className="text-sm text-muted-foreground">{kpi}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Goals and objectives will appear here once published by the admin team.
              </CardContent>
            </Card>
          )}

          {isLoading ? (
            <Skeleton className="mt-16 h-52 w-full" />
          ) : stats.length > 0 ? (
            <div className="mt-16 bg-muted/30 rounded-lg p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground text-center">Project Consortium</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.id} className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{stat.metric}</div>
                    <div className="text-sm font-medium text-muted-foreground">{stat.title}</div>
                    {stat.description ? (
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">{stat.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
