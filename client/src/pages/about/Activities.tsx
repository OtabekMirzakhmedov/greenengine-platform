import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle2 } from "lucide-react";

export default function Activities() {
  const phases = [
    {
      title: "Phase 1: Needs Analysis and Curriculum Review",
      period: "Months 1-8",
      activities: [
        "Comprehensive analysis of existing engineering curricula at partner universities",
        "Identification of gaps in sustainability and green technology education",
        "Review of European best practices in sustainable engineering education",
        "Stakeholder consultations with industry and academic partners",
      ],
      outcomes: [
        "Detailed needs analysis report for each partner institution",
        "Gap analysis identifying areas for curriculum modernization",
        "Best practices database from European partner experiences",
      ],
    },
    {
      title: "Phase 2: Curriculum Development & Training",
      period: "Months 9-20",
      activities: [
        "Development of new courses and modules on green technologies and sustainable engineering",
        "Creation of innovative teaching materials and resources",
        "Faculty training programs at European partner universities",
        "Workshops on innovative teaching methodologies",
      ],
      outcomes: [
        "New sustainability-focused modules integrated into engineering programs",
        "Comprehensive teaching materials and course resources",
        "Trained faculty equipped with modern pedagogical approaches",
        "Knowledge exchange between European and Uzbek partners",
      ],
    },
    {
      title: "Phase 3: Implementation & Sustainability",
      period: "Months 21-36",
      activities: [
        "Pilot implementation of new curricula at partner universities",
        "Establishment of university-industry partnerships",
        "Development of sustainability plans for continued impact",
        "Dissemination of results through conferences and publications",
      ],
      outcomes: [
        "Successfully implemented green engineering curricula",
        "Active industry partnerships supporting graduate employment",
        "Sustainability plans ensuring long-term institutional impact",
        "Project results shared at international conferences",
      ],
    },
  ];

  const additionalActivities = [
    {
      title: "Creation of Green Engineering Laboratories",
      description: "Partner universities establish modern laboratories equipped with tools and technologies for teaching and research in green engineering, renewable energy systems, and sustainable industrial processes.",
    },
    {
      title: "Student Engagement and Practical Training",
      description: "Students participate in project activities through internships, research projects, and innovation competitions focused on green technologies and sustainable engineering solutions.",
    },
    {
      title: "Dissemination and Knowledge Sharing",
      description: "Project results are shared through conferences, seminars, publications, and online platforms to ensure that the knowledge generated within the project benefits a wider academic and professional community.",
    },
  ];

  const keyActivities = [
    "Analysis of current curricula and EU best practices",
    "Development of Creative Green Engineering courses",
    "Faculty training on innovative methodologies",
    "Course implementation and evaluation",
    "Student Winter Camps promoting teamwork and eco-innovation",
  ];

  const expectedResults = [
    "Development of new sustainability focused courses – 14",
    "Establishment of VR labs in UZ and GE universities – 6",
    "Integration of courses into existing engineering curricula (launch of new courses by Sep 2026)",
    "Building teacher capacity – 30 teachers at UOI, and 100 locally (multiplication trainings)",
    "Total number of students engaged in modernized programs by the end of the project – 500",
    "Strengthen international cooperation – bilateral/multilateral cooperation agreements between partners",
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
              The GREENENGINE project includes several key activities designed to achieve its objectives and create long-term impact in higher education. The project follows a structured 36-month implementation timeline, divided into three strategic phases.
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

          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Additional Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {additionalActivities.map((activity, index) => (
                <Card key={index} className="bg-muted/30">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3 text-foreground">{activity.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-muted/30 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Key Activities</h2>
              <ul className="space-y-3">
                {keyActivities.map((activity, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                    <span className="text-muted-foreground">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-muted/30 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Expected Results</h2>
              <ul className="space-y-3">
                {expectedResults.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
