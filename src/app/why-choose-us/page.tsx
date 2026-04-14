import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { Check, X, ShieldCheck, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateBreadcrumbSchema, siteUrl, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Why Choose Us | Licensed & Insured Moving",
  description: "Learn why hiring a licensed and insured mover matters. Umbrella Movers is fully licensed (CPCN 3364, US DOT 2474617, MC 1198694) and insured for your protection. 300+ 5-star reviews.",
  alternates: { canonical: "/why-choose-us" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/why-choose-us`,
    title: "Why Choose Licensed Movers | Umbrella Movers",
    description: "Learn why hiring a licensed and insured mover matters. CPCN 3364, US DOT 2474617.",
    images: [{ url: socialImage }],
  },
};

const benefits = [
  "Verifiable certificates of insurance",
  "Consumer protection and complaint resolution access",
  "Transparent, written estimates - no surprise fees",
  "Professional, trained moving teams",
  "Legal accountability and recourse",
  "Background-checked employees",
  "Drug tested employees",
  "Verified by state and federal agencies",
  "Business stability and long-term commitment",
  "Peace of mind knowing your belongings are protected",
];

const risks = [
  "No insurance if belongings are damaged or lost",
  "Vulnerable to scams and price gouging",
  "No regulatory oversight or complaint systems",
  "Can hold your items hostage for inflated fees",
  "No legal recourse if something goes wrong",
  "Unknown background of workers in your home",
  "Company can disappear overnight",
  "Higher risk of damage with untrained crews",
  "Risk of hiring criminals or unvetted individuals",
];

export default function WhyChooseUsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Why Choose Us", url: `${siteUrl}/why-choose-us` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="pt-20">
        <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/assets/hero-trucks.jpg" alt="Professional Umbrella Movers team" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[hsl(var(--hero-overlay))]" />
          </div>
          <div className="container mx-auto px-4 relative z-10 py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Why Choose <span className="text-accent">Umbrella Movers</span>?
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">With 15+ years of experience, we are Las Vegas&apos; most trusted licensed and insured moving company.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="h-5 w-5 text-accent fill-accent" />
                  <span className="font-bold text-sm md:text-base">300+ 5-Star Reviews</span>
                </div>
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="font-bold text-sm md:text-base">15+ Years Trusted</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-card border-2 border-primary/20 rounded-2xl p-8 shadow-medium">
              <div className="flex items-center gap-4 justify-center">
                <div className="bg-green-500 p-4 rounded-full"><ShieldCheck className="h-10 w-10 text-white" /></div>
                <div className="text-left">
                  <h2 className="text-xl font-bold text-card-foreground">LICENSED & CERTIFIED</h2>
                  <p className="text-lg text-muted-foreground">CPCN <span className="text-accent font-bold">3364</span> • US DOT <span className="text-accent font-bold">2474617</span> • MC <span className="text-accent font-bold">1198694</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-12">Why Proper Licensing Matters</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-card rounded-2xl border-2 border-green-500/30 shadow-medium overflow-hidden">
                <div className="bg-green-50 dark:bg-green-900/20 px-6 py-4 border-b border-green-500/30">
                  <h3 className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
                    <Check className="h-6 w-6" /> Benefits of Hiring a Licensed & Insured Mover
                  </h3>
                </div>
                <ul className="p-6 space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-card-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card rounded-2xl border-2 border-destructive/30 shadow-medium overflow-hidden">
                <div className="bg-red-50 dark:bg-red-900/20 px-6 py-4 border-b border-destructive/30">
                  <h3 className="text-xl md:text-2xl font-bold text-destructive flex items-center gap-2">
                    <X className="h-6 w-6" /> Risks of Hiring an Unlicensed Mover
                  </h3>
                </div>
                <ul className="p-6 space-y-4">
                  {risks.map((risk, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-card-foreground">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">Always Verify License Numbers Before Booking!</h2>
            <p className="text-primary-foreground/80 mb-6">Visit FMCSA.gov to verify credentials • Protect yourself and your belongings</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0">
                <a href="https://ai.fmcsa.dot.gov/hhg/search.asp?" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Verify on FMCSA.gov <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild className="bg-accent hover:bg-accent-dark text-accent-foreground">
                <a href="/#contact">Get a Free Quote</a>
              </Button>
            </div>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <QuoteForm variant="compact" title="Get Your Free Quote" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
