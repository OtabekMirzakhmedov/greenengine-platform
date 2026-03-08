import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Users, Award } from "lucide-react";

export default function Goals() {
  const objectives = [
    {
      icon: Target,
      title: "Modernization of Engineering Curricula",
      description:
        "Develop and introduce new courses and modules related to green technologies, sustainable engineering, renewable energy, and environmental management in partner universities.",
      kpis: [
        "New sustainability-focused modules in engineering programs",
        "Integration of green technologies into existing courses",
        "Updated curricula aligned with European best practices",
      ],
    },
    {
      icon: TrendingUp,
      title: "Capacity Building for Academic Staff",
      description:
        "Strengthen the professional competencies of academic staff through international training, workshops, and knowledge exchange with European partner universities.",
      kpis: [
        "Faculty training programs on sustainable engineering",
        "International workshops and knowledge exchange sessions",
        "Enhanced teaching methodologies across partner institutions",
      ],
    },
    {
      icon: Users,
      title: "Strengthening University-Industry Cooperation",
      description:
        "Develop stronger partnerships between universities and industry stakeholders to ensure that engineering education meets the needs of the modern labor market.",
      kpis: [
        "Industry partnerships established at each partner institution",
        "Joint projects between academia and industry",
        "Graduate employment alignment with market needs",
      ],
    },
    {
      icon: Award,
      title: "Promotion of Sustainable Innovation",
      description:
        "Encourage research and innovation activities focused on sustainable technological development and environmentally friendly engineering solutions.",
      kpis: [
        "Research projects on renewable energy and green tech",
        "Student innovation competitions and initiatives",
        "Collaborative research publications across partners",
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
              The main goal of the GREENENGINE project is to modernize engineering education in partner countries by integrating sustainability, green technologies, and innovative teaching approaches into academic programs. Our objectives are designed to prepare future engineers who can address global environmental challenges and contribute to sustainable technological development.
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
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground text-center">Project Consortium</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">11</div>
                <div className="text-sm font-medium text-muted-foreground">Partner Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">4</div>
                <div className="text-sm font-medium text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">2</div>
                <div className="text-sm font-medium text-muted-foreground">Regions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">EU</div>
                <div className="text-sm font-medium text-muted-foreground">Erasmus+ Funded</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
