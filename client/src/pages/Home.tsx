import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Target, Calendar, FileText, BarChart3 } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_image_diverse_students_020c3915.png";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Intercultural Learning",
      description: "Comprehensive programs fostering intercultural competence and digital storytelling across international institutions.",
      href: "/passport",
    },
    {
      icon: Users,
      title: "Institution Stories",
      description: "Discover the unique contributions and achievements of our partner universities across Central Asia, Georgia, and Europe.",
      href: "/stories",
    },
    {
      icon: Target,
      title: "Action Plans",
      description: "Detailed strategies and implementation frameworks for sustainable educational development initiatives.",
      href: "/action-plans",
    },
    {
      icon: Calendar,
      title: "Project Events",
      description: "Explore our international meetings, workshops, and collaborative events with photo galleries and documentation.",
      href: "/events",
    },
    {
      icon: BarChart3,
      title: "Infographic Reports",
      description: "Visual insights and data-driven analysis of project outcomes and impact across partner institutions.",
      href: "/infographics",
    },
    {
      icon: FileText,
      title: "Community Plans",
      description: "Comprehensive development plans supporting local communities through educational innovation and partnerships.",
      href: "/community-plans",
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Diverse international students collaborating"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Building Intercultural Competence for a Sustainable Future
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Empowering higher education institutions across Central Asia, Georgia, and Europe through collaborative learning and sustainable development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about">
              <Button size="lg" variant="default" className="min-w-[160px]" data-testid="button-learn-more">
                Learn More
              </Button>
            </Link>
            <Link href="/stories">
              <Button size="lg" variant="outline" className="min-w-[160px] bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" data-testid="button-explore-stories">
                Explore Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover GREENENGINE</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive resources, partner stories, and collaborative initiatives promoting intercultural education and sustainable development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href}>
                <Card className="h-full hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader>
                    <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About the Project</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              GREENENGINE is an international educational initiative co-funded by the European Union's Erasmus+ Programme, bringing together universities and institutions from Central Asia, Georgia, and Europe to foster intercultural competence, sustainable development, and collaborative innovation in higher education.
            </p>
            <Link href="/about">
              <Button variant="outline" size="lg" data-testid="button-read-more-about">
                Read More About GREENENGINE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Partner Institutions</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Collaborating with leading universities and institutions across three continents to advance intercultural education.
          </p>
          <Link href="/partners">
            <Button variant="default" size="lg" data-testid="button-view-partners">
              View All Partners
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
