import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinationsData, getDestinationData } from "@/data/destinations";
import DestinationPageTemplate from "@/components/destination/DestinationPageTemplate";
import { generateBreadcrumbSchema, siteUrl, socialImage } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(destinationsData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getDestinationData(slug);
  if (!data) return {};
  // Append the current year dynamically so the title never goes stale.
  const fullTitle = `${data.metaTitle} (${new Date().getFullYear()})`;
  return {
    title: fullTitle,
    description: data.metaDescription,
    keywords: data.keywords.join(", "),
    alternates: { canonical: `/destinations/${data.slug}` },
    openGraph: {
      type: "website",
      url: `${siteUrl}/destinations/${data.slug}`,
      title: fullTitle,
      description: data.metaDescription,
      images: [{ url: socialImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: data.metaDescription,
      images: [socialImage],
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getDestinationData(slug);
  if (!data) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Destinations", url: `${siteUrl}/destinations` },
    { name: `${data.city}, ${data.stateAbbr}`, url: `${siteUrl}/destinations/${data.slug}` },
  ]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${siteUrl}/destinations/${data.slug}#service`,
    name: `Las Vegas to ${data.city} Movers — Umbrella Movers`,
    description: data.metaDescription,
    url: `${siteUrl}/destinations/${data.slug}`,
    telephone: "702-533-2853",
    areaServed: [
      { "@type": "City", name: "Las Vegas" },
      { "@type": "City", name: `${data.city}, ${data.state}` },
    ],
    provider: { "@type": "MovingCompany", "@id": `${siteUrl}/#organization`, name: "Umbrella Movers" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <DestinationPageTemplate data={data} />
    </>
  );
}
