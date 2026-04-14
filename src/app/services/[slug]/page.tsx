import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { servicesData, areasServed } from "@/data/services";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { generateBreadcrumbSchema, siteUrl, socialImage } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return {};
  const ogTitle = `${service.title} Las Vegas | Umbrella Movers`;
  const ogDescription = `Professional ${service.title.toLowerCase()} in Las Vegas. Licensed, insured, woman-owned. 300+ 5-star reviews.`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `${siteUrl}/services/${slug}`,
      images: [{ url: socialImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [socialImage],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Services", url: `${siteUrl}/services` },
    { name: service.title, url: `${siteUrl}/services/${slug}` },
  ]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/services/${slug}`,
    name: service.title,
    description: service.content.intro,
    image: service.heroImage,
    provider: { "@type": "LocalBusiness", "@id": `${siteUrl}/#organization`, name: "Umbrella Movers" },
    areaServed: areasServed.map((area) => ({ "@type": "City", name: area })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[400px] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 container mx-auto px-4 pb-12 pt-32">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link href="/" className="text-white/70 hover:text-white">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/40" />
                <BreadcrumbItem><BreadcrumbLink asChild><Link href="/services" className="text-white/70 hover:text-white">Services</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/40" />
                <BreadcrumbItem><BreadcrumbPage className="text-white">{service.title}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
            <p className="text-white/80 text-lg max-w-2xl">{service.shortDescription}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                {/* Intro */}
                <p className="text-muted-foreground leading-relaxed mb-8 text-lg">{service.content.intro}</p>

                {/* Features */}
                {service.content.features.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">What&apos;s Included</h2>
                    <ul className="space-y-3">
                      {service.content.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Process */}
                {service.content.process.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Our Process</h2>
                    <div className="space-y-4">
                      {service.content.process.map((step, i) => (
                        <div key={i} className="flex gap-4 p-6 bg-card rounded-lg border border-border">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                            {i + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                            <p className="text-muted-foreground text-sm">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                {service.content.additionalInfo && (
                  <div className="p-6 bg-accent/10 rounded-lg border border-accent/20 mb-10">
                    <p className="text-muted-foreground">{service.content.additionalInfo}</p>
                  </div>
                )}

                {/* FAQs */}
                {service.content.faqs && service.content.faqs.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible>
                      {service.content.faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`faq-${i}`}>
                          <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                {/* Related Content */}
                {service.relatedContent && (
                  <div className="border-t border-border pt-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      {service.relatedContent.services && service.relatedContent.services.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Related Services</h3>
                          <ul className="space-y-2">
                            {service.relatedContent.services.map((s, i) => (
                              <li key={i}>
                                <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-2 text-primary hover:underline">
                                  <ArrowRight className="h-4 w-4" />{s.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {service.relatedContent.locations && service.relatedContent.locations.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Popular Service Areas</h3>
                          <ul className="space-y-2">
                            {service.relatedContent.locations.map((loc, i) => (
                              <li key={i}>
                                <Link href={`/locations/${loc.slug}`} className="inline-flex items-center gap-2 text-primary hover:underline">
                                  <ArrowRight className="h-4 w-4" />{loc.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <QuoteForm />
                  <div className="mt-6">
                    <Link href="/services" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
                      <ArrowRight className="h-4 w-4" /> View All Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
