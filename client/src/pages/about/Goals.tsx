import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Users, Award } from "lucide-react";

export default function Goals() {
  const objectives = [
    {
      icon: Target,
      title: "Enhance Intercultural Competence",
      description:
        "Develop comprehensive programs and resources that equip students and educators with the skills to effectively navigate diverse cultural contexts and foster meaningful cross-cultural collaboration.",
      kpis: [
        "500+ students completing Intercultural Passport program",
        "95% participant satisfaction rate",
        "Measurable improvement in intercultural competence assessments",
      ],
    },
    {
      icon: TrendingUp,
      title: "Promote Sustainable Development",
      description:
        "Integrate sustainability principles into educational practices and institutional operations, creating lasting environmental and social impact across partner institutions.",
      kpis: [
        "Sustainability modules integrated into 20+ courses",
        "Reduction in institutional environmental footprint",
        "Community outreach programs in 11 partner locations",
      ],
    },
    {
      icon: Users,
      title: "Strengthen Institutional Partnerships",
      description:
        "Build robust collaborative networks among universities in Central Asia, Georgia, and Europe, facilitating knowledge exchange, resource sharing, and joint initiatives.",
      kpis: [
        "11 active partner institutions across 3 regions",
        "Quarterly collaborative workshops and meetings",
        "Shared educational resources and best practices database",
      ],
    },
    {
      icon: Award,
      title: "Develop Quality Educational Resources",
      description:
        "Create innovative, accessible learning materials including digital courses, storytelling projects, and comprehensive documentation that serve as models for international education.",
      kpis: [
        "Complete IACD MOOC with 10+ modules",
        "50+ digital storytelling projects documented",
        "Open-access resource repository for wider community",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Goals and Objectives"
        description="Strategic objectives driving meaningful impact across partner institutions"
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl font-semibold mb-4 text-foreground">Project Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              GREENENGINE strives to create a transformative educational ecosystem that empowers students and institutions to become leaders in intercultural understanding and sustainable development. Our objectives are designed to deliver measurable, lasting impact across all participating communities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <Card key={index} className="h-full" data-testid={`card-objective-${index}`}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <objective.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{objective.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{objective.description}</p>

                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Key Performance Indicators</h4>
                    <ul className="space-y-2">
                      {objective.kpis.map((kpi, kpiIndex) => (
                        <li key={kpiIndex} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                          <span className="text-sm text-muted-foreground">{kpi}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-muted/30 rounded-lg p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground text-center">Impact Framework</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">11</div>
                <div className="text-sm font-medium text-muted-foreground">Partner Institutions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <div className="text-sm font-medium text-muted-foreground">Geographic Regions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm font-medium text-muted-foreground">Students Impacted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
