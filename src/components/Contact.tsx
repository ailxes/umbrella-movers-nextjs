"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone, Shield, CheckCircle2, Loader2, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFadeIn } from "@/hooks/use-fade-in";

const MOVE_SIZE_OPTIONS = [
  "Custom House", "Commercial/Retail", "Warehouse", "Room or Less",
  "Studio Apartment", "1 Bedroom Apartment", "2 Bedroom Apartment", "3 Bedroom Apartment",
  "1 Bedroom House", "1 Bedroom House (Large)", "2 Bedroom House", "2 Bedroom House (Large)",
  "3 Bedroom House", "3 Bedroom House (Large)", "4 Bedroom House", "4 Bedroom House (Large)",
  "5 Bedroom House", "5 Bedroom House (Large)", "5 x 10 Storage Unit", "5 x 15 Storage Unit",
  "10 x 10 Storage Unit", "10 x 15 Storage Unit", "10 x 20 Storage Unit",
];

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone must be less than 20 characters").regex(/^[0-9()\s\-+.]+$/, "Please enter a valid phone number (digits, spaces, dashes, and parentheses only)"),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  move_date: z.string().max(50, "Date must be less than 50 characters").optional(),
  move_size: z.string().max(100, "Move size must be less than 100 characters").optional(),
  message: z.string().max(2000, "Message must be less than 2000 characters").optional(),
});

