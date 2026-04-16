import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { ArrowLeft, CalendarDays, ExternalLink, FileText, PlayCircle, UserRound } from "lucide-react";
import type { PassportSection, PassportStory } from "@shared/schema";
import PageHero from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { resolvePassportSection, resolvePassportStory } from "@/lib/passportContent";

interface StoryDetailResponse {
  section: PassportSection;
  story: PassportStory;
}

export default function PassportStoryDetail() {
  const [, params] = useRoute("/passport/:sectionSlug/stories/:storySlug");
  const sectionSlug = params?.sectionSlug;
  const storySlug = params?.storySlug;

  const { data, isLoading } = useQuery<StoryDetailResponse>({
    enabled: Boolean(sectionSlug && storySlug),
    queryKey: [
      sectionSlug && storySlug
        ? `/api/passport-sections/${sectionSlug}/stories/${storySlug}`
        : "/api/passport-story-detail",
    ],
  });

  const resolvedSection = data?.section ? resolvePassportSection(data.section) : null;
  const resolvedStory = data?.story ? resolvePassportStory(data.story) : null;

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Skeleton className="h-[42vh] min-h-[340px] w-full" />
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-12 lg:px-8">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-96 w-full rounded-[2rem]" />
          <Skeleton className="h-72 w-full rounded-[2rem]" />
        </div>
      </div>
    );
  }

  if (!resolvedStory || !resolvedSection) {
    return (
      <div className="flex min-h-screen flex-col">
        <PageHero title="Story Not Found" description="The requested storytelling entry is not currently available." />
        <div className="flex flex-1 items-center justify-center py-16">
          <Link href="/passport/digital-storytelling">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Digital Storytelling
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const gallery = resolvedStory.gallery?.length > 0 ? resolvedStory.gallery : resolvedStory.imageUrl ? [resolvedStory.imageUrl] : [];

  return (
    <div className="flex min-h-screen flex-col">
      <PageHero
        title={resolvedStory.title}
        description={resolvedStory.excerpt || resolvedSection.summary || undefined}
        imageUrl={resolvedStory.imageUrl || resolvedSection.imageUrl || undefined}
      />

      <div className="flex-1 bg-[linear-gradient(180deg,#f6fbf6_0%,#ffffff_100%)] py-14 md:py-18">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href={`/passport/${sectionSlug}`}>
              <Button variant="ghost" size="sm" className="rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {resolvedSection.title}
              </Button>
            </Link>
            <Badge variant="secondary" className="rounded-full bg-primary/10 px-4 py-1 text-primary">
              Digital Storytelling
            </Badge>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_340px]">
            <Card className="overflow-hidden rounded-[2rem] border-primary/10 bg-white shadow-[0_24px_70px_rgba(21,48,30,0.08)]">
              <CardContent className="space-y-8 p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {resolvedStory.author ? (
                    <span className="inline-flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-primary" />
                      {resolvedStory.author}
                    </span>
                  ) : null}
                  {resolvedStory.publishedAt ? (
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      {new Date(resolvedStory.publishedAt).toLocaleDateString()}
                    </span>
                  ) : null}
                </div>

                <div
                  className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:leading-8"
                  dangerouslySetInnerHTML={{
                    __html: resolvedStory.content || "<p>This story is ready for full editorial content from the admin panel.</p>",
                  }}
                />

                {gallery.length > 0 ? (
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-foreground">Story Gallery</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {gallery.map((imageUrl, index) => (
                        <div key={`${imageUrl}-${index}`} className="overflow-hidden rounded-[1.5rem] border border-primary/10 shadow-sm">
                          <img src={imageUrl} alt={`${resolvedStory.title} image ${index + 1}`} className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null}
              </CardContent>
            </Card>

            <div className="space-y-6">
              {resolvedStory.mediaUrl ? (
                <Card className="rounded-[2rem] border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbf8_100%)] shadow-[0_24px_70px_rgba(21,48,30,0.08)]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <PlayCircle className="h-5 w-5 text-primary" />
                      Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={resolvedStory.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-primary/10 bg-secondary/20 px-4 py-4 text-sm font-medium text-foreground transition-colors hover:border-primary/25 hover:bg-secondary/35"
                    >
                      <span className="truncate">Open story media</span>
                      <ExternalLink className="h-4 w-4 text-primary" />
                    </a>
                  </CardContent>
                </Card>
              ) : null}

              <Card className="rounded-[2rem] border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbf8_100%)] shadow-[0_24px_70px_rgba(21,48,30,0.08)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <FileText className="h-5 w-5 text-primary" />
                    Attachments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {resolvedStory.attachments.length > 0 ? (
                    <div className="space-y-3">
                      {resolvedStory.attachments.map((attachment, index) => (
                        <a
                          key={`${attachment.url}-${index}`}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-primary/10 bg-secondary/20 px-4 py-4 text-sm font-medium text-foreground transition-colors hover:border-primary/25 hover:bg-secondary/35"
                        >
                          <div className="min-w-0">
                            <div className="truncate">{attachment.name}</div>
                            {attachment.size ? <div className="text-xs text-muted-foreground">{attachment.size}</div> : null}
                          </div>
                          <ExternalLink className="h-4 w-4 text-primary" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm leading-7 text-muted-foreground">No additional files have been attached to this story yet.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
