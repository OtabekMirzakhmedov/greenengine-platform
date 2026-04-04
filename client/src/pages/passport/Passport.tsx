import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Video, Award, Globe, Compass } from "lucide-react";

export default function Passport() {
  const components = [
    {
      icon: Video,
      title: "Digital Storytelling",
      description:
        "Innovative methodology combining personal narratives with digital media, enabling students to share cultural experiences and develop creative communication skills.",
      href: "/passport/storytelling",
    },
    {
      icon: Compass,
      title: "Intercultural Learning Journey",
      description:
        "A guided passport experience focused on reflection, dialogue, collaborative tasks, and practical global citizenship skills across diverse academic contexts.",
      href: "/passport",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Intercultural Passport"
        description="Developing global competencies through innovative learning experiences"
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4 text-foreground">What is the Intercultural Passport?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The Intercultural Passport is an innovative educational framework designed to equip students with the knowledge, skills, and attitudes necessary to thrive in diverse, globalized environments. Through a combination of online learning and creative projects, participants develop deep intercultural competence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {components.map((component, index) => (
              <Card key={index} className="h-full" data-testid={`card-component-${index}`}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <component.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{component.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{component.description}</p>
                  <Link href={component.href}>
                    <Button variant="outline" data-testid={`button-learn-${index}`}>
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted/30 rounded-lg p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground text-center">Key Learning Outcomes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Cultural Awareness</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Understanding diverse cultural perspectives, values, and communication styles
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Communication Skills</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Effective cross-cultural communication and conflict resolution abilities
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Digital Literacy</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Proficiency in using digital tools for storytelling and creative expression
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Compass className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Critical Thinking</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Analytical skills for examining cultural assumptions and biases
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Program Structure</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-foreground">Flexible Learning Path</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Students can complete the Intercultural Passport at their own pace, with both online modules and hands-on projects available throughout the academic year.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-foreground">Recognized Certification</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Upon successful completion, participants receive an official Intercultural Passport certificate, recognized by all partner institutions and valued by employers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-foreground">Continuous Support</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Dedicated instructors and peer mentors provide guidance, feedback, and support throughout the learning journey, ensuring student success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
