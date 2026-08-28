import Link from "next/link";
import {
  Home,
  ChevronRight,
  ArrowRight,
  MapPin,
  Clock,
  Route,
  CalendarDays,
  Truck,
  Package,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
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
import QuoteForm from "@/components/QuoteForm";
import {
  DestinationData,
  moverBenefits,
  moverRedFlags,
  podsConsiderations,
  umbrellaTrustPoints,
} from "@/data/destinations";

export default function DestinationPageTemplate({ data }: { data: DestinationData }) {
  // Hero photo of the destination city. Files live in /public/assets/destinations/
  // named after the city portion of the slug (e.g. "las-vegas-to-austin" -> "austin.jpg").
  const heroImage = `/assets/destinations/${data.slug.replace("las-vegas-to-", "")}.jpg`;

  // The route is already known from the page itself, so the form states it
  // rather than making the visitor describe the move a second time.
  const routeLabel = `Las Vegas, NV → ${data.city}, ${data.stateAbbr}`;
  const quoteLabel = `Get My Las Vegas–${data.city} Quote`;
  const ctaButton =
    "inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-accent-foreground font-bold rounded-md px-8 py-3 transition-colors whitespace-normal leading-relaxed";

  return (
    <>
      <Header />

      {/* Breadcrumbs */}
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
                <BreadcrumbLink asChild>
                  <Link href="/destinations">Destinations</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {data.city}, {data.stateAbbr}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={`${data.city}, ${data.state}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        </div>
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center py-24 md:py-32">
          <p className="text-sm font-medium tracking-widest uppercase text-white/70 mb-4">
            Las Vegas → {data.city}, {data.stateAbbr}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-sm">
            {data.heroTitle}
          </h1>
          <p className="text-xl text-white/85 max-w-2xl mx-auto mb-8">{data.heroSubhead}</p>
          <a href="#quote-form" className={ctaButton}>
            {quoteLabel} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-10 bg-background border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="bg-card/80 border border-border/50">
              <CardContent className="p-6 text-center">
                <Route className="h-7 w-7 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">
                  {data.distanceMiles.toLocaleString("en-US")} mi
                </div>
                <div className="text-sm text-muted-foreground">Distance from Las Vegas</div>
              </CardContent>
            </Card>
            <Card className="bg-card/80 border border-border/50">
              <CardContent className="p-6 text-center">
                <Clock className="h-7 w-7 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{data.driveTimeRange}</div>
                <div className="text-sm text-muted-foreground">Est. moving-truck drive</div>
              </CardContent>
            </Card>
            <Card className="bg-card/80 border border-border/50">
              <CardContent className="p-6 text-center">
                <CalendarDays className="h-7 w-7 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{data.tripDuration}</div>
                <div className="text-sm text-muted-foreground">Typical trip length</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Inline CTA — caught while the route numbers are still on screen */}
      <section className="py-8 bg-secondary/40 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-lg font-semibold text-foreground">
              Moving Las Vegas to {data.city}?
            </p>
            <a href="#quote-form" className={`${ctaButton} shrink-0`}>
              Check Your Date and Get a Route-Specific Estimate <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-foreground/80 leading-relaxed">{data.introParagraph}</p>
        </div>
      </section>

      {/* How long does it take (drive) */}
      <section className="py-12 bg-secondary/40">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How long does it take to get from Las Vegas to {data.city}?
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-6">{data.driveNotes}</p>
          <Card className="bg-card border border-border/50">
            <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Clock className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">{data.driveTimeRange}</div>
                  <div className="text-sm text-muted-foreground">
                    Truck driving time ({data.distanceMiles.toLocaleString("en-US")} mi)
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">{data.tripDuration}</div>
                  <div className="text-sm text-muted-foreground">
                    With the FMCSA 11-hr/day limit
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Route className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Primary route</div>
                  <div className="text-sm text-muted-foreground">{data.route}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Movers vs PODS — benefits focused */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Hiring movers vs. using PODS for your move to {data.city}
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-8">
            A moving container can have a lower upfront price, but that&apos;s because you supply all
            the labor. Here&apos;s what you actually get with a full-service mover versus a self-load
            container on this route — so you can weigh convenience, safety, and your own time, not
            just the sticker price.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card border border-primary/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Full-service movers</h3>
                </div>
                <ul className="space-y-3 text-sm text-foreground/80">
                  {moverBenefits.map((b) => (
                    <li key={b.title} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>
                        <span className="font-semibold text-foreground">{b.title}.</span>{" "}
                        {b.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="h-6 w-6 text-muted-foreground" />
                  <h3 className="text-xl font-bold text-foreground">PODS / moving container</h3>
                </div>
                <ul className="space-y-3 text-sm text-foreground/80">
                  {podsConsiderations.map((c) => (
                    <li key={c.title} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span>
                        <span className="font-semibold text-foreground">{c.title}.</span>{" "}
                        {c.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="p-6 bg-secondary rounded-lg border-l-4 border-primary">
            <p className="font-semibold text-foreground mb-1">The bottom line</p>
            <p className="text-foreground/80 leading-relaxed">{data.comparisonVerdict}</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg bg-foreground text-background p-6 text-center sm:text-left">
            <p className="text-lg font-semibold">
              Skip the loading, driving and unloading —
            </p>
            <a href="#quote-form" className={`${ctaButton} shrink-0`}>
              Get My Full-Service Price <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Why move / popular areas */}
      <section className="py-12 bg-secondary/40">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Why people move from Las Vegas to {data.city}
              </h2>
              <ul className="space-y-3">
                {data.whyMove.map((reason) => (
                  <li key={reason} className="flex gap-3 text-foreground/80">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Popular areas in {data.city}
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.popularAreas.map((area) => (
                  <span
                    key={area}
                    className="bg-card border border-border/50 px-3 py-1.5 rounded-full text-sm text-foreground/80"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Red flags */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-7 w-7 text-accent" />
            <h2 className="text-3xl font-bold text-foreground">
              Red flags when hiring movers
            </h2>
          </div>
          <p className="text-foreground/80 leading-relaxed mb-8">
            Long-distance moves attract scams. Before you book any company for your move to {data.city},
            watch for these warning signs:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {moverRedFlags.map((item) => (
              <Card key={item.flag} className="bg-card border border-border/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-accent shrink-0" />
                    <h3 className="font-bold text-foreground">{item.flag}</h3>
                  </div>
                  <p className="text-sm text-foreground/70">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Umbrella */}
      <section className="py-12 bg-secondary/40">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="h-7 w-7 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Why move to {data.city} with Umbrella Movers
            </h2>
          </div>
          <p className="text-foreground/80 leading-relaxed mb-8">
            None of the red flags above apply to us — and here&apos;s what you get instead:
          </p>
          <div className="space-y-4">
            {umbrellaTrustPoints.map((point) => (
              <div key={point.title} className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground">{point.title}</h3>
                  <p className="text-foreground/70">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Las Vegas to {data.city}: frequently asked questions
          </h2>
          <div className="space-y-6">
            {data.faqItems.map((faq) => (
              <div key={faq.question} className="border-b border-border pb-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{faq.question}</h3>
                <p className="text-foreground/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — the form itself, with the route already filled in */}
      <section id="quote-form" className="py-16 bg-foreground text-background scroll-mt-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready for your move to {data.city}?
          </h2>
          <p className="text-background/80 mb-8">
            Get a free, no-pressure quote from Las Vegas&apos; highest-rated woman-owned moving
            company. Licensed (CPCN 3364), insured, and 300+ 5-star reviews.
          </p>
          <QuoteForm
            className="text-left"
            title={`Your Las Vegas to ${data.city} Move`}
            submitLabel={quoteLabel}
            routeLabel={routeLabel}
          />
        </div>
      </section>

      {/* Other destinations cross-link */}
      <section className="py-10 bg-background border-t">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-muted-foreground mb-2">Moving somewhere else from Las Vegas?</p>
          <Link href="/destinations" className="text-primary font-medium inline-flex items-center gap-1">
            View all destination guides
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
