import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HeroCarousel, { HeroSlide } from "@/components/HeroCarousel";
import NewsCarousel from "@/components/NewsCarousel";
import { useQuery } from "@tanstack/react-query";
import type { Activity, HeroSection, News } from "@shared/schema";
import heroImage1 from "@assets/stock_images/green_forest_nature__56ef692b.jpg";
import heroImage2 from "@assets/stock_images/sustainable_green_ed_e49cdfda.jpg";
import heroImage3 from "@assets/stock_images/environmental_sustai_b0941dde.jpg";
import heroImage4 from "@assets/stock_images/modern_green_sustain_70ad4357.jpg";
import sustainabilityImage from "@assets/stock_images/modern_green_sustain_70ad4357.jpg";
import collaborationImage from "@assets/stock_images/diverse_students_col_518f0c0a.jpg";

export default function Home() {
  const { data: newsData } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });
  const { data: heroSections } = useQuery<HeroSection[]>({
    queryKey: ["/api/hero-sections"],
  });
  const { data: activities } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  const fallbackHeroSlides: HeroSlide[] = [
    {
      id: "1",
      title: "Building Intercultural Competence for a Sustainable Future",
      description: "Empowering higher education institutions across Central Asia, Georgia, and Europe through collaborative learning and sustainable development.",
      image: heroImage1,
      ctaText: "Learn More",
      ctaLink: "/about",
      secondaryCtaText: "Explore Stories",
      secondaryCtaLink: "/stories",
    },
    {
      id: "2",
      title: "Youth Dialogues for Global Citizenship",
      description: "Fostering intercultural understanding and digital storytelling through innovative educational partnerships and transformative learning experiences.",
      image: heroImage2,
      ctaText: "Intercultural Passport",
      ctaLink: "/passport",
      secondaryCtaText: "View Events",
      secondaryCtaLink: "/events",
    },
    {
      id: "3",
      title: "International Cooperation for Education Excellence",
      description: "Connecting universities across continents to promote sustainable development and collaborative innovation in higher education.",
      image: heroImage3,
      ctaText: "Our Partners",
      ctaLink: "/partners",
      secondaryCtaText: "Action Plans",
      secondaryCtaLink: "/action",
    },
    {
      id: "4",
      title: "Transforming Higher Education Together",
      description: "Co-funded by the Erasmus+ Programme, bringing together institutions to create lasting impact in intercultural education.",
      image: heroImage4,
      ctaText: "Discover More",
      ctaLink: "/about",
      secondaryCtaText: "View Infographics",
      secondaryCtaLink: "/infographics",
    },
  ];

  const heroSlides: HeroSlide[] =
    heroSections && heroSections.length > 0
      ? heroSections.map((section) => ({
          id: section.id,
          title: section.title,
          description: section.subtitle,
          image: section.imageUrl,
        }))
      : fallbackHeroSlides;

  const activitiesToDisplay = activities?.slice(0, 3) ?? [];

  return (
    <div className="flex flex-col">
      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} autoplayDelay={2000} />

      <section className="relative overflow-hidden py-20 md:py-24">
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
              ERASMUS-EDU-2023-CBHE-STRAND-2 / Project Number: 101236240
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Fostering Creative Engineering for a Sustainable Green World
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              GreenEngine aims to develop a new generation of engineers through modernization of engineering education by integrating sustainability principles, green practices and soft skills, while fostering creativity, innovation and social responsibility among students.
            </p>
          </div>

          {activitiesToDisplay.length > 0 ? (
            <div className="rounded-[2rem] border border-white/60 bg-white/60 px-6 py-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm md:px-8 lg:px-10">
              <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Dynamic Activities Module
                  </div>
                  <h2 className="text-3xl font-bold text-foreground md:text-4xl">Work Packages</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                    Explore the latest three work packages published in the Activities module. Each card opens its dedicated activity page with full content, visuals, and supporting materials.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {activitiesToDisplay.map((activity) => (
                  <Link key={activity.id} href={`/activities/${activity.slug}`}>
                    <div
                      className="group relative h-[430px] cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/20 bg-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_80px_rgba(15,23,42,0.28)]"
                      data-testid={`card-feature-${activity.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <img
                        src={activity.imageUrl}
                        alt={activity.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/15 via-slate-950/45 to-slate-950/95 transition-all duration-500 group-hover:from-emerald-400/25 group-hover:via-slate-950/55 group-hover:to-slate-950/98" />
                      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent opacity-70" />

                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <div className="mb-5 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                          Work Package
                        </div>

                        <h3 className="mb-3 text-2xl font-bold text-white transition-transform duration-500 group-hover:-translate-y-1">
                          {activity.title}
                        </h3>

                        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-white/85 transition-colors duration-500 group-hover:text-white">
                          {activity.description}
                        </p>

                        <div className="flex items-center gap-2 text-sm font-semibold text-white">
                          <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md transition-colors duration-300 group-hover:bg-white/20">
                            {activity.ctaText || "Read Activity"}
                          </span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                        </div>
                      </div>

                      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-300/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border/80 bg-background/70 px-8 py-16 text-center">
              <h2 className="mb-3 text-3xl font-bold text-foreground">Work Packages</h2>
              <p className="mx-auto mb-4 max-w-2xl text-muted-foreground">
                This section shows only activity cards from the Activities module.
              </p>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Add published activities in the admin panel to display the latest three work packages here automatically.
              </p>
            </div>
          )}
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

      {newsData && newsData.length > 0 && (
        <NewsCarousel news={newsData.slice(0, 6)} />
      )}
    </div>
  );
}