const Contact = () => {
  const { toast } = useToast();
  const fadeRef = useFadeIn();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", phone: "", email: "", moveSize: "", moveDate: "", message: "", honeypot: "", smsOptIn: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    const validationResult = quoteSchema.safeParse({
      name: formData.firstName, phone: formData.phone, email: formData.email,
      move_date: formData.moveDate, move_size: formData.moveSize, message: formData.message,
    });

    if (!validationResult.success) {
      toast({ title: "Validation Error", description: validationResult.error.issues[0]?.message, variant: "destructive" });
      return;
    }

    const validatedData = validationResult.data;
    setIsSubmitting(true);

    try {
      const messageWithMoveSize = validatedData.move_size 
        ? `Move Size: ${validatedData.move_size}\n\n${validatedData.message || ""}`
        : validatedData.message || null;

      const { error } = await supabase.from("quote_requests").insert({
        name: validatedData.name, phone: validatedData.phone, email: validatedData.email,
        move_date: validatedData.move_date || null, message: messageWithMoveSize,
      });

      if (error) throw error;

      const backendPayload = { ...validatedData, honeypot: formData.honeypot };
      supabase.functions.invoke("send-quote-email", { body: backendPayload }).then(({ error: emailError }) => { if (emailError) console.error("Email notification error:", emailError); });
      supabase.functions.invoke("notify-quote-request", { body: backendPayload }).then(({ error: notifyError }) => { if (notifyError) console.error("Zapier notification error:", notifyError); });
      supabase.functions.invoke("send-smartmoving-lead", { body: backendPayload }).then(({ error: smError }) => { if (smError) console.error("SmartMoving CRM error:", smError); });

      setIsSubmitted(true);
      toast({ title: "Request received!", description: "Check your email for a confirmation." });
      setFormData({ firstName: "", phone: "", email: "", moveSize: "", moveDate: "", message: "", honeypot: "", smsOptIn: false });
    } catch (error) {
      console.error("Error submitting quote request:", error);
      toast({ title: "Error", description: "Failed to submit quote request. Please try again or call us directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 fade-in-section" ref={fadeRef as React.RefObject<HTMLDivElement>}>
        <div className="text-center mb-16">
          <p className="editorial-subheading text-accent mb-4">Contact Us</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-5">
            Get Your Fast & Free Moving Quote
          </h2>
          <div className="editorial-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground font-light">
            No Hidden Fees. No Surprises. Just Honest Pricing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card rounded-sm p-6 md:p-10 border border-border shadow-lifted">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-8 h-full min-h-[400px]">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 border border-green-200 mb-6">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-serif text-foreground mb-3">We Got Your Request!</h3>
                <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
                  Thanks for reaching out. A confirmation email is on its way to you, and our team will follow up within 4 business hours.
                </p>
                <div className="space-y-3 text-left w-full max-w-xs">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-accent shrink-0" />
                    Response within 4 business hours
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-accent shrink-0" />
                    Confirmation email sent to you
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-accent shrink-0" />
                    Need us sooner? <a href="tel:7025332853" className="text-foreground font-medium hover:text-accent transition-colors">702-533-2853</a>
                  </div>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                  Submit another request
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="honeypot" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-serif text-card-foreground">Get Your Free Quote</h3>
                <p className="text-muted-foreground text-sm mt-1">Fill out the form below and we'll get back to you</p>
              </div>

              <div>
                <label htmlFor="firstName" className="block text-xs font-medium mb-2 text-card-foreground tracking-wider uppercase">First Name *</label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required maxLength={100} className="w-full h-12 text-base border border-border rounded-sm" placeholder="Your first name" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-medium mb-2 text-card-foreground tracking-wider uppercase">Phone Number *</label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required maxLength={20} className="w-full h-12 text-base border border-border rounded-sm" placeholder="(702) 555-1234" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium mb-2 text-card-foreground tracking-wider uppercase">Email *</label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required maxLength={255} className="w-full h-12 text-base border border-border rounded-sm" placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="moveSize" className="block text-xs font-medium mb-2 text-card-foreground tracking-wider uppercase">Move Size</label>
                <Select value={formData.moveSize} onValueChange={(value) => setFormData(prev => ({ ...prev, moveSize: value }))}>
                  <SelectTrigger className="w-full h-12 text-base border border-border rounded-sm">
                    <SelectValue placeholder="– Choose Move Size –" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50 max-h-[300px]">
                    {MOVE_SIZE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="moveDate" className="block text-xs font-medium mb-2 text-card-foreground tracking-wider uppercase">Preferred Move Date</label>
                <Input id="moveDate" name="moveDate" type="date" value={formData.moveDate} onChange={handleChange} className="w-full h-12 text-base border border-border rounded-sm" />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium mb-2 text-card-foreground tracking-wider uppercase">Tell Us About Your Moving Needs</label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} maxLength={2000} className="w-full text-base border border-border rounded-sm" placeholder="Tell us about the size of your move, special items, distance, etc." />
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" name="smsOptIn" checked={formData.smsOptIn} onChange={(e) => setFormData(prev => ({ ...prev, smsOptIn: e.target.checked }))} className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary" />
                <span className="text-xs leading-tight text-muted-foreground">
                  I agree to receive SMS updates from Umbrella Enterprises LLC. Msg &amp; data rates may apply. Msg frequency varies. Reply HELP for help; STOP to unsubscribe.{" "}
                  <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
                </span>
              </label>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent-dark text-accent-foreground text-sm tracking-widest uppercase py-6 h-auto disabled:opacity-50 disabled:cursor-not-allowed rounded-sm font-medium">
                {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>) : ("Get My Free Quote")}
              </Button>

              <div className="flex flex-wrap justify-center gap-5 pt-5 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground tracking-wide">
                  <Shield className="h-3.5 w-3.5 text-accent" />
                  Fully Insured
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground tracking-wide">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                  Licensed
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground tracking-wide">
                  <span className="text-accent">★★★★★</span>
                  4.9/5 Rating
                </div>
              </div>
            </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-card rounded-sm p-8 border border-border">
              <h3 className="text-2xl font-serif text-card-foreground mb-8">Contact Us Directly</h3>

              <div className="space-y-6">
                <a href="tel:7025332853" className="flex items-start gap-4 p-4 rounded-sm hover:bg-muted transition-colors group">
                  <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">Phone</p>
                    <p className="text-lg font-medium text-foreground">702-533-2853</p>
                  </div>
                </a>

                <a href="mailto:umbrellamovers@gmail.com" className="flex items-start gap-4 p-4 rounded-sm hover:bg-muted transition-colors group">
                  <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">Email</p>
                    <p className="text-base text-foreground">umbrellamovers@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4">
                  <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">Address</p>
                    <p className="text-foreground leading-relaxed">
                      3111 So. Valley View Blvd.<br />Suite E-109<br />Las Vegas, NV 89102
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-sm border border-border overflow-hidden">
              <iframe
                title="Umbrella Movers Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.8357956786847!2d-115.20014242348393!3d36.12448997248698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c6bfeef1c0e9%3A0x8d3c4f0b0f0c8d4a!2s3111%20S%20Valley%20View%20Blvd%20%23%20E-109%2C%20Las%20Vegas%2C%20NV%2089102!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
