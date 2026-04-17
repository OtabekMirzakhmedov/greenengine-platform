import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { ArrowLeft, CalendarDays, ExternalLink, Globe2, Link2, PlayCircle } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import type { PassportSection, PassportStory } from "@shared/schema";
import {
  isStorytellingPassportSection,
  resolvePassportSection,
  resolvePassportStory,
} from "@/lib/passportContent";

export default function PassportSectionPage() {
  const [, params] = useRoute("/passport/:slug");
  const slug = params?.slug;

  const { data: section, isLoading } = useQuery<PassportSection>({
    enabled: Boolean(slug),
    queryKey: [slug ? `/api/passport-sections/slug/${slug}` : "/api/passport-sections/slug"],
  });

  const { data: stories = [], isLoading: storiesLoading } = useQuery<PassportStory[]>({
    enabled: Boolean(section?.id && isStorytellingPassportSection(section, slug)),
    queryKey: [section?.id ? `/api/passport-sections/${section.id}/stories` : "/api/passport-sections/stories"],
  });

  const resolvedSection = section ? resolvePassportSection(section) : null;
  const resolvedStories = stories.map((story) => resolvePassportStory(story));
  const isStorytelling = isStorytellingPassportSection(section, slug);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Skeleton className="h-[40vh] min-h-[320px] w-full" />
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-12 lg:px-8">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-80 w-full rounded-[2rem]" />
          <Skeleton className="h-56 w-full rounded-[2rem]" />
        </div>
      </div>
    );
  }

  if (!resolvedSection) {
    return (
      <div className="flex min-h-screen flex-col">
        <PageHero
          title="Passport Section Not Found"
          description="This Intercultural Passport section is not available or is currently hidden."
        />
        <div className="flex flex-1 items-center justify-center py-12">
          <Link href="/passport">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Intercultural Passport
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageHero
        title={resolvedSection.title}
        description={resolvedSection.summary || undefined}
        imageUrl={resolvedSection.imageUrl || undefined}
      />

      <div className="flex-1 bg-[linear-gradient(180deg,#f8fbf8_0%,#ffffff_100%)] py-14 md:py-18">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Link href="/passport">
            <Button variant="ghost" size="sm" className="rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Intercultural Passport
            </Button>
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]">
            <Card className="overflow-hidden rounded-[2rem] border-primary/10 shadow-[0_24px_70px_rgba(21,48,30,0.08)]">
              <CardContent className="space-y-6 p-8 md:p-10">
                <div
                  className="prose prose-lg max-w-none text-foreground [&_p]:leading-8"
                  dangerouslySetInnerHTML={{
                    __html:
                      resolvedSection.content ||
                      "<p>This section is ready for content from the admin panel.</p>",
                  }}
                />
              </CardContent>
            </Card>

            <div className="space-y-6">
              {resolvedSection.mediaUrl ? (
                <Card className="rounded-[2rem] border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbf8_100%)] shadow-[0_24px_70px_rgba(21,48,30,0.08)]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <PlayCircle className="h-5 w-5 text-primary" />
                      Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={resolvedSection.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-primary/10 bg-secondary/20 px-4 py-4 text-sm font-medium text-foreground transition-colors hover:border-primary/25 hover:bg-secondary/35"
                    >
                      <span className="truncate">Open supporting media</span>
                      <ExternalLink className="h-4 w-4 text-primary" />
                    </a>
                  </CardContent>
                </Card>
              ) : null}

              <Card className="rounded-[2rem] border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbf8_100%)] shadow-[0_24px_70px_rgba(21,48,30,0.08)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Link2 className="h-5 w-5 text-primary" />
                    Related Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {resolvedSection.links.length > 0 ? (
                    <div className="space-y-3">
                      {resolvedSection.links.map((link, index) => (
                        <a
                          key={`${link.url}-${index}`}
                          href={link.url}
                          target={link.url.startsWith("http") ? "_blank" : undefined}
                          rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-primary/10 bg-secondary/20 px-4 py-4 text-sm font-medium text-foreground transition-colors hover:border-primary/25 hover:bg-secondary/35"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="h-4 w-4 text-primary" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm leading-7 text-muted-foreground">
                      No related links have been added for this section yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {isStorytelling ? (
            <section className="mt-14 space-y-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="space-y-2">
                  <Badge variant="secondary" className="rounded-full bg-primary/10 px-4 py-1 text-primary">
                    Featured Stories
                  </Badge>
                  <h2 className="text-3xl font-semibold tracking-tight text-foreground">Digital Storytelling Gallery</h2>
                  <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                    Explore student and partner narratives that connect local lived experience with wider conversations
                    on sustainability, resilience, and intercultural understanding.
                  </p>
                </div>
              </div>

              {storiesLoading ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-[420px] rounded-[2rem]" />
                  ))}
                </div>
              ) : resolvedStories.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {resolvedStories.map((story) => (
                    <Link key={story.id} href={`/passport/${slug}/stories/${story.slug}`}>
                      <a className="group block h-full">
                        <Card className="flex h-full flex-col overflow-hidden rounded-[2rem] border-primary/10 bg-white shadow-[0_24px_70px_rgba(21,48,30,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(21,48,30,0.14)]">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            {story.imageUrl ? (
                              <img
                                src={story.imageUrl}
                                alt={story.title}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center bg-secondary/20 text-primary">
                                <Globe2 className="h-8 w-8" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#15301ecc] via-[#15301e4d] to-transparent" />
                            <div className="absolute left-5 top-5">
                              <Badge className="rounded-full bg-white/90 text-primary shadow-sm hover:bg-white/90">
                                Story
                              </Badge>
                            </div>
                          </div>

                          <CardContent className="flex flex-1 flex-col gap-5 p-6">
                            <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-primary/80">
                              <span className="inline-flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5" />
                                {story.publishedAt ? new Date(story.publishedAt).toLocaleDateString() : "Published"}
                              </span>
                              {story.author ? <span>{story.author}</span> : null}
                            </div>
                            <div className="space-y-3">
                              <h3 className="text-2xl font-semibold leading-tight text-foreground">{story.title}</h3>
                              <p className="line-clamp-4 text-sm leading-7 text-muted-foreground">
                                {story.excerpt || "Open the full storytelling page to read this story."}
                              </p>
                            </div>
                            <div className="mt-auto">
                              <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition duration-300 group-hover:bg-primary/90">
                                Read story
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="rounded-[2rem] border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf7_100%)] shadow-[0_24px_70px_rgba(21,48,30,0.08)]">
                  <CardContent className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Globe2 className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">No published stories yet</h3>
                      <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                        Once the admin publishes storytelling entries, they will appear here as story cards with full detail pages.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
