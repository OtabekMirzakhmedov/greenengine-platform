import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoplayDelay?: number;
}

export default function HeroCarousel({ slides, autoplayDelay = 6000 }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollPrev, scrollNext]);

  return (
    <section className="relative overflow-hidden" role="region" aria-roledescription="carousel" aria-label="Hero carousel">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative min-w-0 shrink-0 grow-0 basis-full h-[70vh] min-h-[500px] flex items-center justify-center"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

              {/* Content */}
              <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1]">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                  {slide.description}
                </p>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 disabled:opacity-30"
        aria-label="Previous slide"
        data-testid="button-carousel-prev"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      <button
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 disabled:opacity-30"
        aria-label="Next slide"
        data-testid="button-carousel-next"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-20">
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === selectedIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : "false"}
              data-testid={`button-carousel-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
