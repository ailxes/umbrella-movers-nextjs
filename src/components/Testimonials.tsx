"use client";
import { useState, useEffect, useCallback } from "react";
import { Star, ExternalLink, ClipboardList } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useFadeIn } from "@/hooks/use-fade-in";

const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const fadeRef = useFadeIn();

  const testimonials = [
    {
      name: "Sarah M.",
      location: "Henderson, NV",
      rating: 5,
      text: "Best movers in Las Vegas! The team was professional, careful with our belongings, and made our move stress-free. So glad to support a woman-owned business!",
      date: "October 2024",
    },
    {
      name: "Michael R.",
      location: "Summerlin, NV",
      rating: 5,
      text: "Same crew from start to finish made all the difference. They knew exactly where everything was and how it was packed. Will definitely use Umbrella Movers again!",
      date: "September 2024",
    },
    {
      name: "Jennifer K.",
      location: "Las Vegas, NV",
      rating: 5,
      text: "15 years in business and it shows. True professionals who care about their customers and the community. Highly recommend!",
      date: "August 2024",
    },
    {
      name: "David L.",
      location: "North Las Vegas, NV",
      rating: 5,
      text: "Outstanding service! They handled our fragile items with extreme care and were incredibly efficient. Worth every penny.",
      date: "September 2024",
    },
    {
      name: "Maria G.",
      location: "Las Vegas, NV",
      rating: 5,
      text: "The team at Umbrella Movers went above and beyond. Professional, friendly, and they made moving day actually enjoyable. Thank you!",
      date: "October 2024",
    },
  ];

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 fade-in-section" ref={fadeRef as React.RefObject<HTMLDivElement>}>
        <div className="text-center mb-16">
          <p className="editorial-subheading text-accent mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 max-w-3xl mx-auto leading-tight">
            300+ 5-Star Reviews. Experience The Difference Las Vegas Trusts.
          </h2>
          <div className="editorial-divider mx-auto mb-8"></div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 md:gap-5 mb-10">
            <div className="flex items-center gap-2 border border-border px-5 py-2.5 rounded-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-foreground text-sm">300+ 5-Star on Yelp</span>
            </div>
            <div className="flex items-center gap-2 border border-border px-5 py-2.5 rounded-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-foreground text-sm">50+ 5-Star on Google</span>
            </div>
            <div className="flex items-center gap-2 border border-border px-5 py-2.5 rounded-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-foreground text-sm">15+ Years Serving LV</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              asChild
              variant="outline"
              className="border border-foreground/20 hover:bg-foreground hover:text-background text-sm tracking-wide rounded-sm"
            >
              <a href="https://www.google.com/maps/search/umbrella+movers+las+vegas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Check Us Out on Google
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border border-foreground/20 hover:bg-foreground hover:text-background text-sm tracking-wide rounded-sm"
            >
              <Link href="/moving-checklist" className="flex items-center gap-2">
                Download Our Free Moving Day Checklist
                <ClipboardList className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="basis-full">
                  <Card className="bg-foreground border-none rounded-sm overflow-hidden">
                    <CardContent className="p-10 md:p-14">
                      <div className="text-6xl md:text-7xl font-serif text-background/20 leading-none mb-6">
                        "
                      </div>
                      
                      <p className="text-background/90 text-lg md:text-xl leading-relaxed italic font-light mb-10">
                        {testimonial.text}
                      </p>
                      
                      <div className="w-12 h-px bg-background/20 mb-6" />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-background font-medium text-base tracking-wide">
                            {testimonial.name}
                          </p>
                          <p className="text-background/50 text-xs mt-1 tracking-wider uppercase">
                            {testimonial.location}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === current 
                      ? "bg-foreground w-8" 
                      : "bg-foreground/20 w-4 hover:bg-foreground/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
