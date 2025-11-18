import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Target, Calendar, BarChart3, ArrowRight } from "lucide-react";
import heroImage from "@assets/stock_images/green_forest_nature__56ef692b.jpg";
import sustainabilityImage from "@assets/stock_images/modern_green_sustain_70ad4357.jpg";
import collaborationImage from "@assets/stock_images/diverse_students_col_518f0c0a.jpg";
import discoverImage1 from "@assets/stock_images/sustainable_green_ed_e49cdfda.jpg";
import discoverImage2 from "@assets/stock_images/sustainable_green_ed_ab658307.jpg";
import discoverImage3 from "@assets/stock_images/environmental_sustai_b0941dde.jpg";
import discoverImage4 from "@assets/stock_images/environmental_sustai_bb342fce.jpg";
import discoverImage5 from "@assets/stock_images/environmental_sustai_4fd1c4ba.jpg";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Intercultural Learning",
      description: "Comprehensive programs fostering intercultural competence and digital storytelling across international institutions.",
      href: "/passport",
      image: discoverImage1,
    },
    {
      icon: Users,
      title: "Institution Stories",
      description: "Discover the unique contributions and achievements of our partner universities across Central Asia, Georgia, and Europe.",
      href: "/stories",
      image: discoverImage2,
    },
    {
      icon: Target,
      title: "Action",
      description: "Detailed strategies and implementation frameworks for sustainable educational development initiatives.",
      href: "/action-plans",
      image: discoverImage3,
    },
    {
      icon: Calendar,
      title: "Project Events",
      description: "Explore our international meetings, workshops, and collaborative events with photo galleries and documentation.",
      href: "/events",
      image: discoverImage4,
    },
    {
      icon: BarChart3,
      title: "Infographic Reports",
      description: "Visual insights and data-driven analysis of project outcomes and impact across partner institutions.",
      href: "/infographics",
      image: discoverImage5,
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Green sustainable environment and nature"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
            Building Intercultural Competence for a Sustainable Future
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Empowering higher education institutions across Central Asia, Georgia, and Europe through collaborative learning and sustainable development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about">
              <Button size="lg" variant="default" className="min-w-[180px] transition-all hover:scale-105" data-testid="button-learn-more">
                Learn More
              </Button>
            </Link>
            <Link href="/stories">
              <Button size="lg" variant="outline" className="min-w-[180px] bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105" data-testid="button-explore-stories">
                Explore Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 opacity-50"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Explore Our Initiatives
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Discover GREENENGINE
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive resources, partner stories, and collaborative initiatives promoting intercultural education and sustainable development across three continents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={feature.href} href={feature.href}>
                <div 
                  className="group relative h-[420px] overflow-visible cursor-pointer transition-all duration-500 hover-elevate active-elevate-2"
                  data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {/* Inner container with rounded corners and overflow hidden */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    {/* Background Image */}
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90 transition-opacity duration-500 group-hover:from-primary/40 group-hover:via-primary/70 group-hover:to-primary/95"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    {/* Icon */}
                    <div className="mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                      <div className="inline-flex h-14 w-14 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 items-center justify-center">
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 transform transition-all duration-500 group-hover:-translate-y-1">
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-3 transform transition-all duration-500 group-hover:text-white">
                      {feature.description}
                    </p>
                    
                    {/* Arrow CTA */}
                    <div className="flex items-center gap-2 text-white font-semibold text-sm opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <span>Explore</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
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
            <div className="relative h-[400px] rounded-md overflow-hidden shadow-lg">
              <img
                src={sustainabilityImage}
                alt="Sustainable green energy and environmental innovation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-md overflow-hidden shadow-lg order-2 md:order-1">
              <img
                src={collaborationImage}
                alt="Diverse students collaborating on sustainable development"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Partner Institutions</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Collaborating with leading universities and institutions across three continents to advance intercultural education and sustainable development through innovative partnerships and shared learning experiences.
              </p>
              <Link href="/partners">
                <Button variant="default" size="lg" data-testid="button-view-partners">
                  View All Partners
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
