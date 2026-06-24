import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, Home, Clock, Route, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { destinationList } from "@/data/destinations";
import { generateBreadcrumbSchema, siteUrl, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Out-of-State Moving Destinations from Las Vegas | Umbrella Movers",
  description:
    "Moving out of state from Las Vegas? Destination guides with cost (movers vs PODS), drive times, and tips for Austin, Phoenix, Denver, Dallas, Seattle & more. Licensed, insured, woman-owned.",
  alternates: { canonical: "/destinations" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/destinations`,
    title: "Out-of-State Moving Destinations from Las Vegas | Umbrella Movers",
    description:
      "Long-distance moving guides from Las Vegas: cost comparisons, drive times, and what to watch for. Licensed, insured, woman-owned movers.",
    images: [{ url: socialImage }],
  },
};

export default function DestinationsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Destinations", url: `${siteUrl}/destinations` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <div className="bg-muted/50 py-3 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Destinations</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Moving Out of State from Las Vegas
          </h1>
          <p className="text-xl text-background/80 max-w-2xl mx-auto">
            We move people out of Nevada every week. Pick your destination for honest cost
            comparisons (movers vs. PODS), drive times, and what to watch for when hiring a
            long-distance mover.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinationList.map((dest) => (
              <Link key={dest.slug} href={`/destinations/${dest.slug}`}>
                <Card className="backdrop-blur-md bg-card/80 border border-border/50 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h2 className="text-2xl font-bold text-foreground">
                        {dest.city}, {dest.stateAbbr}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-4">{dest.heroSubhead}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Route className="h-4 w-4 text-primary" />
                        {dest.distanceMiles.toLocaleString("en-US")} mi
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary" />
                        {dest.driveTimeRange}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        {dest.tripDuration}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                      Las Vegas to {dest.city} guide
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
