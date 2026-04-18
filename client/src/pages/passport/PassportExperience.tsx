import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Camera,
  CheckCircle2,
  Compass,
  Globe2,
  GraduationCap,
  HeartHandshake,
  MessageCircle,
  Network,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { PassportSection } from "@shared/schema";
import {
  isStorytellingPassportSection,
  resolvePassportSection,
} from "@/lib/passportContent";

const whyItMatters = [
  {
    title: "Strengthens intercultural awareness",
    description: "Students learn to recognize how identity, values, language, and context shape everyday communication.",
    icon: Globe2,
  },
  {
    title: "Encourages empathy and inclusion",
    description: "Reflective tasks help students listen more carefully, value difference, and build respectful relationships.",
    icon: HeartHandshake,
  },
  {
    title: "Builds communication confidence",
    description: "The passport supports clearer collaboration in multicultural teams, classrooms, and mobility settings.",
    icon: MessageCircle,
  },
  {
    title: "Documents meaningful growth",
    description: "Students collect evidence of learning that can support portfolios, presentations, and future opportunities.",
    icon: Award,
  },
];

const outcomes = [
  "Greater self-awareness and cultural sensitivity",
  "Stronger intercultural communication skills",
  "Reflective evidence of learning and participation",
  "Portfolio-ready stories, activities, and outputs",
  "Confidence working in diverse academic environments",
];

function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/75">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-foreground md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">{description}</p>
    </div>
  );
}

