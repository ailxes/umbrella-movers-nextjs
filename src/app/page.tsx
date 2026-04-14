import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ServiceAreas from "@/components/ServiceAreas";
import Community from "@/components/Community";
import RecentMovesSection from "@/components/RecentMovesSection";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { generateOrganizationSchema, siteUrl, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Licensed Las Vegas Movers | Woman-Owned | Umbrella Movers",
  description: "Umbrella Movers is Las Vegas' highest-rated woman-owned moving company. CPCN 3364, US DOT 2474617. Licensed, insured, 300+ 5-star reviews. Get a free quote today!",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Licensed Las Vegas Movers | Woman-Owned | Umbrella Movers",
    description: "Umbrella Movers is Las Vegas' highest-rated woman-owned moving company. CPCN 3364, US DOT 2474617. Licensed, insured, 300+ 5-star reviews.",
    images: [{ url: socialImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Licensed Las Vegas Movers | Woman-Owned | Umbrella Movers",
    description: "Umbrella Movers is Las Vegas' highest-rated woman-owned moving company. CPCN 3364, US DOT 2474617. Licensed, insured, 300+ 5-star reviews.",
    images: [socialImage],
  },
};

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": siteUrl,
    "name": "Umbrella Movers",
    "description": "Umbrella Movers is Las Vegas' highest-rated woman-owned moving company.",
    "publisher": { "@id": `${siteUrl}/#organization` },
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Header />
      <Hero />
      <WhyChooseUs />
      <Testimonials />
      <Services />
      <RecentMovesSection />
      <ServiceAreas />
      <Community />
      <Contact />
      <FAQ />
      <Footer />
    </div>
  );
}
