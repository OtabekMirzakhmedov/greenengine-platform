import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Clock, Award } from "lucide-react";

export default function MOOC() {
  const modules = [
    {
      number: 1,
      title: "Introduction to Intercultural Communication",
      duration: "2 hours",
      topics: [
        "Understanding culture and its dimensions",
        "Communication styles across cultures",
        "Cultural value orientations",
        "Self-assessment of intercultural competence",
      ],
    },
    {
      number: 2,
      title: "Cultural Self-Awareness",
      duration: "2.5 hours",
      topics: [
        "Examining personal cultural identity",
        "Understanding cultural biases and stereotypes",
        "Reflection on cultural upbringing",
        "Developing cultural sensitivity",
      ],
    },
    {
      number: 3,
      title: "Communication Patterns and Styles",
      duration: "2 hours",
      topics: [
        "Verbal and non-verbal communication",
        "High-context vs. low-context cultures",
        "Direct and indirect communication",
        "Silence and its cultural meanings",
      ],
    },
    {
      number: 4,
      title: "Values and Beliefs Across Cultures",
      duration: "2.5 hours",
      topics: [
        "Individualism vs. collectivism",
        "Power distance and hierarchy",
        "Uncertainty avoidance",
        "Time orientation differences",
      ],
    },
    {
      number: 5,
      title: "Navigating Cultural Differences",
      duration: "3 hours",
      topics: [
        "Recognizing cultural misunderstandings",
        "Strategies for effective cross-cultural dialogue",
        "Managing intercultural conflict",
        "Building cultural bridges",
      ],
    },
    {
      number: 6,
      title: "Stereotypes and Prejudice",
      duration: "2 hours",
      topics: [
        "Understanding stereotyping mechanisms",
        "Challenging unconscious bias",
        "Developing empathy and perspective-taking",
        "Promoting inclusive attitudes",
      ],
    },
    {
      number: 7,
      title: "Intercultural Adaptation",
      duration: "2.5 hours",
      topics: [
        "Culture shock and adjustment phases",
        "Coping strategies for cultural transitions",
        "Building resilience in diverse environments",
        "Maintaining cultural identity while adapting",
      ],
    },
    {
      number: 8,
      title: "Cross-Cultural Collaboration",
      duration: "3 hours",
      topics: [
        "Effective teamwork in multicultural settings",
        "Leadership in diverse contexts",
        "Decision-making across cultures",
        "Building trust in international teams",
      ],
    },
    {
      number: 9,
      title: "Global Citizenship and Ethics",
      duration: "2 hours",
      topics: [
        "Understanding global interconnectedness",
        "Ethical considerations in intercultural interactions",
        "Sustainable development and cultural diversity",
        "Responsible global engagement",
      ],
    },
    {
      number: 10,
      title: "Capstone Project and Assessment",
      duration: "4 hours",
      topics: [
        "Applying intercultural competence in real scenarios",
        "Personal intercultural development plan",
        "Peer feedback and reflection",
        "Final competence assessment",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="IACD MOOC"
        description="Intercultural Awareness and Communication Development Online Course"
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4 text-foreground">Course Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              The Intercultural Awareness and Communication Development (IACD) MOOC is a comprehensive online learning program designed to build essential intercultural competencies through interactive modules, case studies, and practical exercises.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">10 Modules</div>
                    <div className="text-sm text-muted-foreground">Comprehensive curriculum</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">25+ Hours</div>
                    <div className="text-sm text-muted-foreground">Total learning time</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Certificate</div>
                    <div className="text-sm text-muted-foreground">Upon completion</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Course Modules</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {modules.map((module) => (
                <AccordionItem key={module.number} value={`module-${module.number}`} className="border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="hover:no-underline py-4" data-testid={`accordion-module-${module.number}`}>
                    <div className="flex items-center gap-4 text-left">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-primary">{module.number}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{module.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                          <Clock className="h-3.5 w-3.5" />
                          {module.duration}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-2">
                    <div className="pl-14">
                      <h4 className="font-semibold mb-3 text-sm text-foreground">Topics Covered:</h4>
                      <ul className="space-y-2">
                        {module.topics.map((topic, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                            <span className="text-sm text-muted-foreground">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="bg-muted/30 rounded-lg p-8 md:p-12">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Learning Methodology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Interactive Content</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Each module features video lectures, interactive exercises, case studies from real-world scenarios, and self-assessment tools to reinforce learning.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-foreground">Peer Learning</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Discussion forums and collaborative activities enable students to learn from diverse perspectives and build international networks.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-foreground">Practical Application</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Real-world assignments and reflection exercises help students apply intercultural concepts to their personal and professional contexts.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-foreground">Expert Instruction</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Content developed and delivered by leading intercultural communication scholars and practitioners from partner institutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
