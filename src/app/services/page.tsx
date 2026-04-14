import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { servicesList } from "@/data/services";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { generateBreadcrumbSchema, siteUrl, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Moving Services Las Vegas | Licensed Woman-Owned Movers",
  description: "Comprehensive moving services in Las Vegas. Residential, commercial, long-distance, packing, storage & specialty moving. Woman-owned, fully licensed (CPCN 3364) & insured. 300+ 5-star reviews.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/services`,
    title: "Moving Services Las Vegas | Umbrella Movers",
    description: "Full-service moving solutions in Las Vegas. Licensed, insured, woman-owned. 300+ 5-star reviews.",
    images: [{ url: socialImage }],
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Services", url: `${siteUrl}/services` },
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: "Umbrella Movers",
    description: "Comprehensive moving services in Las Vegas. Woman-owned, fully licensed & insured.",
    url: siteUrl,
    telephone: "702-533-2853",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Moving Services",
      itemListElement: servicesList.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${siteUrl}/services/${service.slug}`,
          name: service.title,
          description: service.shortDescription,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        <section className="py-20 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Moving Services in Las Vegas</h1>
            <p className="text-xl text-background/80 max-w-2xl mx-auto">
              Full-service moving solutions for every need — residential, commercial, long-distance, and specialty moves. Licensed, insured, and woman-owned.
            </p>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesList.map((service) => (
                <article key={service.slug} className="group bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-strong transition-all duration-300">
                  <Link href={`/services/${service.slug}`} className="block">
                    <div className="relative overflow-hidden">
                      <AspectRatio ratio={4 / 3}>
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      </AspectRatio>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <h3 className="absolute bottom-4 left-4 right-4 text-xl md:text-2xl font-bold text-white">{service.title}</h3>
                    </div>
                  </Link>
                  <div className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-3">{service.shortDescription}</p>
                    <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200">
                      Read More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-accent">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-accent-foreground/80 mb-8 max-w-2xl mx-auto">Contact us today for a free, no-obligation quote.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
                Get Free Quote
              </Link>
              <a href="tel:702-533-2853" className="inline-flex items-center justify-center border-2 border-accent-foreground text-accent-foreground px-8 py-3 rounded-md font-semibold hover:bg-accent-foreground hover:text-accent transition-colors">
                Call 702-533-2853
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
