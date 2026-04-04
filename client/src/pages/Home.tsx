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

const logoImage = "/attached_assets/greenengine-logo-new.jpg";

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

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f5fbf5_0%,#edf7ee_42%,#ffffff_100%)] py-20 md:py-28">
        <div className="absolute inset-0">
          <div className="absolute left-[-8rem] top-16 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
          <div className="absolute right-[-5rem] top-10 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,hsl(var(--primary))_1px,transparent_0)] [background-size:28px_28px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                ERASMUS-EDU-2025-CBHE-STRAND-2 / Project Number: 101236240
              </div>
              <h2 className="font-serif text-4xl font-semibold leading-tight text-foreground md:text-6xl">
                Engineering education with a greener, more human-centered future in mind.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                GREENENGINE modernizes engineering education through sustainability, creative problem solving, and intercultural collaboration, preparing students to build resilient systems and environmentally responsible solutions.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/about">
                  <Button size="lg" className="w-full rounded-full px-7 shadow-[0_16px_36px_rgba(43,116,70,0.18)] sm:w-auto" data-testid="button-home-about">
                    Discover the Mission
                  </Button>
                </Link>
                <Link href="/activities">
                  <Button variant="outline" size="lg" className="w-full rounded-full border-primary/25 bg-white/80 px-7 text-primary hover:bg-primary/5 sm:w-auto" data-testid="button-home-activities">
                    Explore Activities
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-8 hidden h-28 w-28 rounded-full bg-accent/40 blur-2xl md:block" />
              <div className="absolute -bottom-8 right-10 hidden h-32 w-32 rounded-full bg-primary/20 blur-3xl md:block" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_30px_90px_rgba(40,89,57,0.14)] backdrop-blur-xl">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between gap-4 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(31,104,57,0.96),rgba(65,143,91,0.92))] px-6 py-5 text-white shadow-lg">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Green Identity</p>
                      <p className="mt-2 text-2xl font-semibold">Sustainable innovation ecosystem</p>
                    </div>
                    <img src={logoImage} alt="GREENENGINE brand mark" className="h-16 w-auto object-contain opacity-95" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-primary/10 bg-secondary/65 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Primary</p>
                      <p className="mt-3 text-base font-medium text-foreground">Deep Forest Green</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">Core actions, buttons, hero labels, and key emphasis.</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-primary/10 bg-white p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Secondary</p>
                      <p className="mt-3 text-base font-medium text-foreground">Soft Botanical Green</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">Section backgrounds, cards, and calm supporting surfaces.</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-primary/10 bg-accent/35 p-5 sm:col-span-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Accent</p>
                      <p className="mt-3 text-base font-medium text-foreground">Eco Lime Highlight</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">Subtle gradients, environmental highlights, and warm contrast for innovation cues.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {activitiesToDisplay.length > 0 ? (
            <div className="mt-16 rounded-[2.25rem] border border-primary/10 bg-white/80 px-6 py-10 shadow-[0_34px_90px_rgba(31,65,43,0.12)] backdrop-blur-xl md:px-8 lg:px-10">
              <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    Sustainability Action Hub
                  </div>
                  <h2 className="text-3xl font-bold text-foreground md:text-4xl">Work Packages</h2>
                  <p className="mt-3 text-base leading-7 text-muted-foreground md:text-lg">
                    Three dynamic activity cards surface the current work packages shaping GREENENGINE, from institutional transformation to collaborative sustainability practices.
                  </p>
                </div>
                <Link href="/activities">
                  <Button variant="outline" className="w-full rounded-full border-primary/20 bg-secondary/55 text-primary hover:bg-primary/5 lg:w-auto">
                    View All Activities
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {activitiesToDisplay.map((activity) => (
                  <Link key={activity.id} href={`/activities/${activity.slug}`}>
                    <div
                      className="group relative h-[440px] cursor-pointer overflow-hidden rounded-[1.9rem] border border-emerald-950/10 bg-emerald-950 shadow-[0_24px_70px_rgba(17,24,39,0.16)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_36px_90px_rgba(17,24,39,0.22)]"
                      data-testid={`card-feature-${activity.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <img
                        src={activity.imageUrl}
                        alt={activity.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,52,32,0.10)_0%,rgba(21,78,39,0.38)_35%,rgba(5,25,13,0.92)_100%)]" />
                      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-lime-100/20 to-transparent" />

                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                          <span className="h-2 w-2 rounded-full bg-lime-300" />
                          Work Package
                        </div>

                        <h3 className="mb-3 text-2xl font-bold text-white transition-transform duration-500 group-hover:-translate-y-1">
                          {activity.title}
                        </h3>

                        <p className="mb-6 line-clamp-3 text-sm leading-7 text-white/84 transition-colors duration-500 group-hover:text-white">
                          {activity.description}
                        </p>

                        <div className="flex items-center gap-3 text-sm font-semibold text-white">
                          <span className="rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-lg shadow-primary/20 transition-colors duration-300 group-hover:bg-lime-400 group-hover:text-emerald-950">
                            {activity.ctaText || "Read Activity"}
                          </span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                        </div>
                      </div>

                      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-lime-300/25 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-16 rounded-[2rem] border border-dashed border-primary/20 bg-white/75 px-8 py-16 text-center shadow-sm">
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

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f4faf4_100%)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -left-4 top-10 hidden h-24 w-24 rounded-full bg-primary/10 blur-2xl md:block" />
              <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 shadow-[0_24px_80px_rgba(44,94,60,0.14)]">
                <img
                  src={sustainabilityImage}
                  alt="Sustainable green energy and environmental innovation"
                  className="h-[430px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/30 via-transparent to-lime-100/10" />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="mb-4 inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">
                About the Project
              </div>
              <h2 className="text-3xl font-bold leading-tight text-foreground md:text-5xl">
                A collaborative model for green transformation in higher education.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                GREENENGINE connects universities and institutions across Central Asia, Georgia, and Europe to strengthen sustainability literacy, engineering quality, and intercultural competence through applied learning and innovation.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-primary/10 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-primary">Mission</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Embed environmental responsibility and future-ready skills into engineering education.</p>
                </div>
                <div className="rounded-[1.5rem] border border-primary/10 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-primary">Impact</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Support institutions with modern methods, collaboration, and innovation across regions.</p>
                </div>
              </div>

              <Link href="/about">
                <Button variant="outline" size="lg" className="mt-8 rounded-full border-primary/25 bg-white px-7 text-primary hover:bg-primary/5" data-testid="button-read-more-about">
                  Read More About GREENENGINE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#10351f_0%,#184c2d_45%,#215f39_100%)] py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(190,242,100,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(187,247,208,0.12),transparent_32%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm">
                International Collaboration
              </div>
              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                Partner institutions advancing sustainable change together.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/80">
                The network behind GREENENGINE brings together universities, educators, and innovators who are shaping greener curricula, stronger partnerships, and practical transformation in engineering and environmental fields.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/85">Cross-regional expertise</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/85">Applied sustainability</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/85">Research collaboration</span>
              </div>

              <Link href="/partners">
                <Button size="lg" className="mt-8 rounded-full bg-white px-7 text-primary hover:bg-lime-50" data-testid="button-view-partners">
                  View All Partners
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -right-6 top-6 hidden h-24 w-24 rounded-full bg-lime-200/20 blur-2xl md:block" />
              <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
                <img
                  src={collaborationImage}
                  alt="Diverse students collaborating on sustainable development"
                  className="h-[430px] w-full object-cover"
                />
              </div>
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
