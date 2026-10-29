import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Award, FileCheck, Camera, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MoveCard from "@/components/recent-moves/MoveCard";
import { Button } from "@/components/ui/button";
import { recentMoves, popularServices, popularAreas } from "@/data/recentMoves";
import { siteUrl, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Recent Moves in Las Vegas, Summerlin & Henderson",
  description: "See recent white-glove moves by Umbrella Movers across Las Vegas Valley. Photos, neighborhoods served, and proof of our protection-first process.",
  alternates: { canonical: "/recent-moves" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/recent-moves`,
    title: "Recent Moves | Umbrella Movers Las Vegas",
    description: "See recent moves across Las Vegas Valley. Photos and neighborhoods served.",
    images: [{ url: socialImage }],
  },
};

const protectionFeatures = [
  { icon: Shield, title: "Fully Insured", desc: "Every move covered" },
  { icon: Award, title: "WBENC Certified", desc: "Woman-owned business" },
  { icon: FileCheck, title: "Licensed", desc: "CPCN 3364 • DOT 2474617" },
  { icon: Camera, title: "Documented", desc: "Photo documentation" },
];

export default function RecentMovesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Recent Moves", item: `${siteUrl}/recent-moves` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        <section className="bg-foreground text-background py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="editorial-subheading text-background/50 mb-4">Portfolio</p>
              <h1 className="text-4xl md:text-5xl font-bold text-background mb-6">Recent Moves</h1>
              <p className="text-lg text-background/70 mb-8">
                Every move tells a story. Here's a look at some of our recent work across the Las Vegas Valley — real moves, real families, real care.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {protectionFeatures.map((f) => (
                  <div key={f.title} className="flex items-center gap-2">
                    <f.icon className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-background">{f.title}</p>
                      <p className="text-xs text-background/50">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentMoves.map((move) => (
                <MoveCard key={move.id} move={move} />
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-bold mb-4">Services Featured</h2>
                <div className="flex flex-wrap gap-2">
                  {popularServices.map((s) => (
                    <Link key={s.href} href={s.href} className="bg-background border border-border px-3 py-1.5 rounded-sm text-sm hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Areas Served</h2>
                <div className="flex flex-wrap gap-2">
                  {popularAreas.map((a) => (
                    <Link key={a.href} href={a.href} className="bg-background border border-border px-3 py-1.5 rounded-sm text-sm hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
                      {a.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready for Your Move?</h2>
            <p className="text-background/70 mb-8">Join hundreds of families who&apos;ve trusted Umbrella Movers for their Las Vegas move.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-accent hover:bg-accent-dark text-accent-foreground">
                <a href="/#contact">Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline" className="border-background/20 text-background hover:bg-background/10">
                <a href="tel:7025332853"><Phone className="mr-2 h-4 w-4" /> 702-533-2853</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
