import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { CheckSquare, Clock, Truck, Search, Home, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generateBreadcrumbSchema, siteUrl, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Moving Day Checklist | Free Download",
  description: "Your complete moving day checklist from Las Vegas' trusted woman-owned moving company. Essential tips for a stress-free move. Free PDF download!",
  alternates: { canonical: "/moving-checklist" },
  openGraph: {
    type: "article",
    url: `${siteUrl}/moving-checklist`,
    title: "Moving Day Checklist | Umbrella Movers",
    description: "Free moving day checklist with essential tips for a stress-free move.",
    images: [{ url: socialImage }],
  },
};

const checklistSections = [
  {
    icon: Clock,
    title: "Morning Essentials (The \"First Out\" Items)",
    items: [
      { label: "The \"Open First\" Box", description: "Ensure this is in your personal car, not the truck. (Contains: Toilet paper, coffee maker, chargers, basic tools, and snacks)." },
      { label: "Valuables & Documents", description: "Keep jewelry, passports, and moving contracts with you personally." },
      { label: "Bedding & Towels", description: "Strip the beds last and pack them in a clear bin so you can make the beds tonight without searching." },
    ],
  },
  {
    icon: Truck,
    title: "Loading Phase (The Strategy)",
    items: [
      { label: "Walkthrough with Movers", description: "Walk the crew through the house. Point out fragile items and \"do not move\" items (like the cleaning kit)." },
      { label: "Inventory Check", description: "As items are loaded, check them off your master list or ensure the movers' inventory matches yours." },
      { label: "Protect the Floors", description: "Ensure movers use floor runners or cardboard to protect carpets and hardwoods.", proTip: "You also want to protect doorways and thresholds with door jam protectors." },
    ],
  },
  {
    icon: Search,
    title: "The \"Final Sweep\" (Old Home)",
    items: [
      { label: "Check Every Nook", description: "Open every closet, kitchen cabinet, dishwasher, and the \"way back\" of the attic/garage." },
      { label: "Utility Final Check", description: "Take a photo of the water and electric meters for your records." },
      { label: "Thermostat & Lights", description: "Set the HVAC to an energy-saving temp and turn off all lights." },
    ],
  },
  {
    icon: Home,
    title: "Arrival Phase (New Home)",
    items: [
      { label: "The \"Walk-Through\" First", description: "Before the truck is unloaded, check the new house for any damage or cleaning issues that need immediate attention." },
      { label: "Direct the Traffic", description: "Stay near the entrance to tell movers exactly which room each box goes into (refer to your color-coding or labels).", proTip: "Good movers will pay attention to your color coded sticky notes." },
      { label: "Check for Damage", description: "As items come off the truck, inspect furniture for new scratches or breaks before the movers leave." },
      { label: "Pet/Child Zone", description: "Set up a \"safe zone\" with water, food, and toys immediately so they stay calm and contained." },
    ],
  },
];

function DownloadAndQuoteSection() {
  return (
    <div className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
                  <Download className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Download Free PDF</h3>
                  <p className="text-sm text-muted-foreground">Print it out for moving day</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">Get our complete moving day checklist in a printable PDF format. Check off each item as you go!</p>
              <Button asChild className="w-full bg-accent hover:bg-accent-dark text-accent-foreground">
                <a href="/downloads/moving-day-checklist.pdf" download className="flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Checklist PDF
                </a>
              </Button>
            </div>
            <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
              <h3 className="text-lg font-bold text-foreground mb-2">Get a Free Quote</h3>
              <p className="text-sm text-muted-foreground mb-4">Ready to book your move? Let us handle the heavy lifting!</p>
              <QuoteForm variant="compact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MovingChecklistPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Moving Checklist", url: `${siteUrl}/moving-checklist` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="pt-20">
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-6">
                <CheckSquare className="h-8 w-8 text-accent-foreground" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Moving Day Checklist</h1>
              <p className="text-lg text-primary-foreground/80">Your complete guide to a smooth, stress-free moving day from Las Vegas&apos; trusted moving experts.</p>
            </div>
          </div>
        </section>
        <div className="bg-muted py-3">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Moving Checklist</span>
            </nav>
          </div>
        </div>
        <DownloadAndQuoteSection />
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {checklistSections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-soft">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                        <section.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-foreground">{sectionIndex + 1}. {section.title}</h2>
                    </div>
                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-6 h-6 border-2 border-primary rounded flex items-center justify-center">
                              <CheckSquare className="h-4 w-4 text-transparent" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                            {item.proTip && <p className="mt-2 text-sm text-accent font-medium">Pro Tip: {item.proTip}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <DownloadAndQuoteSection />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-primary rounded-xl p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">Ready for a Stress-Free Move?</h2>
                <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">Let our professional team handle the heavy lifting. Las Vegas' trusted woman-owned moving company with 300+ 5-star reviews.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/#contact" className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-dark text-accent-foreground font-semibold rounded-lg transition-colors">
                    Get a Free Quote
                  </Link>
                  <a href="tel:7025332853" className="inline-flex items-center justify-center px-6 py-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground font-semibold rounded-lg transition-colors border border-primary-foreground/20">
                    Call 702-533-2853
                  </a>
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
