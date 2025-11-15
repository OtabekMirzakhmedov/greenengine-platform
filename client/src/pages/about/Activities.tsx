import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle2 } from "lucide-react";

export default function Activities() {
  const phases = [
    {
      title: "Phase 1: Foundation & Planning",
      period: "Months 1-6",
      activities: [
        "Establishment of project governance structure and quality assurance frameworks",
        "Initial partner institution meetings and coordination workshops",
        "Development of Intercultural Passport curriculum and learning outcomes",
        "Baseline assessments and stakeholder consultations",
      ],
      outcomes: [
        "Governance framework document approved by all partners",
        "Complete curriculum design for IACD MOOC",
        "Stakeholder engagement strategy established",
      ],
    },
    {
      title: "Phase 2: Development & Implementation",
      period: "Months 7-18",
      activities: [
        "IACD MOOC content creation and platform development",
        "Digital storytelling workshop series across all partner institutions",
        "Community development plan formulation with local stakeholders",
        "Faculty training programs on intercultural competence",
      ],
      outcomes: [
        "Complete IACD MOOC with 10+ modules launched",
        "50+ digital storytelling projects completed",
        "Community development plans for 11 locations",
        "100+ faculty members trained",
      ],
    },
    {
      title: "Phase 3: Scaling & Evaluation",
      period: "Months 19-30",
      activities: [
        "Full-scale implementation of Intercultural Passport program",
        "Monitoring and evaluation of project outcomes",
        "Development of sustainability plans for each institution",
        "Dissemination of results through conferences and publications",
      ],
      outcomes: [
        "500+ students completing Intercultural Passport",
        "Comprehensive evaluation report with impact metrics",
        "Sustainability plans ensuring long-term impact",
        "Project results presented at 3+ international conferences",
      ],
    },
  ];

  const achievements = [
    "Successful launch of comprehensive Intercultural Passport program",
    "Establishment of sustainable partnerships across 11 institutions",
    "Development of open-access educational resources",
    "Creation of vibrant digital storytelling community",
    "Integration of sustainability principles into institutional practices",
    "Positive feedback from 95%+ of program participants",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Activities and Outcomes"
        description="Timeline of project milestones and measurable achievements"
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl font-semibold mb-4 text-foreground">Project Timeline</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              GREENENGINE follows a structured 30-month implementation timeline, divided into three strategic phases ensuring systematic progress toward all project objectives.
            </p>
          </div>

          <div className="space-y-8 mb-16">
            {phases.map((phase, index) => (
              <Card key={index} data-testid={`card-phase-${index}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <CardTitle className="text-2xl mb-2">{phase.title}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{phase.period}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Key Activities</h4>
                    <ul className="space-y-2">
                      {phase.activities.map((activity, activityIndex) => (
                        <li key={activityIndex} className="flex items-start gap-3">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                          <span className="text-muted-foreground">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Expected Outcomes</h4>
                    <ul className="space-y-2">
                      {phase.outcomes.map((outcome, outcomeIndex) => (
                        <li key={outcomeIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted/30 rounded-lg p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">Key Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-md">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
