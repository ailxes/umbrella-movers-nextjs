"use client";
import { Umbrella, ExternalLink } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const handleQuickLink = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <footer className="bg-foreground text-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Umbrella className="h-6 w-6 text-accent" />
              <div>
                <p className="font-serif text-lg">Umbrella Movers, LLC</p>
                <p className="text-[10px] text-background/50 tracking-widest uppercase">We've Got You Covered</p>
              </div>
            </div>
            <p className="text-sm text-background/60 mb-6 leading-relaxed">
              The Las Vegas moving company that has you covered.
            </p>
            <div className="space-y-1.5 text-sm text-background/50">
              <p>3111 So. Valley View Blvd.</p>
              <p>Suite E-109</p>
              <p>Las Vegas, NV 89102</p>
              <p className="mt-4">
                <span className="text-background/70">Tel:</span>{" "}
                <a href="tel:7025332853" className="text-background/80 hover:text-accent transition-colors">702-533-2853</a>
              </p>
              <p>
                <span className="text-background/70">Email:</span>{" "}
                <a href="mailto:umbrellamovers@gmail.com" className="text-background/80 hover:text-accent transition-colors">
                  umbrellamovers@gmail.com
                </a>
              </p>
              <div className="mt-4 space-y-1 text-background/60">
                <p><span className="text-background/70">License:</span> CPCN 3364</p>
                <p><span className="text-background/70">US DOT:</span> 2474617</p>
                <p><span className="text-background/70">MC:</span> 1198694</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-background/40 mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", id: "hero" },
                { label: "About", id: "about" },
                { label: "Services", id: "services" },
                { label: "Testimonials", id: "testimonials" },
                { label: "Contact", id: "contact" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleQuickLink(link.id)}
                    className="text-background/60 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Certifications */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-background/40 mb-6">Connect With Us</h3>
            <div className="flex gap-3 mb-8">
              {[
                { href: "https://www.facebook.com/umbrellamovers", label: "Facebook" },
                { href: "https://www.instagram.com/umbrellamovers", label: "Instagram" },
                { href: "https://www.yelp.com/biz/umbrella-movers-las-vegas", label: "Yelp" },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="border border-background/10 hover:border-accent/40 p-2.5 rounded-sm transition-colors">
                  <ExternalLink className="h-4 w-4 text-background/60" />
                </a>
              ))}
            </div>
            <div className="border border-background/10 rounded-sm p-5 text-center">
              <p className="font-serif text-accent text-lg mb-1">WBENC</p>
              <p className="text-[10px] text-background/50 tracking-widest uppercase">Certified Woman-Owned Business</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 text-center text-xs text-background/40 tracking-wider space-y-3">
          <div className="flex justify-center gap-6">
            <a href="/privacy" className="text-background/60 hover:text-accent transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-background/60 hover:text-accent transition-colors">Terms of Service</a>
          </div>
          <p>© Copyright 2024 Umbrella Movers, LLC. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
