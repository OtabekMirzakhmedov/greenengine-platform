import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Camera, Edit, Share2 } from "lucide-react";
import storytellingImage from "@assets/generated_images/Digital_storytelling_workshop_3b549cc9.png";

export default function Storytelling() {
  const process = [
    {
      icon: Camera,
      title: "Story Development",
      description:
        "Students identify meaningful personal experiences related to cultural encounters, transitions, or intercultural learning moments.",
      details: [
        "Personal narrative selection",
        "Cultural reflection exercises",
        "Storyboarding techniques",
        "Script development workshops",
      ],
    },
    {
      icon: Video,
      title: "Media Production",
      description:
        "Using accessible digital tools, students create compelling multimedia stories combining photos, video clips, narration, and music.",
      details: [
        "Photography and videography basics",
        "Audio recording techniques",
        "Digital editing tools training",
        "Visual storytelling principles",
      ],
    },
    {
      icon: Edit,
      title: "Refinement & Feedback",
      description:
        "Peer review sessions and instructor guidance help students polish their stories for maximum impact and cultural sensitivity.",
      details: [
        "Peer feedback sessions",
        "Technical quality review",
        "Cultural sensitivity check",
        "Narrative coherence assessment",
      ],
    },
    {
      icon: Share2,
      title: "Sharing & Reflection",
      description:
        "Completed stories are shared with the broader GREENENGINE community, promoting cross-cultural understanding and dialogue.",
      details: [
        "Public showcasing events",
        "Online gallery publication",
        "Reflective discussion sessions",
        "Community engagement",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Digital Storytelling"
        description="Sharing cultural experiences through creative multimedia narratives"
        imageUrl={storytellingImage}
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4 text-foreground">What is Digital Storytelling?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Digital storytelling is a powerful methodology that combines personal narrative with digital media to create engaging, authentic stories about intercultural experiences. This approach enables students to reflect deeply on their cultural journeys, develop digital literacy skills, and share their perspectives with a global audience.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Through the GREENENGINE Digital Storytelling component, students from all partner institutions create short multimedia narratives (3-5 minutes) that explore themes of cultural identity, intercultural encounters, adaptation, and personal growth.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-foreground text-center">The Storytelling Process</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {process.map((step, index) => (
                <Card key={index} data-testid={`card-step-${index}`}>
                  <CardHeader>
                    <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">Key Activities:</h4>
                      <ul className="space-y-1.5">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Learning Outcomes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Personal Development</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span className="text-muted-foreground">Enhanced self-awareness and cultural identity reflection</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span className="text-muted-foreground">Improved emotional intelligence and empathy</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span className="text-muted-foreground">Confidence in sharing personal narratives</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Technical Skills</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span className="text-muted-foreground">Digital media production and editing capabilities</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span className="text-muted-foreground">Visual communication and design principles</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span className="text-muted-foreground">Project management and creative collaboration</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Communication</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span className="text-muted-foreground">Narrative construction and storytelling techniques</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span className="text-muted-foreground">Audience awareness and cultural sensitivity</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span className="text-muted-foreground">Multimodal communication skills</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Intercultural Competence</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span className="text-muted-foreground">Deeper understanding of cultural diversity</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span className="text-muted-foreground">Appreciation of multiple perspectives</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span className="text-muted-foreground">Critical reflection on intercultural experiences</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Technical Support and Resources</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-foreground">Workshops and Training</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All students receive comprehensive training in digital storytelling methodology, technical skills, and ethical considerations through hands-on workshops led by experienced instructors.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-foreground">Equipment Access</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Partner institutions provide access to cameras, recording equipment, and editing software. Students can also use personal smartphones and free software tools.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-foreground">Mentorship and Feedback</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Dedicated mentors provide ongoing support, constructive feedback, and technical assistance throughout the storytelling process, ensuring every student succeeds.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