export default function PassportExperience() {
  const { data: landingSection, isLoading: landingLoading } = useQuery<PassportSection>({
    queryKey: ["/api/passport-sections/landing"],
  });
  const { data: menuSections, isLoading: menuLoading } = useQuery<PassportSection[]>({
    queryKey: ["/api/passport-sections/menu"],
  });

  const resolvedLanding = landingSection ? resolvePassportSection(landingSection) : null;
  const resolvedSections = (menuSections ?? []).map((section) => resolvePassportSection(section));
  const storytellingSection = resolvedSections.find((section) =>
    isStorytellingPassportSection(section, section.slug),
  );
  const storytellingHref = storytellingSection ? `/passport/${storytellingSection.slug}` : "/passport/digital-storytelling";
  const heroImage = resolvedLanding?.imageUrl || "/attached_assets/flag-collage.jpg";

  if (landingLoading || menuLoading) {
    return (
      <div className="bg-[#f7faf4]">
        <Skeleton className="h-[30rem] w-full" />
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-3 lg:px-8">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-64 rounded-[1.75rem]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#f7faf4_0%,#ffffff_42%,#f3f8f1_100%)]">
      <section className="relative border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,rgba(31,175,56,0.12),transparent_32%),linear-gradient(135deg,#f8fbf2_0%,#eef6ed_52%,#ffffff_100%)]">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/80 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:py-16 lg:grid-cols-[minmax(0,1.04fr)_minmax(360px,0.86fr)] lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Part of the Erasmus+ intercultural learning initiative
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-[-0.05em] text-foreground md:text-6xl">
              Intercultural Passport
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              A guided learning and reflection space where students explore culture, communication,
              inclusion, and international experience while building evidence of their intercultural growth.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={storytellingHref}>
                <Button size="lg" className="min-h-12 rounded-full bg-primary px-7 text-primary-foreground shadow-[0_16px_34px_rgba(31,175,56,0.22)] hover:bg-primary/90">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#learning-outcomes">
                <Button size="lg" variant="outline" className="min-h-12 rounded-full border-primary/25 bg-white/80 px-7 text-primary hover:bg-primary/5">
                  View Learning Outcomes
                </Button>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#c6d309]/35 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-[0_28px_80px_rgba(25,58,40,0.14)]">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-primary/10">
                <img
                  src={heroImage}
                  alt="International learning and Erasmus+ partnership"
                  className="h-[22rem] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15301ee6] via-[#15301e40] to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-[1.25rem] border border-white/15 bg-white/12 p-5 text-white backdrop-blur-md">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">Student journey</p>
                  <p className="mt-2 text-2xl font-semibold leading-tight">
                    Reflect. Communicate. Create. Grow across cultures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="learning-path" className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:px-8">
          <SectionIntro
            eyebrow="What it is"
            title="A structured space for intercultural learning and reflection."
            description="The Intercultural Passport supports students as they make sense of cultural encounters, mobility experiences, teamwork, language, identity, and inclusion. It is designed for learners participating in Erasmus+ activities and for students who want to document local or international learning experiences in a meaningful way."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Explore identity and culture", icon: Compass },
              { label: "Reflect on real experiences", icon: BookOpenCheck },
              { label: "Practice communication skills", icon: MessageCircle },
              { label: "Build global competences", icon: GraduationCap },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-primary/10 bg-white p-5 shadow-[0_16px_42px_rgba(24,61,38,0.06)]">
                <item.icon className="h-6 w-6 text-primary" />
                <p className="mt-4 text-base font-semibold text-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-it-matters" className="bg-[#f2f7ef] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Why it matters"
            title="Intercultural competence is a practical skill for study, work, and civic life."
            description="The passport helps students move beyond simply attending international activities. It encourages them to understand what they experienced, how they communicated, what they learned, and how they can apply that learning in diverse environments."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {whyItMatters.map((item) => (
              <Card key={item.title} className="rounded-[1.6rem] border-primary/10 bg-white shadow-[0_18px_48px_rgba(24,61,38,0.07)]">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-tight text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2.25rem] border border-primary/10 bg-[linear-gradient(135deg,#15301e_0%,#1f5b35_58%,#2f7a43_100%)] text-white shadow-[0_32px_90px_rgba(21,48,30,0.22)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div className="relative min-h-[20rem] overflow-hidden">
              <img
                src={storytellingSection?.imageUrl || "/attached_assets/passport-stories/image1.png"}
                alt="Digital Storytelling module"
                className="h-full min-h-[20rem] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#15301ecc] via-[#15301e40] to-transparent" />
            </div>
            <div className="p-8 md:p-10 lg:p-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85">
                <Camera className="h-4 w-4" />
                Featured module
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-[-0.035em] md:text-5xl">
                Digital Storytelling
              </h2>
              <p className="mt-5 text-base leading-8 text-white/82 md:text-lg">
                Digital Storytelling allows students to transform intercultural experiences into creative
                narratives using reflection, media, and personal voice. It helps learners connect lived
                experience with empathy, identity, sustainability, and communication across cultures.
              </p>
              <Link href={storytellingHref}>
                <Button size="lg" className="mt-8 min-h-12 rounded-full bg-white px-7 text-primary hover:bg-lime-50">
                  Open Digital Storytelling
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="learning-outcomes" className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:px-8">
          <SectionIntro
            eyebrow="Learning outcomes"
            title="What students gain from the passport."
            description="By completing activities, stories, reflections, and learning tasks, students create a visible record of their development while becoming more prepared for diverse academic and professional environments."
          />
          <div className="rounded-[2rem] border border-primary/10 bg-white p-6 shadow-[0_22px_70px_rgba(24,61,38,0.08)] md:p-8">
            <div className="grid gap-4">
              {outcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3 rounded-[1.25rem] bg-[#f4f8f1] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm font-medium leading-7 text-foreground">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.25rem] border border-primary/10 bg-[linear-gradient(135deg,#ffffff_0%,#f3f8ef_100%)] p-8 text-center shadow-[0_24px_70px_rgba(24,61,38,0.09)] md:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Network className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-[-0.035em] text-foreground md:text-4xl">
            Begin your Intercultural Passport.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Start with one reflection, one story, or one learning experience. Each step helps you
            understand yourself, communicate with others, and build confidence across cultures.
          </p>
          <Link href={storytellingHref}>
            <Button size="lg" className="mt-8 min-h-12 rounded-full bg-primary px-8 text-primary-foreground shadow-[0_16px_34px_rgba(31,175,56,0.2)] hover:bg-primary/90">
              Begin Your Passport
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
