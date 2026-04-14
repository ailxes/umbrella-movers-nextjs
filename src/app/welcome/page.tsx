"use client";
import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Shield, Star, Users, CheckCircle2, Clock, Phone, Mail, Gift } from "lucide-react";
import { z } from "zod";
import VegasMovingKit from "@/components/VegasMovingKit";

const vipSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(10).max(20).regex(/^[0-9()\s\-+.]+$/),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  moveFrom: z.string().trim().max(200).optional().or(z.literal("")),
  moveTo: z.string().trim().max(200).optional().or(z.literal("")),
});

function WelcomeContent() {
  const searchParams = useSearchParams();
  const rawRealtor = searchParams.get("realtor");
  const realtorName = rawRealtor ? rawRealtor.replace(/-/g, " ") : null;
  const displayName = realtorName || "a Preferred Partner";

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", moveFrom: "", moveTo: "", honeypot: "", smsOptIn: false });

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
    const message = `VIP Referral from ${displayName} | From: ${v.moveFrom} | To: ${v.moveTo}`;
    const email = v.email || "not-provided@vip.umbrellamovers.com";
    try {
      const { error } = await supabase.from("quote_requests").insert({ name: v.name, phone: v.phone, email, message });
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
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-6 text-center border-b border-border">
        <span className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">☂️ Umbrella Movers</span>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-xl mx-auto">
          <div className="text-center mb-10">
            <p className="editorial-subheading text-accent mb-3">⭐ Exclusive VIP Offer ⭐</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              A Special Moving Gift from <span className="text-accent">{displayName}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              As a client of <span className="font-semibold text-foreground">{displayName}</span>, you have unlocked a VIP Moving Credit.
            </p>
          </div>
          <div className="bg-foreground -mx-4 px-4 py-5 mb-10">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {[{ icon: Shield, label: "Licensed & Insured" }, { icon: Star, label: "300+ 5-Star Reviews" }, { icon: Users, label: "Woman-Owned" }].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-background rounded-full px-4 py-2 shadow-sm">
                  <Icon className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-accent/5 border-l-4 border-accent rounded-r-2xl p-6 md:p-8 mb-10">
            <h2 className="flex items-center gap-2 text-lg md:text-xl font-bold text-foreground mb-5">
              <Gift className="h-5 w-5 text-accent" /> Your VIP Perks
            </h2>
            <div className="space-y-4">
              {[
                { title: "Up to $250 Off Your Move", desc: `Save up to $250 on your moving costs.` },
                { title: "Free Basic Packing Supply Bundle", desc: "Helpful moving supplies that make moving day stress-free." },
                { title: "VIP Scheduling Access", desc: "Priority scheduling options unlocked." },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!isSubmitted ? (
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-medium">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                  <Input name="name" placeholder="Jane Smith" value={formData.name} onChange={handleChange} required maxLength={100} className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
                  <Input type="tel" name="phone" placeholder="(702) 555-1234" value={formData.phone} onChange={handleChange} required maxLength={20} className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <Input type="email" name="email" placeholder="jane@email.com" value={formData.email} onChange={handleChange} maxLength={255} className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Moving From</label>
                  <Input name="moveFrom" placeholder="Current address" value={formData.moveFrom} onChange={handleChange} maxLength={200} className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Moving To</label>
                  <Input name="moveTo" placeholder="New address" value={formData.moveTo} onChange={handleChange} maxLength={200} className="h-12" />
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" name="smsOptIn" checked={formData.smsOptIn} onChange={(e) => setFormData(prev => ({ ...prev, smsOptIn: e.target.checked }))} className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary" />
                  <span className="text-xs leading-tight text-muted-foreground">
                    I agree to receive SMS updates from Umbrella Enterprises LLC. Msg &amp; data rates may apply. Reply STOP to unsubscribe.{" "}
                    <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
                  </span>
                </label>
                <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-accent hover:bg-accent-dark text-accent-foreground font-semibold text-lg mt-2">
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : "Claim My VIP Discount"}
                </Button>
              </form>
            </div>
          ) : (
            <div ref={successRef} className="bg-card rounded-2xl border border-border p-8 md:p-10 text-center shadow-medium">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                <CheckCircle2 className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">You&apos;re All Set!</h2>
              <p className="text-muted-foreground mb-8">Our team will reach out within 4 business hours.</p>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">Need to reach us sooner?</p>
                <a href="tel:7025332853" className="text-lg font-semibold text-foreground hover:text-accent transition-colors">(702) 533-2853</a>
              </div>
            </div>
          )}
          <VegasMovingKit />
        </div>
      </main>
      <footer className="py-8 text-center border-t border-border">
        <p className="text-sm text-muted-foreground mb-2">☂️ Umbrella Movers is a Proudly Local, Woman-Owned Las Vegas Business.</p>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <a href="tel:7025332853" className="flex items-center gap-1 hover:text-foreground transition-colors"><Phone className="h-3.5 w-3.5" /> (702) 533-2853</a>
          <span>·</span>
          <a href="mailto:umbrellamovers@gmail.com" className="flex items-center gap-1 hover:text-foreground transition-colors"><Mail className="h-3.5 w-3.5" /> umbrellamovers@gmail.com</a>
        </div>
      </footer>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <WelcomeContent />
    </Suspense>
  );
}
