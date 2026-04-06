import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { News } from "@shared/schema";

interface NewsCarouselProps {
  news: News[];
}

export default function NewsCarousel({ news }: NewsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!news || news.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f5fbf5_0%,#edf7ee_38%,#ffffff_100%)] py-14 md:py-18">
      <div className="absolute inset-0">
        <div className="absolute left-[-8rem] top-8 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[-5rem] top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-primary/10 bg-white/85 px-6 py-10 shadow-[0_34px_90px_rgba(31,65,43,0.12)] backdrop-blur-xl md:px-8 lg:px-10">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                Read the latest news
              </div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Project updates, announcements, and recent progress
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground md:text-lg">
                Follow the most recent GREENENGINE milestones, partner updates, and project developments from across the network.
              </p>
            </div>
            <Link href="/news">
              <Button
                variant="outline"
                className="w-full rounded-full border-primary/20 bg-secondary/55 text-primary hover:bg-primary/5 lg:w-auto"
                data-testid="button-all-news"
              >
                All news
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3"
                    data-testid={`news-card-${item.slug}`}
                  >
                    <Card className="group flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-primary/10 bg-white shadow-[0_20px_60px_rgba(17,24,39,0.10)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(17,24,39,0.16)]">
                      {item.imageUrl && (
                        <div className="relative h-52 overflow-hidden bg-muted">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/35 via-transparent to-transparent" />
                        </div>
                      )}

                      <div className="flex flex-1 flex-col p-6">
                        <p className="mb-3 text-sm text-muted-foreground">
                          {format(new Date(item.publishedAt), "EEE, MMM d")}
                        </p>

                        <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                          {item.title}
                        </h3>

                        <p className="mb-5 line-clamp-3 text-sm leading-7 text-muted-foreground">
                          {item.excerpt || "Read the full update to explore the latest GREENENGINE progress and announcements."}
                        </p>

                        <div className="mt-auto">
                          <Link href={`/news/${item.slug}`}>
                            <Button
                              variant="outline"
                              className="w-full rounded-full border-primary/20 hover:bg-primary hover:text-primary-foreground"
                              data-testid={`button-read-more-${item.slug}`}
                            >
                              Read more
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {canScrollPrev && (
              <Button
                variant="default"
                size="icon"
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 z-10 h-12 w-12 -translate-x-4 -translate-y-1/2 rounded-full shadow-lg"
                aria-label="Previous news"
                data-testid="button-news-prev"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}

            {canScrollNext && (
              <Button
                variant="default"
                size="icon"
                onClick={scrollNext}
                className="absolute right-0 top-1/2 z-10 h-12 w-12 translate-x-4 -translate-y-1/2 rounded-full shadow-lg"
                aria-label="Next news"
                data-testid="button-news-next"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
