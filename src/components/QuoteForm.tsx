"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

// Input validation schema with stricter rules
const quoteSchema = z.object({
  name: z.string().trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  phone: z.string().trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone must be less than 20 characters")
    .regex(/^[0-9()\s\-+.]+$/, "Please enter a valid phone number"),
  email: z.string().trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  move_date: z.string().max(50, "Date must be less than 50 characters").optional(),
  move_size: z.string().max(100, "Move size must be less than 100 characters").optional(),
  message: z.string().max(2000, "Message must be less than 2000 characters").optional(),
  zip_code: z.string().max(10, "Zip code must be less than 10 characters").regex(/^[0-9\-]*$/, "Please enter a valid zip code").optional().or(z.literal("")),
});

interface QuoteFormProps {
  variant?: "default" | "compact" | "sidebar" | "hero";
  title?: string;
  className?: string;
}

const QuoteForm = ({ variant = "default", title = "Get Quote", className = "" }: QuoteFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    moveDate: "",
    moveSize: "",
    zipCode: "",
    message: "",
    honeypot: "",
    smsOptIn: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // Validate input
    const validationResult = quoteSchema.safeParse({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      move_date: formData.moveDate,
      move_size: formData.moveSize,
      zip_code: formData.zipCode,
      message: formData.message,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    const validatedData = validationResult.data;
    setIsSubmitting(true);

    try {
      // Include move_size and zip_code in message since we don't have dedicated columns
      const extraInfo = [
        validatedData.move_size ? `Move Size: ${validatedData.move_size}` : null,
        validatedData.zip_code ? `Zip Code: ${validatedData.zip_code}` : null,
      ].filter(Boolean).join("\n");
      const messageWithExtras = extraInfo
        ? `${extraInfo}\n\n${validatedData.message || ""}`
        : validatedData.message || null;

      const { error } = await supabase.from("quote_requests").insert({
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email,
        move_date: validatedData.move_date || null,
        message: messageWithExtras,
      });

      if (error) throw error;

      const backendPayload = {
        ...validatedData,
        honeypot: formData.honeypot,
      };

      // Send email notification in the background
      supabase.functions
        .invoke("send-quote-email", {
          body: backendPayload,
        })
        .then(({ error: emailError }) => {
          if (emailError) {
            console.error("Email notification error:", emailError);
          }
        });

      // Trigger Zapier notification in the background
      supabase.functions
        .invoke("notify-quote-request", {
          body: backendPayload,
        })
        .then(({ error: notifyError }) => {
          if (notifyError) {
            console.error("Zapier notification error:", notifyError);
          }
        });

      // Send lead to SmartMoving CRM in the background
      supabase.functions
        .invoke("send-smartmoving-lead", {
          body: backendPayload,
        })
        .then(({ error: smError }) => {
          if (smError) {
            console.error("SmartMoving CRM error:", smError);
          }
        });


      toast({
        title: "You're all set — we got your request.",
      });
      
      setFormData({
        name: "",
        phone: "",
        email: "",
        moveDate: "",
        moveSize: "",
        zipCode: "",
        message: "",
        honeypot: "",
        smsOptIn: false,
      });
    } catch (error) {
      console.error("Error submitting quote request:", error);
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isCompact = variant === "compact" || variant === "sidebar" || variant === "hero";
  const isHero = variant === "hero";
  const inputHeight = isCompact ? "h-10" : "h-12";
  const spacing = isHero ? "space-y-2" : isCompact ? "space-y-3" : "space-y-4";

  return (
    <div className={`bg-primary rounded-lg ${isHero ? "p-4" : "p-6"} ${variant === "default" ? "md:p-8" : ""} ${className}`}>
      <h2 className={`font-bold text-primary-foreground text-center ${isHero ? "mb-3 text-lg" : isCompact ? "mb-4 text-xl" : "mb-6 text-2xl"}`}>
        {title}
      </h2>
      <form className={spacing} onSubmit={handleSubmit}>
        {/* Honeypot field */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Input 
          name="name"
          placeholder="Full Name *" 
          value={formData.name}
          onChange={handleChange}
          required
          maxLength={100}
          className={`bg-white border-0 ${inputHeight} text-foreground`}
        />
        <Input 
          type="email"
          name="email"
          placeholder="Email Address *" 
          value={formData.email}
          onChange={handleChange}
          required
          maxLength={255}
          className={`bg-white border-0 ${inputHeight} text-foreground`}
        />
        <Input 
          type="tel"
          name="phone"
          placeholder="Phone Number *" 
          value={formData.phone}
          onChange={handleChange}
          required
          maxLength={20}
          className={`bg-white border-0 ${inputHeight} text-foreground`}
        />
        <Input 
          name="zipCode"
          placeholder="Zip Code" 
          value={formData.zipCode}
          onChange={handleChange}
          maxLength={10}
          className={`bg-white border-0 ${inputHeight} text-foreground`}
        />
        {!isHero && (
          <div className="relative">
            <label className="block text-sm font-medium text-primary-foreground mb-1">Move Size</label>
            <Select
              value={formData.moveSize}
              onValueChange={(value) => setFormData(prev => ({ ...prev, moveSize: value }))}
            >
              <SelectTrigger className={`bg-white border-0 ${inputHeight} text-foreground`}>
                <SelectValue placeholder="– Choose Move Size –" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50 max-h-[300px]">
                {MOVE_SIZE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {!isHero && (
          <div className="relative">
            <label className="block text-sm font-medium text-primary-foreground mb-1">Move Date</label>
            <Input 
              type="date"
              name="moveDate"
              value={formData.moveDate}
              onChange={handleChange}
              className={`bg-white border-0 ${inputHeight} text-foreground`}
            />
          </div>
        )}
        {!isCompact && (
          <Textarea
            name="message"
            placeholder="Tell us about your move (optional)"
            value={formData.message}
            onChange={handleChange}
            maxLength={2000}
            className="bg-white border-0 text-foreground min-h-[80px]"
          />
        )}
        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" name="smsOptIn" checked={formData.smsOptIn} onChange={(e) => setFormData(prev => ({ ...prev, smsOptIn: e.target.checked }))} className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary" />
          <span className="text-xs leading-tight text-primary-foreground/60">
            I agree to receive SMS updates from Umbrella Enterprises LLC. Msg &amp; data rates may apply. Msg frequency varies. Reply HELP for help; STOP to unsubscribe.{" "}
            <a href="/privacy" className="underline hover:text-primary-foreground/80">Privacy Policy</a>.
          </span>
        </label>
        <Button 
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${inputHeight} bg-accent hover:bg-accent-dark text-accent-foreground font-semibold ${isCompact ? "" : "text-lg"}`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Get Free Quote"
          )}
        </Button>
      </form>
    </div>
  );
};

export default QuoteForm;
