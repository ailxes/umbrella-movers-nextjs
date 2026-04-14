"use client";
import { Heart } from "lucide-react";





import { useFadeIn } from "@/hooks/use-fade-in";

const Community = () => {
  const fadeRef = useFadeIn();

  const charities = [
    { name: "GDEN Family Foundation", logo: "/assets/charity-gden.png" },
    { name: "Safe Nest", logo: "/assets/charity-safenest.png" },
    { name: "98.5 KLUC Toy Drive", logo: "/assets/charity-kluc.png" },
    { name: "Hope for Hunger", logo: "/assets/charity-hunger.png" },
    { name: "Veterans Thank You", logo: "/assets/charity-veterans.png" }
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 fade-in-section" ref={fadeRef as React.RefObject<HTMLDivElement>}>
        <div className="text-center mb-16">
          <p className="editorial-subheading text-accent mb-4">Community</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-5">
            Giving Back to Las Vegas
          </h2>
          <div className="editorial-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Giving back to the Las Vegas / Henderson community is very important to us. We work with several 
            local Las Vegas / Henderson charities through events & donations to be of service and light to 
            those that need it most.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
          {charities.map((charity, index) => (
            <div 
              key={index}
              className="bg-card rounded-sm p-6 border border-border hover:shadow-medium transition-all duration-300 flex items-center justify-center text-center"
            >
              {charity.logo ? (
                <img 
                  src={charity.logo} 
                  alt={charity.name}
                  className="w-full h-auto object-contain max-h-24"
                />
              ) : (
                <p className="font-medium text-sm text-card-foreground">{charity.name}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
