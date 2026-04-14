"use client";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useFadeIn } from "@/hooks/use-fade-in";

const serviceAreas = [
  { name: "Las Vegas, NV", slug: "las-vegas" },
  { name: "Summerlin, NV", slug: "summerlin" },
  { name: "Henderson, NV", slug: "henderson" },
  { name: "Southern Highlands, NV", slug: "southern-highlands" },
  { name: "Centennial Hills, NV", slug: "centennial-hills" },
  { name: "Anthem, NV", slug: "anthem" },
  { name: "MacDonald Highlands, NV", slug: "macdonald-highlands" },
  { name: "The Ridges, NV", slug: "the-ridges" },
  { name: "Green Valley Ranch, NV", slug: "green-valley-ranch" },
  { name: "Sunrise Manor, NV", slug: "sunrise-manor" },
  { name: "Mountains Edge, NV", slug: "mountains-edge" },
  { name: "Sun City Summerlin, NV", slug: "sun-city-summerlin" },
];

const ServiceAreas = () => {
  const fadeRef = useFadeIn();

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 fade-in-section" ref={fadeRef as React.RefObject<HTMLDivElement>}>
        <div className="text-center mb-16">
          <p className="editorial-subheading text-accent mb-4">Where We Serve</p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-5">
            Service Areas
          </h2>
          <div className="editorial-divider mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg font-light">
            Experienced Movers in Las Vegas, Clark County & Surrounding Areas
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {serviceAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/locations/${area.slug}`}
              className="group flex items-center gap-3 p-4 border border-border rounded-sm hover:border-accent/40 hover:shadow-medium transition-all duration-300"
            >
              <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                {area.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
