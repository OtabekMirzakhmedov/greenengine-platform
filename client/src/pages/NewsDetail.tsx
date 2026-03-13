import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { News } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function NewsDetail() {
  const [, params] = useRoute("/news/:slug");
  const slug = params?.slug;

  const { data: newsItems, isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  const newsItem = newsItems?.find((item) => item.slug === slug);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="h-[40vh] min-h-[300px] bg-muted animate-pulse" />
        <div className="flex-1 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="flex flex-col min-h-screen">
        <PageHero title="Article Not Found" description="The news article you're looking for doesn't exist" />
        <div className="flex-1 py-12 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Article Not Available</h2>
            <p className="text-muted-foreground mb-6">This news article could not be found.</p>
            <Link href="/news">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to News
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title={newsItem.title}
        imageUrl={newsItem.imageUrl || undefined}
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/news">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to News
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 mb-8 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <time dateTime={new Date(newsItem.publishedAt).toISOString()}>
              {format(new Date(newsItem.publishedAt), "MMMM d, yyyy")}
            </time>
          </div>

          {newsItem.excerpt && (
            <Card className="mb-8">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed italic">
                  {newsItem.excerpt}
                </p>
              </CardContent>
            </Card>
          )}

          {newsItem.content && (
            <Card>
              <CardContent className="p-8">
                <div
                  className="prose prose-lg max-w-none text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: newsItem.content }}
                />
              </CardContent>
            </Card>
          )}

          {!newsItem.content && !newsItem.excerpt && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  No content available for this article.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
