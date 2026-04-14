"use client";
import { Umbrella } from "lucide-react";
import Link from "next/link";
import { servicesList } from "@/data/services";
import { useFadeIn } from "@/hooks/use-fade-in";

const Services = () => {
  const fadeRef = useFadeIn();

  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 fade-in-section" ref={fadeRef as React.RefObject<HTMLDivElement>}>
        <div className="text-center mb-20">
          <p className="editorial-subheading text-accent mb-4">What We Do</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-5">Our Moving Services</h2>
          <div className="editorial-divider mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {servicesList.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block"
            >
              <div className="rounded-sm overflow-hidden border border-border hover:shadow-lifted transition-all duration-500">
                <div className="relative aspect-[4/5]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <h3 className="absolute bottom-5 left-5 text-lg font-serif text-white tracking-wide">
                    {service.title}
                  </h3>
                </div>
                
                <div className="p-5 bg-card">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
