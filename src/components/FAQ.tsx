"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Star, Shield, Award } from "lucide-react";
import { useFadeIn } from "@/hooks/use-fade-in";

const faqs = [
  { question: "How much do movers cost in Las Vegas?", answer: "The total cost depends on home size, distance, stairs, and specialty items. We provide free, no-obligation quotes tailored to your specific move so there are never surprises on moving day.", showCTA: true },
  { question: "What are red flags with movers?", answer: "Watch out for movers who ask for large cash deposits upfront, have no license or insurance, or show up in unmarked trucks. Umbrella Movers is fully licensed (CPCN 3364), insured, bonded, and has 300+ verified 5-star reviews—so you can move with confidence." },
  { question: "What are the hidden costs of 2 hour movers?", answer: "Some companies advertise low 2-hour minimums but then add fuel surcharges, stair fees, long-carry charges, packing material fees, and truck fees that aren't included in the quote. At Umbrella Movers, we give you a transparent, all-inclusive estimate so you know exactly what to expect." },
  { question: "What is the cheapest day for movers?", answer: "Mid-week moves (Tuesday through Thursday) and mid-month dates are typically the most affordable since demand is lower. Moving during the off-season (October–March) can also save you money. Contact us for the best available rates on your preferred date." },
  { question: "How far in advance do I hire movers?", answer: "We recommend booking 2–3 weeks in advance, especially during peak season (May–September). However, we do accommodate last-minute moves when available. The sooner you book, the more flexibility you'll have in scheduling." },
  { question: "How much to tip on $500 move?", answer: "A common guideline is 15–20% of the total move cost, split among the crew. For a $500 move, $75–$100 divided among your movers is a generous and appreciated tip. Of course, tipping is always optional and based on your satisfaction with the service." },
  { question: "What to not let movers pack?", answer: "You should personally transport important documents (passports, birth certificates), medications, jewelry, cash, car keys, and any irreplaceable sentimental items. Hazardous materials like propane tanks, paint, and cleaning chemicals also cannot go on the truck. We'll guide you through the full list before your move." },
  { question: "Is it rude to not tip movers?", answer: "Tipping isn't required, but it's a great way to show appreciation for hard work—especially on hot Las Vegas moving days. Even a cold drink or snack goes a long way. Most customers tip $20–$50 per mover for a job well done." },
  { question: "Are you licensed and insured?", answer: "Yes! Umbrella Movers is fully licensed (CPCN 3364), insured, and bonded. We also hold US DOT 2474617 for interstate moves. Your belongings are protected throughout the entire moving process." },
  { question: "Do the same movers load and unload my belongings?", answer: "Absolutely. Unlike many moving companies that use subcontractors, the same trusted Umbrella Movers team that loads your belongings will also unload them at your destination. This ensures accountability and care." },
  { question: "Do you offer packing services?", answer: "Yes! We offer full-service packing, partial packing, or you can pack yourself. Our professional packers use high-quality materials and proven techniques to protect your valuables during transport." },
  { question: "What areas do you serve?", answer: "We serve all of Las Vegas Valley including Summerlin, Henderson, North Las Vegas, Southern Highlands, Green Valley, Anthem, and surrounding areas. We also handle long-distance moves to California, Arizona, Utah, and beyond." },
  { question: "What if something gets damaged during the move?", answer: "While damage is rare thanks to our careful handling, we are fully insured. We offer basic valuation coverage included with every move, plus options for additional coverage on high-value items. Any claims are handled promptly and professionally." },
  { question: "Can you move specialty items like pianos or safes?", answer: "Yes! We specialize in moving pianos, gun safes, hot tubs, antiques, and other heavy or delicate items. Our team has the proper equipment and training to handle specialty moves safely." }
];

const FAQ = () => {
  const fadeRef = useFadeIn();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };

  return (
    <section className="py-24 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4 fade-in-section" ref={fadeRef as React.RefObject<HTMLDivElement>}>
        <div className="text-center mb-16">
          <p className="editorial-subheading text-accent mb-4">Top Questions Asked When Moving</p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-5">
            Frequently Asked Questions
          </h2>
          <div className="editorial-divider mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our moving services. Still have questions? Contact us anytime!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="bg-background border border-border rounded-sm px-6 data-[state=open]:shadow-medium transition-shadow"
              >
                <AccordionTrigger className="text-left text-base font-medium py-5 hover:no-underline font-sans">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  <p>{faq.answer}</p>
                  {faq.showCTA && (
                    <Button 
                      className="mt-4 bg-accent hover:bg-accent-dark text-accent-foreground text-xs tracking-widest uppercase rounded-sm"
                      onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    >
                      Get Free Quote
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6 text-sm">Still have questions? We're here to help!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent-dark text-accent-foreground text-xs tracking-widest uppercase rounded-sm px-8"
              onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Get Your Free Quote
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-foreground/20 hover:bg-foreground hover:text-background text-xs tracking-widest uppercase rounded-sm"
              asChild
            >
              <a href="tel:7025332853">Call 702-533-2853</a>
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground tracking-wide">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <span className="font-medium text-foreground">300+</span> 5-Star Reviews
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground tracking-wide">
              <Shield className="h-4 w-4 text-accent" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground tracking-wide">
              <Award className="h-4 w-4 text-accent" />
              <span>Woman-Owned (WBENC)</span>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </div>
    </section>
  );
};

export default FAQ;
