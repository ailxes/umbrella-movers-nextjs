import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CostOfLivingCalculator } from "@/components/blog/CostOfLivingCalculator";
import { GetQuoteButton } from "@/components/blog/GetQuoteButton";
import { generateBreadcrumbSchema, siteUrl, socialImage } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const imageUrl = post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords.join(", "),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
      title: post.metaTitle,
      description: post.metaDescription,
      images: [{ url: imageUrl }],
      publishedTime: post.publishedDate,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Blog", url: `${siteUrl}/blog` },
    { name: post.title, url: `${siteUrl}/blog/${post.slug}` },
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteUrl}/blog/${post.slug}`,
    headline: post.title,
    description: post.metaDescription,
    image: post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`,
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    author: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "Umbrella Movers LLC", url: siteUrl },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Umbrella Movers LLC",
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/email-logo-header.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <article>
            <header className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/40" />
              </div>
              <div className="relative z-10 container mx-auto px-4">
                <Link href="/blog" className="inline-flex items-center gap-2 text-primary-foreground hover:text-accent transition-colors mb-6">
                  <ArrowLeft className="w-5 h-5" />
                  Back to Blog
                </Link>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground max-w-4xl">
                  {post.title}
                </h1>
                <time dateTime={post.publishedDate} className="text-primary-foreground/80 mt-4 block">
                  Published:{" "}
                  {new Date(post.publishedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <GetQuoteButton className="mt-6 bg-accent hover:bg-accent-dark text-accent-foreground font-bold">
                  Get Free Quote
                </GetQuoteButton>
              </div>
            </header>

            <section className="py-16 bg-background">
              <div className="container mx-auto px-4 max-w-4xl">
                <div className="prose prose-lg max-w-none">
                  <div className="text-foreground space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
                {post.slug === "cost-of-living-las-vegas-vs-los-angeles-bay-area-2025" && <CostOfLivingCalculator />}
                <div className="mt-12 p-8 bg-secondary rounded-lg text-center">
                  <h2 className="text-2xl font-bold mb-4">Ready to Move?</h2>
                  <p className="text-muted-foreground mb-6">Get a free quote from Las Vegas' highest-rated woman-owned moving company</p>
                  <GetQuoteButton className="bg-accent hover:bg-accent-dark text-accent-foreground font-bold">
                    Get Your Free Quote
                  </GetQuoteButton>
                </div>
              </div>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
