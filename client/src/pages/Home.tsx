import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import HeroCarousel, { HeroSlide } from "@/components/HeroCarousel";
import NewsCarousel from "@/components/NewsCarousel";
import { useQuery } from "@tanstack/react-query";
import type { HeroSection, News } from "@shared/schema";
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

  const fallbackHeroSlides: HeroSlide[] = [
    {
      id: "1",
      title: "Building Intercultural Competence for a Sustainable Future",
      description: "Empowering higher education institutions across Central Asia, Georgia, and Europe through collaborative learning and sustainable development.",
      image: heroImage1,
      ctaText: "Learn More",
      ctaLink: "/about",
      secondaryCtaText: "Explore Activities",
      secondaryCtaLink: "/activities",
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
      secondaryCtaText: "Latest News",
      secondaryCtaLink: "/news",
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

  return (
    <div className="flex flex-col bg-[linear-gradient(180deg,#edf5ec_0%,#f3f8f2_44%,#eef5ed_100%)]">
      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} autoplayDelay={2000} />
      {newsData && newsData.length > 0 ? <NewsCarousel news={newsData.slice(0, 6)} /> : null}

      <section className="relative overflow-hidden bg-white py-18 md:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative grid gap-8 rounded-[2.25rem] border border-primary/10 bg-[linear-gradient(135deg,#f7fbf6_0%,#ffffff_48%,#f4f8f2_100%)] p-8 shadow-[0_26px_80px_rgba(25,58,40,0.08)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:p-10">
            <div className="space-y-7">
              <div className="inline-flex rounded-full border border-primary/10 bg-secondary/40 px-4 py-2 text-sm font-semibold text-primary">
                GREENENGINE Overview
              </div>
              <div className="space-y-5">
                <h2 className="max-w-3xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  Engineering education designed for sustainability, collaboration, and real institutional impact.
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                  GREENENGINE connects universities and institutions across Central Asia, Georgia, and Europe to strengthen sustainability literacy, engineering quality, and intercultural competence through applied learning, partnership, and innovation.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-primary/10 bg-white/85 p-5 shadow-[0_14px_32px_rgba(25,58,40,0.06)]">
                  <p className="text-3xl font-bold text-primary">3</p>
                  <p className="mt-2 text-sm font-semibold text-foreground">Regions Connected</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Central Asia, Georgia, and Europe advancing shared educational goals.</p>
                </div>
                <div className="rounded-[1.5rem] border border-primary/10 bg-white/85 p-5 shadow-[0_14px_32px_rgba(25,58,40,0.06)]">
                  <p className="text-3xl font-bold text-primary">1</p>
                  <p className="mt-2 text-sm font-semibold text-foreground">Collaborative Network</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Partner institutions working across teaching, research, and innovation.</p>
                </div>
                <div className="rounded-[1.5rem] border border-primary/10 bg-white/85 p-5 shadow-[0_14px_32px_rgba(25,58,40,0.06)]">
                  <p className="text-3xl font-bold text-primary">100%</p>
                  <p className="mt-2 text-sm font-semibold text-foreground">Future-Focused</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Sustainability, engineering excellence, and human-centered education.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/about">
                  <Button size="lg" className="rounded-full bg-primary px-7 text-primary-foreground shadow-[0_16px_34px_rgba(25,58,40,0.16)] hover:bg-primary/90" data-testid="button-read-more-about">
                    Discover the Project
                  </Button>
                </Link>
                <Link href="/activities">
                  <Button variant="outline" size="lg" className="rounded-full border-primary/20 bg-white px-7 text-primary hover:bg-primary/5">
                    Explore Activities
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative order-2 lg:order-1">
              <div className="absolute -left-4 top-10 hidden h-24 w-24 rounded-full bg-primary/10 blur-2xl md:block" />
              <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-[0_24px_70px_rgba(44,94,60,0.12)]">
                <img
                  src={sustainabilityImage}
                  alt="Sustainable green energy and environmental innovation"
                  className="h-[430px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/14 via-transparent to-lime-100/10" />
                <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/20 bg-white/88 p-5 shadow-[0_18px_40px_rgba(25,58,40,0.12)] backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">Mission</p>
                  <p className="mt-2 text-base font-semibold text-foreground">
                    Embed environmental responsibility and future-ready skills into engineering education.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbf7_0%,#eff5ef_100%)] py-18 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-primary/10 bg-white p-6 shadow-[0_18px_44px_rgba(25,58,40,0.06)]">
              <p className="text-sm font-semibold text-primary">Educational Innovation</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Modern pedagogies and interdisciplinary learning models that connect engineering with sustainability.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-primary/10 bg-white p-6 shadow-[0_18px_44px_rgba(25,58,40,0.06)]">
              <p className="text-sm font-semibold text-primary">Institutional Cooperation</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Shared expertise and practical collaboration among universities and project partners across regions.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-primary/10 bg-white p-6 shadow-[0_18px_44px_rgba(25,58,40,0.06)]">
              <p className="text-sm font-semibold text-primary">Sustainable Impact</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Long-term outcomes that support green transformation, resilience, and future-oriented engineering education.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-18 md:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-10 rounded-[2.25rem] border border-primary/10 bg-[linear-gradient(135deg,#143824_0%,#1a462d_56%,#205436_100%)] p-8 text-white shadow-[0_34px_100px_rgba(11,31,20,0.20)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:p-10">
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
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_26px_80px_rgba(0,0,0,0.24)]">
                <img
                  src={collaborationImage}
                  alt="Diverse students collaborating on sustainable development"
                  className="h-[430px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/18 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
