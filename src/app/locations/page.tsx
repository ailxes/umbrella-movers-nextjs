import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, Home } from "lucide-react";
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
import { generateBreadcrumbSchema, siteUrl, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Service Areas | Licensed Las Vegas Movers",
  description: "Umbrella Movers serves all Las Vegas neighborhoods including Summerlin, Henderson, Anthem, and more. Woman-owned, WBENC certified, fully licensed (CPCN 3364). 300+ 5-star reviews.",
  alternates: { canonical: "/locations" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/locations`,
    title: "Service Areas | Umbrella Movers Las Vegas",
    description: "Serving all Las Vegas neighborhoods. Licensed, insured, woman-owned. 300+ 5-star reviews.",
    images: [{ url: socialImage }],
  },
};

const serviceAreas = [
  { name: "Las Vegas", slug: "las-vegas", description: "Full-service moving for all Las Vegas communities. From the Strip to master-planned neighborhoods.", zipCodes: ["89101", "89102", "89103", "89104", "89107"], image: "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?w=800&q=80" },
  { name: "Summerlin", slug: "summerlin", description: "Serving The Ridges, The Mesa, Queensridge, and all Summerlin communities.", zipCodes: ["89128", "89134", "89135", "89138"], image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" },
  { name: "Henderson", slug: "henderson", description: "Expert movers for MacDonald Highlands, Seven Hills, Lake Las Vegas, and more.", zipCodes: ["89002", "89011", "89012", "89052"], image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" },
  { name: "Anthem", slug: "anthem", description: "Specialized services for Sun City Anthem, Anthem Country Club, and surrounding areas.", zipCodes: ["89052", "89044"], image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" },
  { name: "Southern Highlands", slug: "southern-highlands", description: "Premium moving for Southern Highlands Golf Club and guard-gated communities.", zipCodes: ["89141", "89148"], image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" },
  { name: "Centennial Hills", slug: "centennial-hills", description: "Trusted movers for Centennial Hills, Skye Canyon, and Northwest Las Vegas.", zipCodes: ["89131", "89143", "89149"], image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
  { name: "MacDonald Highlands", slug: "macdonald-highlands", description: "White-glove moving for MacDonald Highlands luxury estates and DragonRidge.", zipCodes: ["89012"], image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80" },
  { name: "The Ridges", slug: "the-ridges", description: "Elite moving services for The Ridges, Summerlin's most prestigious community.", zipCodes: ["89135"], image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80" },
  { name: "Green Valley Ranch", slug: "green-valley-ranch", description: "Professional movers for Green Valley Ranch and surrounding Henderson communities.", zipCodes: ["89052", "89012"], image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80" },
  { name: "Sunrise Manor", slug: "sunrise-manor", description: "Reliable moving services for Sunrise Manor and East Las Vegas communities.", zipCodes: ["89110", "89115", "89142", "89156"], image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80" },
  { name: "Mountains Edge", slug: "mountains-edge", description: "Expert movers for Mountains Edge master-planned community in Southwest Las Vegas.", zipCodes: ["89141", "89178"], image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80" },
  { name: "Sun City Summerlin", slug: "sun-city-summerlin", description: "Senior-friendly moving specialists for Sun City Summerlin 55+ community.", zipCodes: ["89134", "89144"], image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80" },
  { name: "Aliante", slug: "aliante", description: "Trusted moving services for Aliante master-planned community in North Las Vegas.", zipCodes: ["89084", "89031"], image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80" },
];

export default function LocationsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Service Areas", url: `${siteUrl}/locations` },
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
              <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbPage>Service Areas</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Las Vegas Service Areas</h1>
          <p className="text-xl text-background/80 max-w-2xl mx-auto">
            From Summerlin to Henderson, we know Las Vegas neighborhoods inside and out. Select your area to learn how we can help with your move.
          </p>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((area) => (
              <Link key={area.slug} href={`/locations/${area.slug}`}>
                <Card className="backdrop-blur-md bg-card/80 border border-border/50 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full">
                  <div className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300" style={{ backgroundImage: `url(${area.image})` }} />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h2 className="text-2xl font-bold text-foreground">{area.name}</h2>
                    </div>
                    <p className="text-muted-foreground mb-4">{area.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.zipCodes.map((zip) => (
                        <span key={zip} className="bg-muted px-2 py-1 rounded text-sm text-muted-foreground">{zip}</span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                      View {area.name} Services
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
