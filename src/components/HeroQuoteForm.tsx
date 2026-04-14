"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MOVE_SIZE_OPTIONS = [
  "Custom House",
  "Commercial/Retail",
  "Warehouse",
  "Room or Less",
  "Studio Apartment",
  "1 Bedroom Apartment",
  "2 Bedroom Apartment",
  "3 Bedroom Apartment",
  "1 Bedroom House",
  "1 Bedroom House (Large)",
  "2 Bedroom House",
  "2 Bedroom House (Large)",
  "3 Bedroom House",
  "3 Bedroom House (Large)",
  "4 Bedroom House",
  "4 Bedroom House (Large)",
  "5 Bedroom House",
  "5 Bedroom House (Large)",
  "5 x 10 Storage Unit",
  "5 x 15 Storage Unit",
  "10 x 10 Storage Unit",
  "10 x 15 Storage Unit",
  "10 x 20 Storage Unit",
];

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().min(10, "Phone must be at least 10 digits").max(20).regex(/^[0-9()\s\-+.]+$/, "Please enter a valid phone number"),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email").max(255),
  move_date: z.string().optional(),
  move_type: z.string().optional(),
  zip_code: z.string().max(10, "Zip code must be less than 10 characters").regex(/^[0-9\-]*$/, "Please enter a valid zip code").optional().or(z.literal("")),
});

interface HeroQuoteFormProps {
  compact?: boolean;
}

const HeroQuoteForm = ({ compact = false }: HeroQuoteFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    moveDate: "",
    moveType: "",
    zipCode: "",
    honeypot: "",
    smsOptIn: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationResult = quoteSchema.safeParse({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      move_date: formData.moveDate,
      move_type: formData.moveType,
      zip_code: formData.zipCode,
    });

    if (!validationResult.success) {
      toast({
        title: "Validation Error",
        description: validationResult.error.issues[0]?.message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const extraInfo = [
        formData.moveType ? `Move Type: ${formData.moveType}` : null,
        formData.zipCode ? `Zip Code: ${formData.zipCode}` : null,
      ].filter(Boolean).join("\n");
      const messageContent = extraInfo || null;

      const { error } = await supabase.from("quote_requests").insert({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        move_date: formData.moveDate || null,
        message: messageContent,
      });

      if (error) throw error;

      const backendPayload = {
        ...validationResult.data,
        honeypot: formData.honeypot,
      };

      supabase.functions.invoke("send-quote-email", { body: backendPayload });
      supabase.functions.invoke("notify-quote-request", { body: backendPayload });
      supabase.functions.invoke("send-smartmoving-lead", { body: backendPayload });

      toast({
        title: "You're all set — we got your request.",
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        moveDate: "",
        moveType: "",
        zipCode: "",
        honeypot: "",
        smsOptIn: false,
      });
    } catch (error) {
      console.error("Error submitting quote request:", error);
      toast({
        title: "Error",
        description: "Failed to submit. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
        </div>
        
        {/* Move Date */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider font-sans">
            Estimated Move Date <span className="text-accent">*</span>
          </label>
          <Input
            type="date"
            name="moveDate"
            value={formData.moveDate}
            onChange={handleChange}
            className="h-11 border-border w-full min-w-0 box-border"
          />
        </div>

        {/* Move Size */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider font-sans">
            Move Size <span className="text-accent">*</span>
          </label>
          <Select value={formData.moveType} onValueChange={(value) => setFormData((prev) => ({ ...prev, moveType: value }))}>
            <SelectTrigger className="h-11 border-border">
              <SelectValue placeholder="– Choose Move Size –" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50 max-h-[300px]">
              {MOVE_SIZE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider font-sans">
            Name <span className="text-accent">*</span>
          </label>
          <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="h-11 border-border" />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider font-sans">
            Phone <span className="text-accent">*</span>
          </label>
          <Input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="h-11 border-border" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider font-sans">
            Email <span className="text-accent">*</span>
          </label>
          <Input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="h-11 border-border" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider font-sans">
            Zip Code
          </label>
          <Input name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} maxLength={10} className="h-11 border-border" />
        </div>

        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" name="smsOptIn" checked={formData.smsOptIn} onChange={(e) => setFormData(prev => ({ ...prev, smsOptIn: e.target.checked }))} className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary" />
          <span className="text-xs leading-tight text-muted-foreground">
            I agree to receive SMS updates from Umbrella Enterprises LLC. Msg &amp; data rates may apply. Msg frequency varies. Reply HELP for help; STOP to unsubscribe.{" "}
            <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
          </span>
        </label>
        <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-accent hover:bg-accent-dark text-accent-foreground font-sans font-medium text-[11px] uppercase tracking-[0.25em] rounded-none">
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : "G E T   ·   A   ·   Q U O T E"}
        </Button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl lg:text-2xl font-bold text-primary mb-1">
        Get A Free <span className="text-accent">Quick Quote</span>
      </h2>
      <div className="w-10 h-1 bg-accent mb-3"></div>
      <p className="text-sm text-muted-foreground mb-4">Fill out the form below for a quick quote.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
        </div>

        {/* Row 1: Date and Move Type */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider font-sans">
              Move Date <span className="text-accent">*</span>
            </label>
            <Input
              type="date"
              name="moveDate"
              value={formData.moveDate}
              onChange={handleChange}
              className="h-10 border-border text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider font-sans">
              Move Size <span className="text-accent">*</span>
            </label>
            <Select value={formData.moveType} onValueChange={(value) => setFormData((prev) => ({ ...prev, moveType: value }))}>
              <SelectTrigger className="h-10 border-border text-sm">
                <SelectValue placeholder="– Choose –" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50 max-h-[300px]">
                {MOVE_SIZE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2: Name and Phone */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider font-sans">
              Name <span className="text-accent">*</span>
            </label>
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="h-10 border-border text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider font-sans">
              Phone <span className="text-accent">*</span>
            </label>
            <Input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="h-10 border-border text-sm"
            />
          </div>
        </div>

        {/* Row 3: Email and Zip Code */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider font-sans">
              Email <span className="text-accent">*</span>
            </label>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-10 border-border text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider font-sans">
              Zip Code
            </label>
            <Input
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              maxLength={10}
              className="h-10 border-border text-sm"
            />
          </div>
        </div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" name="smsOptIn" checked={formData.smsOptIn} onChange={(e) => setFormData(prev => ({ ...prev, smsOptIn: e.target.checked }))} className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary" />
          <span className="text-xs leading-tight text-muted-foreground">
            I agree to receive SMS updates from Umbrella Enterprises LLC. Msg &amp; data rates may apply. Msg frequency varies. Reply HELP for help; STOP to unsubscribe.{" "}
            <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
          </span>
        </label>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-accent hover:bg-accent-dark text-accent-foreground font-sans font-medium text-[11px] uppercase tracking-[0.25em] rounded-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "G E T   ·   A   ·   Q U O T E"
          )}
        </Button>
      </form>
    </div>
  );
};

export default HeroQuoteForm;
