import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { News } from "@shared/schema";
import PageHero from "@/components/layout/PageHero";
import heroImage from "@assets/stock_images/international_cooper_13d95da6.jpg";

export default function NewsPage() {
  const { data: newsItems, isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  // Sort by publishedAt descending to get latest news first
  const sortedNews = newsItems
    ? [...newsItems].sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    : [];

  // Separate featured news (latest 3) from the rest
  const featuredNews = sortedNews.slice(0, 3);
  const otherNews = sortedNews.slice(3);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Latest News & Updates"
        description="Stay informed about GREENENGINE project developments, events, and achievements"
        imageUrl={heroImage}
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-12">
              {/* Featured Carousel Skeleton */}
              <div className="space-y-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-96 w-full" />
              </div>
              {/* Grid Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-96" />
                ))}
              </div>
            </div>
          ) : newsItems && newsItems.length > 0 ? (
            <div className="space-y-12">
              {/* Featured News Carousel */}
              {featuredNews.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-foreground">Featured News</h2>
                    <Badge variant="secondary" className="text-sm">
                      {featuredNews.length} Featured Articles
                    </Badge>
                  </div>

                  <div className="relative px-12 md:px-16">
                    <div className="overflow-hidden rounded-lg" ref={emblaRef}>
                      <div className="flex">
                        {featuredNews.map((item) => (
                          <div
                            key={item.id}
                            className="flex-[0_0_100%] min-w-0"
                            data-testid={`carousel-slide-${item.id}`}
                          >
                            <Card className="overflow-hidden border-0 shadow-lg">
                              <div className="grid md:grid-cols-2 gap-0">
                                {/* Image */}
                                <div className="relative h-64 md:h-full bg-muted overflow-hidden">
                                  {item.imageUrl && (
                                    <img
                                      src={item.imageUrl}
                                      alt={item.title}
                                      className="absolute inset-0 w-full h-full object-cover"
                                    />
                                  )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-between p-8 md:p-12">
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Calendar className="h-4 w-4" />
                                      <time dateTime={new Date(item.publishedAt).toISOString()}>
                                        {format(new Date(item.publishedAt), "MMMM d, yyyy")}
                                      </time>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                                      {item.title}
                                    </h3>

                                    {item.excerpt && (
                                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                                        {item.excerpt}
                                      </p>
                                    )}
                                  </div>

                                  <div className="mt-6">
                                    <Link href={`/news/${item.slug}`}>
                                      <Button variant="default" data-testid={`button-read-${item.id}`}>
                                        Read Full Article
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Carousel Navigation - Always show when multiple items */}
                    {featuredNews.length > 1 && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg z-10"
                          onClick={scrollPrev}
                          data-testid="button-carousel-prev"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg z-10"
                          onClick={scrollNext}
                          data-testid="button-carousel-next"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </>
                    )}
                  </div>
                </section>
              )}

              {/* All News Grid */}
              {otherNews.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-foreground">All News</h2>
                    <Badge variant="secondary" className="text-sm">
                      {newsItems.length} Total Articles
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherNews.map((item) => (
                      <Card
                        key={item.id}
                        className="hover-elevate overflow-hidden flex flex-col"
                        data-testid={`card-news-${item.id}`}
                      >
                        {/* Image */}
                        <div className="relative h-48 bg-muted overflow-hidden">
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        {/* Content */}
                        <CardHeader className="flex-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                            <Calendar className="h-3 w-3" />
                            <time dateTime={new Date(item.publishedAt).toISOString()}>
                              {format(new Date(item.publishedAt), "MMM d, yyyy")}
                            </time>
                          </div>

                          <CardTitle className="text-lg leading-tight line-clamp-2">
                            {item.title}
                          </CardTitle>

                          {item.excerpt && (
                            <p className="text-sm text-muted-foreground mt-3 line-clamp-3 leading-relaxed">
                              {item.excerpt}
                            </p>
                          )}
                        </CardHeader>

                        <CardContent className="pt-0">
                          <Link href={`/news/${item.slug}`}>
                            <Button variant="outline" className="w-full" data-testid={`button-read-${item.id}`}>
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">No News Yet</h3>
                <p className="text-muted-foreground">
                  Check back soon for the latest updates from the GREENENGINE project.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
