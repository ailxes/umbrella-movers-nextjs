"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MoveCard from "@/components/recent-moves/MoveCard";
import { recentMoves } from "@/data/recentMoves";
import { useFadeIn } from "@/hooks/use-fade-in";

const RecentMovesSection = () => {
  const fadeRef = useFadeIn();

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 fade-in-section" ref={fadeRef as React.RefObject<HTMLDivElement>}>
        <div className="text-center mb-16">
          <p className="editorial-subheading text-accent mb-4">
            Proof of White-Glove Service
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-5">
            Recent Moves
          </h2>
          <div className="editorial-divider mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            See how we've helped families across the Las Vegas Valley with our protection-first approach. 
            Every move reflects our commitment to care and precision.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {recentMoves.slice(0, 3).map((move) => (
            <MoveCard key={move.id} move={move} variant="compact" />
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="group border-foreground/20 hover:bg-foreground hover:text-background rounded-sm tracking-wide text-sm">
            <Link href="/recent-moves">
              See All Recent Moves
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentMovesSection;
