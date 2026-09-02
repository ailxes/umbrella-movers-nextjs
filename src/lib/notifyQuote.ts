import { supabase } from "@/integrations/supabase/client";

/**
 * Payload shared by every quote form. Only name, phone, and email are
 * required — the SMS route rejects a submission missing any of them.
 */
export interface QuoteNotificationPayload {
  name: string;
  phone: string;
  email: string;
  move_date?: string;
  move_size?: string;
  move_type?: string;
  zip_code?: string;
  destination_zip_code?: string;
  message?: string | null;
  honeypot?: string;
  [key: string]: unknown;
}

/**
 * Fires every notification channel for a new quote request: the customer
 * confirmation email, the internal notification email (sent by the
 * notify-quote-request edge function from info@mail.umbrellamovers.com),
 * and the SMS alert. (SmartMoving CRM is no longer used; leads are not sent
 * there. A second internal alert from hello@umbrella-movers.com via
 * /api/notify-quote-email was removed 2026-09-02 because it duplicated the
 * edge function's email.)
 *
 * EVERY quote form on the site must call this after inserting the lead —
 * do not invoke the channels individually. They used to be copy-pasted into
 * each form, and three of the five forms silently missed the SMS call as a
 * result, so homepage-contact, /welcome, and realtor-referral leads arrived
 * with no text.
 *
 * Fire-and-forget by design: a failing notification must never block the
 * submit or show the customer an error, since the lead is already saved.
 */
export function notifyQuoteRequest(payload: QuoteNotificationPayload): void {
  supabase.functions
    .invoke("send-quote-email", { body: payload })
    .then(({ error }) => {
      if (error) console.error("[quote] email notification failed:", error);
    });

  supabase.functions
    .invoke("notify-quote-request", { body: payload })
    .then(({ error }) => {
      if (error) console.error("[quote] internal notification failed:", error);
    });

  fetch("/api/notify-quote-sms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((error) => console.error("[quote] SMS alert failed:", error));
}
