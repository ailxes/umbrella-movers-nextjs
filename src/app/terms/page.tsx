import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Umbrella Movers LLC terms and conditions for SMS messaging program. Learn about opt-in, opt-out, message frequency, and your rights.",
  alternates: { canonical: "/terms" },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-8">Terms &amp; Conditions</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: March 20, 2026</p>
          <div className="prose prose-gray max-w-none space-y-6 text-foreground/80 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">Umbrella Movers SMS Program</h2>
              <p>Umbrella Movers LLC offers an SMS messaging program for moving quotes, appointment reminders, and service notifications. By opting in, you agree to receive recurring automated text messages. Consent is not a condition of purchase.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">1. Program Description</h2>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Moving quote confirmations and follow-ups</li>
                <li>Appointment reminders and scheduling updates</li>
                <li>Service notifications and status updates</li>
                <li>Customer satisfaction surveys</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">2. Opt-Out / Cancellation</h2>
              <p>Text <strong>&quot;STOP&quot;</strong> to any message to unsubscribe. You will receive a confirmation SMS after opting out.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">3. Help / Support</h2>
              <p>Reply <strong>HELP</strong> for assistance, email <a href="mailto:umbrellamovers@gmail.com" className="text-accent hover:underline">umbrellamovers@gmail.com</a>, or call <a href="tel:7025332853" className="text-accent hover:underline">702-533-2853</a>.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">4. Carrier Liability</h2>
              <p>Carriers are not liable for delayed or undelivered messages.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">5. Message &amp; Data Rates</h2>
              <p>Message and data rates may apply. Message frequency varies. Contact your wireless provider with questions about your plan.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">6. Privacy</h2>
              <p>Please read our <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>. We do not sell, rent, or share your phone number with third parties for marketing purposes.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">7. Contact Us</h2>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Phone: <a href="tel:7025332853" className="text-accent hover:underline">702-533-2853</a></li>
                <li>Email: <a href="mailto:umbrellamovers@gmail.com" className="text-accent hover:underline">umbrellamovers@gmail.com</a></li>
              </ul>
            </section>
            <p className="mt-8 pt-6 border-t border-border text-muted-foreground">Umbrella Movers LLC &bull; Las Vegas, Nevada</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
