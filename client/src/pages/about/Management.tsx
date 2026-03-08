import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, FileCheck, Target } from "lucide-react";

export default function Management() {
  const governance = [
    {
      icon: Users,
      title: "Project Coordination",
      description:
        "The project is coordinated by Tashkent Kimyo International University, which is responsible for overall project administration, coordination among partners, financial management, and reporting to the European Commission.",
      responsibilities: [
        "Overall project administration and management",
        "Coordination of activities across partner institutions",
        "Financial management and budget oversight",
        "Reporting to the European Commission",
      ],
    },
    {
      icon: Target,
      title: "Steering Committee",
      description:
        "A steering committee composed of representatives from all partner institutions oversees the strategic direction of the project and ensures that activities are implemented according to the project plan.",
      responsibilities: [
        "Strategic oversight of project direction",
        "Ensuring activities align with project objectives",
        "Decision-making on key project matters",
        "Coordination between partner institutions",
      ],
    },
    {
      icon: FileCheck,
      title: "Quality Assurance",
      description:
        "Quality control measures are implemented throughout the project lifecycle to ensure that all activities meet the expected academic and organizational standards.",
      responsibilities: [
        "Regular progress monitoring and evaluation",
        "Internal evaluations and feedback collection",
        "Review of project deliverables by experts",
        "Assessment of deliverable quality standards",
      ],
    },
    {
      icon: Shield,
      title: "External Review",
      description:
        "Independent experts and partner institutions periodically review project deliverables to assess their quality and ensure alignment with project objectives.",
      responsibilities: [
        "Independent quality assessment",
        "Peer review of deliverables",
        "Recommendations for improvement",
        "Validation of project outcomes",
      ],
    },
  ];

  const qualityAspects = [
    {
      title: "Regular Monitoring",
      description: "Continuous tracking of project progress against established milestones and KPIs",
    },
    {
      title: "Stakeholder Feedback",
      description: "Systematic collection and integration of feedback from students, faculty, and partners",
    },
    {
      title: "Peer Review",
      description: "Internal and external review processes ensuring deliverable quality",
    },
    {
      title: "Risk Management",
      description: "Proactive identification and mitigation of project risks",
    },
    {
      title: "Documentation Standards",
      description: "Consistent documentation practices across all project activities",
    },
    {
      title: "Continuous Improvement",
      description: "Iterative refinement based on lessons learned and best practices",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Management and Quality"
        description="Governance structure and quality assurance framework"
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl font-semibold mb-4 text-foreground">Project Management Structure</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Effective project management and quality assurance are essential for the successful implementation of the GREENENGINE project. The project employs a robust governance framework ensuring effective coordination, transparent decision-making, and accountability across all partner institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {governance.map((role, index) => (
              <Card key={index} data-testid={`card-governance-${index}`}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <role.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{role.description}</p>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-foreground">Key Responsibilities</h4>
                    <ul className="space-y-1.5">
                      {role.responsibilities.map((resp, respIndex) => (
                        <li key={respIndex} className="flex items-start gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          <span className="text-muted-foreground">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Quality Assurance Mechanisms</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Quality control measures are implemented throughout the project lifecycle to ensure that all activities meet the expected academic and organizational standards. This includes regular progress monitoring, internal evaluations, and feedback from project partners.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {qualityAspects.map((aspect, index) => (
                <Card key={index} className="bg-muted/30" data-testid={`card-quality-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 text-foreground">{aspect.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{aspect.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-8 md:p-12">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Sustainability and Long-term Impact</h2>
            <div className="space-y-4 max-w-3xl">
              <p className="text-muted-foreground leading-relaxed">
                Beyond the project duration, GREENENGINE is committed to ensuring lasting impact through:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Curricula Integration:</strong> Embedding green technologies and sustainability principles into regular engineering curricula
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Laboratory Infrastructure:</strong> Maintaining green engineering laboratories for continued teaching and research
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Industry Partnerships:</strong> Sustaining university-industry links for graduate employment and collaborative research
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Network Continuation:</strong> Maintaining academic partnerships and knowledge exchange beyond project completion
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
