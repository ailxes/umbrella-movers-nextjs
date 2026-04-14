import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import { blogPosts } from "@/data/blogPosts";
import { generateBreadcrumbSchema, siteUrl, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Moving Tips & Las Vegas Relocation Blog",
  description: "Expert moving tips, Las Vegas relocation guides, and packing advice from Umbrella Movers. Woman-owned, licensed (CPCN 3364). 300+ 5-star reviews. Make your move stress-free!",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    title: "Moving Tips & Advice Blog | Umbrella Movers Las Vegas",
    description: "Expert moving tips and Las Vegas relocation guides from a trusted woman-owned moving company. 300+ 5-star reviews.",
    images: [{ url: socialImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moving Tips Blog | Umbrella Movers Las Vegas",
    description: "Expert moving tips and Las Vegas relocation guides. Woman-owned, licensed, 300+ reviews.",
    images: [socialImage],
  },
};

export default function BlogPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Blog", url: `${siteUrl}/blog` },
  ]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}/blog`,
    name: "Umbrella Movers Blog - Moving Tips & Las Vegas Relocation Guides",
    description: "Expert moving tips, Las Vegas relocation guides, and packing advice from Umbrella Movers.",
    url: `${siteUrl}/blog`,
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Umbrella Movers",
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/email-logo-header.png` },
    },
    blogPost: blogPosts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.publishedDate,
      url: `${siteUrl}/blog/${post.slug}`,
      image: post.image,
      author: { "@type": "Organization", name: "Umbrella Movers" },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen">
        <Header />
        <main>
          <BlogHero />
          <BlogGrid />
        </main>
        <Footer />
      </div>
    </>
  );
}
