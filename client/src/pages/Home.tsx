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

  return (
    <div className="flex flex-col">
      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} autoplayDelay={2000} />
      {newsData && newsData.length > 0 ? <NewsCarousel news={newsData.slice(0, 6)} /> : null}

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
    </div>
  );
}
