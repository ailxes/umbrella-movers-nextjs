"use client";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, Star, Users, CheckCircle2, Gift, Phone, Mail, Handshake } from "lucide-react";
import { z } from "zod";

// Submissions are saved + emailed server-side via /api/realtor-signup.

const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
});

export default function RealtorPartnersPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", honeypot: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      toast({ title: "Please check your info", description: result.error.issues[0]?.message, variant: "destructive" });
      return;
    }

    if (formData.honeypot.trim() !== "") return;

    setIsSubmitting(true);
    const { name, email } = result.data;

    try {
      const res = await fetch("/api/realtor-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, honeypot: formData.honeypot }),
      });
      if (!res.ok) throw new Error("Request failed");

      setIsSubmitted(true);
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please call us at (702) 533-2853.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal header */}
      <header className="py-8 md:py-10 text-center">
        <span className="text-2xl md:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
          ☂️ Umbrella Movers
        </span>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 md:px-6">
        <div className="w-full max-w-2xl mx-auto">

          {/* Headline */}
          <section className="text-center pt-8 pb-16 md:pt-12 md:pb-24">
            <p className="editorial-subheading text-accent mb-6 md:mb-8">
              Realtor Referral Program
            </p>
            <div className="editorial-divider mx-auto mb-8 md:mb-10" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 md:mb-8">
              A Moving Partner Your Clients Will <span className="text-accent">Thank You</span> For
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Give your buyers and sellers a trusted, woman-owned Las Vegas moving team — and an exclusive client discount — with nothing for you to coordinate.
            </p>
          </section>

          {/* Trust indicators */}
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

          {/* What partners get */}
          <section className="py-14 md:py-20 border-t border-border/50">
            <div className="flex items-center gap-3 mb-10 md:mb-14">
              <Gift className="h-4 w-4 text-accent/80" strokeWidth={1.5} />
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                How the Partnership Works
              </h2>
            </div>

            <div className="space-y-0">
              {[
                {
                  title: "Up to $250 Off for Your Clients",
                  desc: "Your buyers and sellers receive an exclusive moving credit — a closing gift that costs you nothing.",
                },
                {
                  title: "The Las Vegas Client Moving Kit",
                  desc: "A thoughtful checklist and move-day guide you can forward the moment the keys change hands.",
                },
                {
                  title: "Nothing for You to Coordinate",
                  desc: "Make the introduction and we handle every detail directly with your client — start to finish, same crew, no subcontractors.",
                },
                {
                  title: "Preferred Partner Status",
                  desc: "Fifteen-plus years in Las Vegas, fully licensed and insured, and the same care we'd give a member of our own family.",
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

          {/* Form or success */}
          <section className="py-14 md:py-20 border-t border-border/50">
            {!isSubmitted ? (
              <div>
                <p className="editorial-subheading text-accent mb-4">Become a Partner</p>
                <div className="editorial-divider mb-10 md:mb-14" />
                <p className="text-sm md:text-base text-muted-foreground mb-8 leading-relaxed">
                  Leave your name and email and Shene will personally reach out with your partner details and a copy of the Client Moving Kit.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                  </div>

                  <div>
                    <label className="block text-xs tracking-[0.1em] uppercase font-medium text-muted-foreground mb-2.5">Full Name *</label>
                    <Input name="name" placeholder="Jane Smith" value={formData.name} onChange={handleChange} required maxLength={100} className="h-12 rounded-none border-border/60 bg-transparent focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.1em] uppercase font-medium text-muted-foreground mb-2.5">Email *</label>
                    <Input type="email" name="email" placeholder="jane@email.com" value={formData.email} onChange={handleChange} required maxLength={255} className="h-12 rounded-none border-border/60 bg-transparent focus:border-accent transition-colors" />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-accent hover:bg-accent-dark text-accent-foreground rounded-none text-[11px] uppercase tracking-[0.3em] font-semibold transition-all"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                      ) : (
                        "B E C O M E   ·   A   ·   P A R T N E R"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div ref={successRef} className="text-center py-8 md:py-12">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-accent/30 mb-8">
                  <Handshake className="h-6 w-6 text-accent" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Thank You</h2>
                <p className="text-muted-foreground mb-12 max-w-sm mx-auto leading-relaxed">
                  Your request has been received. Shene will reach out personally with your partner details and the Client Moving Kit.
                </p>
                <div className="pt-8 border-t border-border/30">
                  <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">Prefer to talk now?</p>
                  <a href="tel:7025332853" className="text-lg font-semibold text-foreground hover:text-accent transition-colors">
                    (702) 533-2853
                  </a>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
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
  );
}
