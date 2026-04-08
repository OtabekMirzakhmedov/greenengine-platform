import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import type { News } from "@shared/schema";

interface NewsCarouselProps {
  news: News[];
}

export default function NewsCarousel({ news }: NewsCarouselProps) {
  const sortedNews = [...news].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbf7_0%,#eef5ef_44%,#fdfefd_100%)] py-14 md:py-18">
      <div className="absolute inset-0">
        <div className="absolute left-[-8rem] top-8 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute right-[-5rem] top-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(248,252,248,0.96)_100%)] px-6 py-10 shadow-[0_30px_80px_rgba(31,65,43,0.10)] backdrop-blur-xl md:px-8 lg:px-10">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Project News
              </h2>
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

          <div className="relative px-1 md:px-2">
            <div className="overflow-visible" ref={emblaRef}>
              <div className="-ml-5 flex md:-ml-6">
                {sortedNews.map((item) => (
                  <div
                    key={item.id}
                    className="min-w-0 shrink-0 grow-0 basis-full pl-5 md:basis-1/2 md:pl-6 lg:basis-1/3"
                    data-testid={`news-card-${item.slug}`}
                  >
                    <Card className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)] shadow-[0_18px_48px_rgba(21,48,30,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_28px_72px_rgba(21,48,30,0.14)]">
                      <div className="relative h-56 overflow-hidden bg-[linear-gradient(135deg,#edf4ed_0%,#f8fbf8_100%)]">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#e7f1e7_0%,#f7faf7_56%,#edf4ec_100%)]">
                            <div className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-primary/10 bg-white/80 shadow-sm">
                              <Clock3 className="h-7 w-7 text-primary/60" />
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-emerald-950/8 to-transparent" />
                        <div className="absolute left-5 top-5 inline-flex rounded-full border border-white/25 bg-white/88 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur-sm">
                          News
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock3 className="h-4 w-4 text-primary" />
                          <span>{format(new Date(item.publishedAt), "EEE, MMM d, yyyy")}</span>
                        </div>

                        <h3 className="mb-3 line-clamp-2 text-[1.7rem] font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                          {item.title}
                        </h3>

                        <p className="mb-6 line-clamp-4 text-sm leading-7 text-muted-foreground">
                          {item.excerpt || "Read the full update to explore the latest GREENENGINE progress and announcements."}
                        </p>

                        <div className="mt-auto">
                          <Link href={`/news/${item.slug}`}>
                            <Button
                              className="w-full rounded-full bg-primary/95 text-primary-foreground shadow-[0_14px_30px_rgba(25,58,40,0.16)] transition-all hover:bg-primary hover:shadow-[0_18px_34px_rgba(25,58,40,0.20)]"
                              data-testid={`button-read-more-${item.slug}`}
                            >
                              Read more
                              <ArrowRight className="ml-2 h-4 w-4" />
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
                className="absolute left-0 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full border border-primary/10 bg-white text-primary shadow-[0_18px_36px_rgba(21,48,30,0.14)] hover:bg-primary hover:text-primary-foreground md:-translate-x-2"
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
                className="absolute right-0 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full border border-primary/10 bg-white text-primary shadow-[0_18px_36px_rgba(21,48,30,0.14)] hover:bg-primary hover:text-primary-foreground md:translate-x-2"
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
