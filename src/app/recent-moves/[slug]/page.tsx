import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle, MapPin, Home, Users, Truck, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { recentMoves, getRecentMove } from "@/data/recentMoves";
import { generateBreadcrumbSchema, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return recentMoves.map((move) => ({ slug: move.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const move = getRecentMove(slug);
  if (!move) return {};
  const image = move.photos[0] ? `${siteUrl}${move.photos[0].src}` : undefined;
  return {
    title: move.title,
    description: move.metaDescription,
    alternates: { canonical: `/recent-moves/${move.slug}` },
    openGraph: {
      type: "article",
      url: `${siteUrl}/recent-moves/${move.slug}`,
      title: `${move.title} | Umbrella Movers`,
      description: move.metaDescription,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function RecentMovePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const move = getRecentMove(slug);
  if (!move) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Recent Moves", url: `${siteUrl}/recent-moves` },
    { name: move.title, url: `${siteUrl}/recent-moves/${move.slug}` },
  ]);

  const otherMoves = recentMoves.filter((m) => m.slug !== move.slug);

  const facts = [
    { icon: MapPin, label: "Location", value: move.location },
    { icon: Home, label: "Property", value: move.homeType },
    { icon: Truck, label: "Type of move", value: move.moveType },
    { icon: Users, label: "Crew", value: move.crewSize },
  ];

  const sections = [
    { heading: "What the customer needed", body: move.challenge },
    { heading: "Access and building requirements", body: move.access },
    { heading: "How it finished", body: move.result },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        <section className="bg-foreground text-background py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Link href="/recent-moves" className="inline-flex items-center gap-2 text-background/60 hover:text-background text-sm mb-6">
                <ArrowLeft className="h-4 w-4" /> All recent moves
              </Link>
              <p className="editorial-subheading text-background/50 mb-4">Case Study</p>
              <h1 className="text-3xl md:text-5xl font-bold text-background mb-6">{move.title}</h1>
              <p className="text-lg text-background/70">{move.summary}</p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                {/* Photos */}
                <div className={`grid gap-4 ${move.photos.length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {move.photos.map((photo) => (
                    <figure key={photo.src} className="overflow-hidden rounded-lg border border-border bg-secondary/30">
                      <img src={photo.src} alt={photo.alt} className="w-full h-64 object-cover" loading="lazy" />
                      <figcaption className="px-3 py-2 text-xs text-muted-foreground">{photo.alt}</figcaption>
                    </figure>
                  ))}
                </div>

                {/* Narrative */}
                {sections.map((s) => (
                  <div key={s.heading}>
                    <h2 className="text-2xl font-bold mb-3">{s.heading}</h2>
                    <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                ))}

                {/* Protection checklist */}
                <div className="bg-secondary/50 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">How items were protected</h2>
                  <ul className="space-y-3">
                    {move.protectionChecklist.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related links */}
                <div className="border-t border-border pt-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Services used on this move</h3>
                    <ul className="space-y-2">
                      {move.relatedServices.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="inline-flex items-center gap-2 text-primary hover:underline">
                            <ArrowRight className="h-4 w-4" /> {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Areas served</h3>
                    <ul className="space-y-2">
                      {move.relatedAreas.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="inline-flex items-center gap-2 text-primary hover:underline">
                            <ArrowRight className="h-4 w-4" /> {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="rounded-lg border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold mb-4">Move at a glance</h2>
                    <dl className="space-y-4">
                      {facts.map((f) => (
                        <div key={f.label} className="flex items-start gap-3">
                          <f.icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <div>
                            <dt className="text-xs uppercase tracking-wide text-muted-foreground">{f.label}</dt>
                            <dd className="text-sm font-medium text-foreground">{f.value}</dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="rounded-lg bg-foreground text-background p-6">
                    <h2 className="text-lg font-semibold mb-2">Planning a similar move?</h2>
                    <p className="text-sm text-background/70 mb-4">Tell us what needs to move and we will put together a plan and a quote.</p>
                    <Button asChild className="w-full bg-accent hover:bg-accent-dark text-accent-foreground">
                      <a href="/#contact">Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" /></a>
                    </Button>
                    <a href="tel:7025332853" className="mt-3 inline-flex w-full items-center justify-center gap-2 text-sm text-background/80 hover:text-background">
                      <Phone className="h-4 w-4" /> 702-533-2853
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {otherMoves.length > 0 && (
          <section className="py-16 bg-muted">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">More recent moves</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {otherMoves.map((m) => (
                  <Link key={m.slug} href={`/recent-moves/${m.slug}`} className="group flex gap-4 rounded-lg border border-border bg-background p-4 hover:border-accent transition-colors">
                    {m.photos[0] && (
                      <img src={m.photos[0].src} alt={m.photos[0].alt} className="w-28 h-20 object-cover rounded-md shrink-0" loading="lazy" />
                    )}
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-accent transition-colors">{m.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{m.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
