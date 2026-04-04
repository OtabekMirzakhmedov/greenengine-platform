import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Download, FileText } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tender } from "@shared/schema";

export default function TenderDetail() {
  const [, params] = useRoute("/tenders/:slug");
  const slug = params?.slug;

  const { data: tender, isLoading } = useQuery<Tender>({
    enabled: Boolean(slug),
    queryKey: [slug ? `/api/tenders/slug/${slug}` : "/api/tenders/slug"],
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="h-[40vh] min-h-[300px] animate-pulse bg-muted" />
        <div className="mx-auto max-w-5xl flex-1 space-y-6 px-6 py-12 lg:px-8">
          <Skeleton className="h-10 w-56" />
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!tender) {
    return (
      <div className="flex min-h-screen flex-col">
        <PageHero title="Tender Not Found" description="The tender notice you requested is not available." />
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="text-center">
            <p className="mb-6 text-muted-foreground">This tender may have been removed or is not published.</p>
            <Link href="/tenders">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tenders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageHero title={tender.title} description={tender.excerpt || undefined} imageUrl={tender.imageUrl || undefined} />

      <div className="flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Link href="/tenders">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tenders
            </Button>
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,2fr)_320px]">
            <Card>
              <CardContent className="space-y-8 p-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(tender.publishedAt), "MMMM d, yyyy")}</span>
                </div>

                {tender.content ? (
                  <div
                    className="prose prose-lg max-w-none text-foreground"
                    dangerouslySetInnerHTML={{ __html: tender.content }}
                  />
                ) : (
                  <p className="leading-8 text-muted-foreground">
                    Detailed tender information will appear here when content is added in the admin panel.
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Tender Files</CardTitle>
                </CardHeader>
                <CardContent>
                  {tender.attachments && tender.attachments.length > 0 ? (
                    <div className="space-y-3">
                      {tender.attachments.map((attachment, index) => (
                        <a
                          key={`${attachment.url}-${index}`}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 rounded-2xl border bg-muted/20 px-4 py-3 transition hover:border-primary/40 hover:bg-muted/40"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-foreground">{attachment.name}</p>
                            <p className="text-xs text-muted-foreground">{attachment.size}</p>
                          </div>
                          <Download className="h-4 w-4 text-primary" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No attachments available for this tender.</p>
                  )}
                </CardContent>
              </Card>

              {tender.imageUrl ? (
                <Card>
                  <CardContent className="p-4">
                    <div className="overflow-hidden rounded-2xl">
                      <img src={tender.imageUrl} alt={tender.title} className="h-full w-full object-cover" />
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
