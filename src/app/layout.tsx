import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.umbrellamovers.com"),
  title: {
    default: "Licensed Las Vegas Movers | Woman-Owned | Umbrella Movers",
    template: "%s | Umbrella Movers",
  },
  description: "Umbrella Movers is Las Vegas' highest-rated woman-owned moving company. CPCN 3364, US DOT 2474617. Licensed, insured, 300+ 5-star reviews.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Umbrella Movers",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
