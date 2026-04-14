import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locationPagesData, getLocationPageData } from "@/data/locationPages";
import LocationPageTemplate from "@/components/location/LocationPageTemplate";
import { siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(locationPagesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getLocationPageData(slug);
  if (!data) return {};
  return {
    title: data.heroTitle,
    description: data.heroSubhead,
    alternates: { canonical: `/locations/${data.slug}` },
    openGraph: {
      title: data.heroTitle,
      description: data.heroSubhead,
      url: `${siteUrl}/locations/${data.slug}`,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getLocationPageData(slug);
  if (!data) notFound();
  return <LocationPageTemplate data={data} />;
}
