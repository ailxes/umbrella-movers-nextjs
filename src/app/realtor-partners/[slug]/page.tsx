"use client";
import { useState, useRef, use } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Shield, Star, Users, CheckCircle2, Clock, Phone, Mail, Gift } from "lucide-react";
import { z } from "zod";
import VegasMovingKit from "@/components/VegasMovingKit";

const vipSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().min(10, "Phone must be at least 10 digits").max(20).regex(/^[0-9()\s\-+.]+$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email").max(255).optional().or(z.literal("")),
  moveFrom: z.string().trim().max(200).optional().or(z.literal("")),
  moveTo: z.string().trim().max(200).optional().or(z.literal("")),
});

const toTitleCase = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function RealtorPartnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const brokerageName = slug ? toTitleCase(slug) : "Our Partner";

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    moveFrom: "",
    moveTo: "",
    honeypot: "",
    smsOptIn: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const result = vipSchema.safeParse(formData);
    if (!result.success) {
      toast({ title: "Please check your info", description: result.error.issues[0]?.message, variant: "destructive" });
      return;
    }

    if (formData.honeypot.trim() !== "") return;

    setIsSubmitting(true);
    const v = result.data;
    const message = `Brokerage Referral from ${brokerageName} | From: ${v.moveFrom} | To: ${v.moveTo}`;
    const email = v.email || "not-provided@vip.umbrellamovers.com";

    try {
      const { error } = await supabase.from("quote_requests").insert({
        name: v.name,
        phone: v.phone,
        email,
        message,
      });
      if (error) throw error;

      const payload = { name: v.name, phone: v.phone, email, message, honeypot: formData.honeypot };
      supabase.functions.invoke("send-quote-email", { body: payload }).catch(() => {});
      supabase.functions.invoke("notify-quote-request", { body: payload }).catch(() => {});
      supabase.functions.invoke("send-smartmoving-lead", { body: payload }).catch(() => {});

      setIsSubmitted(true);
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please call us at (702) 533-2853.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
<div className="min-h-screen bg-background flex flex-col">
        {/* Minimal header */}
        <header className="py-8 md:py-10 text-center">
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
            ☂️ Umbrella Movers
          </span>
        </header>

        <main className="flex-1 flex flex-col items-center px-4 md:px-6">
          <div className="w-full max-w-2xl mx-auto">

            {/* Editorial headline section */}
            <section className="text-center pt-8 pb-16 md:pt-12 md:pb-24">
              <p className="editorial-subheading text-accent mb-6 md:mb-8">
                Exclusive Partner Offer
              </p>
              <div className="editorial-divider mx-auto mb-8 md:mb-10" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 md:mb-8">
                A Special Moving Gift for{" "}
                <span className="text-accent">{brokerageName}</span> Clients
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                As a <span className="font-medium text-foreground">{brokerageName}</span> client, you've unlocked a VIP Moving Credit with Umbrella Movers.
              </p>
            </section>

            {/* Trust indicators — monochromatic, minimal */}
            <section className="py-10 md:py-14 border-t border-border/50">
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {[
                  { icon: Shield, label: "Licensed & Insured" },
                  { icon: Star, label: "300+ 5-Star Reviews" },
                  { icon: Users, label: "Woman-Owned" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-accent/70" strokeWidth={1.5} />
                    <span className="text-xs tracking-[0.1em] uppercase text-muted-foreground font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* VIP Perks — deconstructed, editorial */}
            <section className="py-14 md:py-20 border-t border-border/50">
              <div className="flex items-center gap-3 mb-10 md:mb-14">
                <Gift className="h-4 w-4 text-accent/80" strokeWidth={1.5} />
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Your VIP Perks
                </h2>
              </div>

              <div className="space-y-0">
                {[
                  {
                    title: "Up to $250 Off Your Move",
                    desc: `As a ${brokerageName} VIP, save up to $250 on your moving costs.`,
                  },
                  {
                    title: "Free Basic Packing Supply Bundle",
                    desc: "Helpful moving supplies that make moving day a little more stress-free.",
                  },
                  {
                    title: "VIP Scheduling Access",
                    desc: `Our partnership with ${brokerageName} unlocks priority scheduling options.`,
                  },
                ].map(({ title, desc }, idx) => (
                  <div key={title}>
                    {idx > 0 && <div className="border-t border-border/30 my-8 md:my-10" />}
                    <div className="flex gap-4 md:gap-5">
                      <CheckCircle2 className="h-4 w-4 text-accent/80 mt-1 shrink-0" strokeWidth={1.5} />
                      <div>
                        <p className="font-semibold text-foreground text-base md:text-lg mb-1.5">{title}</p>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Form or Success */}
            <section className="py-14 md:py-20 border-t border-border/50">
              {!isSubmitted ? (
                <div>
                  <p className="editorial-subheading text-accent mb-4">Claim Your Offer</p>
                  <div className="editorial-divider mb-10 md:mb-14" />

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="absolute -left-[9999px]" aria-hidden="true">
                      <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                    </div>

                    <div>
                      <label className="block text-xs tracking-[0.1em] uppercase font-medium text-muted-foreground mb-2.5">Full Name *</label>
                      <Input name="name" placeholder="Jane Smith" value={formData.name} onChange={handleChange} required maxLength={100} className="h-12 rounded-none border-border/60 bg-transparent focus:border-accent transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.1em] uppercase font-medium text-muted-foreground mb-2.5">Phone Number *</label>
                      <Input type="tel" name="phone" placeholder="(702) 555-1234" value={formData.phone} onChange={handleChange} required maxLength={20} className="h-12 rounded-none border-border/60 bg-transparent focus:border-accent transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.1em] uppercase font-medium text-muted-foreground mb-2.5">Email</label>
                      <Input type="email" name="email" placeholder="jane@email.com" value={formData.email} onChange={handleChange} maxLength={255} className="h-12 rounded-none border-border/60 bg-transparent focus:border-accent transition-colors" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs tracking-[0.1em] uppercase font-medium text-muted-foreground mb-2.5">Moving From</label>
                        <Input name="moveFrom" placeholder="Current address" value={formData.moveFrom} onChange={handleChange} maxLength={200} className="h-12 rounded-none border-border/60 bg-transparent focus:border-accent transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.1em] uppercase font-medium text-muted-foreground mb-2.5">Moving To</label>
                        <Input name="moveTo" placeholder="New address" value={formData.moveTo} onChange={handleChange} maxLength={200} className="h-12 rounded-none border-border/60 bg-transparent focus:border-accent transition-colors" />
                      </div>
                    </div>

                    <label className="flex items-start gap-2.5 cursor-pointer pt-2">
                      <input type="checkbox" name="smsOptIn" checked={formData.smsOptIn} onChange={(e) => setFormData(prev => ({ ...prev, smsOptIn: e.target.checked }))} className="mt-0.5 h-4 w-4 shrink-0 rounded-none border-border accent-accent" />
                      <span className="text-xs leading-relaxed text-muted-foreground">
                        I agree to receive SMS updates from Umbrella Enterprises LLC. Msg &amp; data rates may apply. Msg frequency varies. Reply HELP for help; STOP to unsubscribe.{" "}
                        <a href="/privacy" className="underline hover:text-foreground transition-colors">Privacy Policy</a>.
                      </span>
                    </label>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-accent hover:bg-accent-dark text-accent-foreground rounded-none text-[11px] uppercase tracking-[0.3em] font-semibold transition-all"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                        ) : (
                          "C L A I M   ·   M Y   ·   V I P   ·   D I S C O U N T"
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div ref={successRef} className="text-center py-8 md:py-12">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-accent/30 mb-8">
                    <CheckCircle2 className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">You're All Set</h2>
                  <p className="text-muted-foreground mb-12 md:mb-16 max-w-sm mx-auto leading-relaxed">Your VIP request has been received. Here's what happens next:</p>

                  <div className="space-y-0 text-left max-w-md mx-auto">
                    {[
                      { icon: Clock, title: "Quick Response", desc: "Our team typically responds within 4 business hours." },
                      { icon: Phone, title: "Personal Consultation", desc: "A team member will reach out to discuss your move details." },
                      { icon: CheckCircle2, title: "VIP Estimate", desc: "You'll receive a detailed, no-obligation VIP estimate." },
                    ].map(({ icon: Icon, title, desc }, idx) => (
                      <div key={title}>
                        {idx > 0 && <div className="border-t border-border/30 my-8" />}
                        <div className="flex gap-4">
                          <Icon className="h-4 w-4 text-accent/80 mt-1 shrink-0" strokeWidth={1.5} />
                          <div>
                            <p className="font-semibold text-foreground mb-1">{title}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-14 pt-8 border-t border-border/30">
                    <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">Need to reach us sooner?</p>
                    <a href="tel:7025332853" className="text-lg font-semibold text-foreground hover:text-accent transition-colors">
                      (702) 533-2853
                    </a>
                  </div>
                </div>
              )}
            </section>

            {/* Vegas Moving Kit */}
            <section className="py-14 md:py-20 border-t border-border/50">
              <VegasMovingKit />
            </section>
          </div>
        </main>

        {/* Minimal editorial footer */}
        <footer className="py-12 md:py-16 text-center border-t border-border/50">
          <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-4">
            ☂️ Umbrella Movers — Proudly Local, Woman-Owned, Las Vegas
          </p>
          <div className="flex items-center justify-center gap-6 text-xs tracking-[0.05em] text-muted-foreground">
            <a href="tel:7025332853" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Phone className="h-3 w-3" strokeWidth={1.5} /> (702) 533-2853
            </a>
            <span className="text-border">|</span>
            <a href="mailto:umbrellamovers@gmail.com" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Mail className="h-3 w-3" strokeWidth={1.5} /> umbrellamovers@gmail.com
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

