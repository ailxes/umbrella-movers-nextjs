import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Umbrella Movers LLC privacy policy. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-8">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: March 5, 2026</p>
          <div className="prose prose-gray max-w-none space-y-6 text-foreground/80 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">1. Information We Collect</h2>
              <p>When you request a quote or contact us, we may collect the following information:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Name</li><li>Email address</li><li>Phone number</li><li>Zip code</li>
                <li>Move date and move size preferences</li>
                <li>Any additional details you provide about your move</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Provide you with moving quotes and estimates</li>
                <li>Communicate with you about your move</li>
                <li>Send SMS updates related to your moving services</li>
                <li>Improve our services and customer experience</li>
                <li>Respond to your inquiries and requests</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">3. SMS/Text Messaging</h2>
              <p>Umbrella Movers contacts customers and leads via SMS for: moving quote inquiries, booking confirmations, crew arrival notifications, and post-move review requests. Reply <strong>STOP</strong> to opt out or <strong>HELP</strong> for assistance.</p>
              <h3 className="text-base font-semibold text-primary mt-6 mb-2">Opt-Out / Cancellation</h3>
              <p>Text <strong>&quot;STOP&quot;</strong> to unsubscribe from SMS messages at any time.</p>
              <h3 className="text-base font-semibold text-primary mt-6 mb-2">Help / Support</h3>
              <p>Reply <strong>HELP</strong> or email <a href="mailto:umbrellamovers@gmail.com" className="text-accent hover:underline">umbrellamovers@gmail.com</a>.</p>
              <h3 className="text-base font-semibold text-primary mt-6 mb-2">Message &amp; Data Rates</h3>
              <p>Message and data rates may apply. Message frequency varies (up to 4–6 messages per move).</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">4. Information Sharing</h2>
              <p>We do not sell, trade, or rent your personal information to third parties.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">5. Data Security</h2>
              <p>We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">6. Cookies</h2>
              <p>Our website may use cookies to enhance your browsing experience. You can disable cookies through your browser settings.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">7. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-primary mt-8 mb-3">8. Contact Us</h2>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Phone: <a href="tel:7025332853" className="text-accent hover:underline">702-533-2853</a></li>
                <li>Email: <a href="mailto:info@umbrellamovers.com" className="text-accent hover:underline">info@umbrellamovers.com</a></li>
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
