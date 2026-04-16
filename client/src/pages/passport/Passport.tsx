import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Globe2, Languages, LayoutGrid, Link2, Sparkles } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { PassportSection } from "@shared/schema";
import { resolvePassportSection } from "@/lib/passportContent";

export default function Passport() {
  const { data: landingSection, isLoading: landingLoading } = useQuery<PassportSection>({
    queryKey: ["/api/passport-sections/landing"],
  });
  const { data: menuSections, isLoading: menuLoading } = useQuery<PassportSection[]>({
    queryKey: ["/api/passport-sections/menu"],
  });

  const resolvedLanding = landingSection ? resolvePassportSection(landingSection) : null;
  const submenuItems = (menuSections ?? [])
    .filter((section) => !section.isLanding)
    .map((section) => resolvePassportSection(section));

  if (landingLoading || menuLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Skeleton className="h-[40vh] min-h-[320px] w-full" />
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-12 lg:px-8">
          <Skeleton className="h-32 w-full rounded-[2rem]" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-[22rem] rounded-[1.75rem]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!resolvedLanding) {
    return (
      <div className="flex min-h-screen flex-col">
        <PageHero
          title="Intercultural Passport"
          description="This module is ready to be configured from the admin panel."
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageHero
        title={resolvedLanding.title}
        description={resolvedLanding.summary || undefined}
        imageUrl={resolvedLanding.imageUrl || undefined}
        height="large"
      >
        {submenuItems.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {submenuItems.slice(0, 3).map((section) => (
              <Link key={section.id} href={`/passport/${section.slug}`}>
                <Button
                  variant="outline"
                  className="rounded-full border-white/25 bg-white/12 px-5 text-white backdrop-blur-sm hover:bg-white hover:text-primary"
                >
                  {section.navLabel}
                </Button>
              </Link>
            ))}
          </div>
        ) : null}
      </PageHero>

      <div className="flex-1 bg-[linear-gradient(180deg,#f5faf5_0%,#ffffff_100%)] py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
            <Card className="overflow-hidden rounded-[2rem] border-primary/10 shadow-[0_24px_70px_rgba(21,48,30,0.08)]">
              <CardContent className="space-y-6 p-8 md:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-secondary/35 px-4 py-2 text-sm font-semibold text-primary">
                  <Sparkles className="h-4 w-4" />
                  Admin-managed passport experience
                </div>
                <div
                  className="prose prose-lg max-w-none text-foreground [&_p]:leading-8"
                  dangerouslySetInnerHTML={{
                    __html:
                      resolvedLanding.content ||
                      "<p>Use the admin panel to create the landing copy, hero media, and related submenu pages for the Intercultural Passport module.</p>",
                  }}
                />

                {resolvedLanding.links.length > 0 ? (
                  <div className="grid gap-3 pt-2 sm:grid-cols-2">
                    {resolvedLanding.links.map((link, index) => (
                      <a
                        key={`${link.url}-${index}`}
                        href={link.url}
                        target={link.url.startsWith("http") ? "_blank" : undefined}
                        rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-primary/10 bg-secondary/15 px-4 py-4 text-sm font-medium text-foreground transition-colors hover:border-primary/25 hover:bg-secondary/30"
                      >
                        <span>{link.label}</span>
                        <Link2 className="h-4 w-4 text-primary" />
                      </a>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbf8_100%)] shadow-[0_24px_70px_rgba(21,48,30,0.08)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl">Module Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  {
                    icon: LayoutGrid,
                    title: "Dynamic submenu pages",
                    description: "Every passport page and submenu item is now designed to be managed from the admin panel.",
                  },
                  {
                    icon: Globe2,
                    title: "Flexible media support",
                    description: "Each section can include hero images, supporting media URLs, and curated resource links.",
                  },
                  {
                    icon: Languages,
                    title: "Multilingual-ready",
                    description: "Structured translation fields allow content teams to store localized versions alongside the default content.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-[1.25rem] border border-primary/10 bg-white p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {submenuItems.length > 0 ? (
            <section className="mt-12 md:mt-16">
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold tracking-[-0.02em] text-foreground">Passport Sections</h2>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    Explore the current learning paths, resources, and intercultural modules available in the passport.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {submenuItems.map((section) => (
                  <Card key={section.id} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white shadow-[0_16px_44px_rgba(21,48,30,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(21,48,30,0.11)]">
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-4 inline-flex rounded-full border border-primary/10 bg-secondary/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        {section.navLabel}
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground">{section.title}</h3>
                      <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                        {section.summary || "This section is ready to be described from the admin panel."}
                      </p>
                      <div className="mt-6">
                        <Link href={`/passport/${section.slug}`}>
                          <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                            Open Section
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
