"use client";
import { Award, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFadeIn } from "@/hooks/use-fade-in";

const WhyChooseUs = () => {
  const fadeRef = useFadeIn();

  const reasons = [
    {
      icon: Award,
      title: "Our Difference: WBENC Certified, Community Focused",
      description: "Lead with the Why: Support a Local Las Vegas Business",
      points: [
        "We are not a national chain. Your money stays in our community.",
        "We are corporate and government vendor approved—trust you can rely on.",
        "WBENC Certified Woman-Owned Business since 2009.",
      ],
    },
    {
      icon: Shield,
      title: "No Outsourcing. No Subcontractors. Period.",
      description: "Stress-Free",
      points: [
        "Your moving team is employed, trained, and licensed by Umbrella Movers.",
        "We guarantee the same team loads and unloads your belongings, ensuring maximum care and accountability.",
        "Fully licensed (CPCN 3364) & insured for your peace of mind.",
      ],
    },
    {
      icon: TrendingUp,
      title: "Experience That Matters: 15+ Years, 300+ Reviews",
      description: "Unmatched Social Proof",
      points: [
        "Since 2009, we've completed thousands of successful, stress-free moves.",
        "With over 300+ 5-star reviews on Yelp and a consistent 4.9/5 rating, our track record is proven.",
        "Your belongings are in the hands of true professionals.",
      ],
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 fade-in-section" ref={fadeRef as React.RefObject<HTMLDivElement>}>
        <div className="text-center mb-20">
          <p className="editorial-subheading text-accent mb-4">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-5">Why Choose Umbrella Movers?</h2>
          <div className="editorial-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            The Moving Company You Can Trust With Your Belongings
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-sm p-8 border border-border hover:shadow-lifted transition-all duration-500 group"
              >
                <div className="flex justify-center mb-8">
                  <div className="border border-accent/30 p-4 rounded-full group-hover:border-accent transition-colors duration-300">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-serif text-center mb-3 text-card-foreground">{reason.title}</h3>
                <p className="text-center text-accent text-sm italic mb-6">{reason.description}</p>
                <ul className="space-y-4">
                  {reason.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <span className="text-accent mt-0.5 flex-shrink-0 text-sm">✦</span>
                      <span className="text-muted-foreground text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16 px-2">
          <a href="/why-choose-us">
            <Button variant="outline" size="lg" className="text-sm tracking-widest uppercase border-foreground/20 hover:bg-foreground hover:text-background rounded-sm px-8 py-5 h-auto font-medium">
              <span className="hidden sm:inline">Click here to see the importance of hiring a licensed and verified mover</span>
              <span className="sm:hidden">Why Hire a Licensed Mover?</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
