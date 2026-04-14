"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Umbrella, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { servicesList } from "@/data/services";
import { locationPagesData } from "@/data/locationPages";

const areasList = Object.values(locationPagesData).slice(0, 8).map(loc => ({
  slug: loc.slug,
  name: loc.locationName
}));

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
      setIsMobileMenuOpen(false);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/98 backdrop-blur-md border-b border-border shadow-soft h-16"
          : "bg-background/80 backdrop-blur-sm h-20"
      }`}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <Umbrella className="h-5 w-5 md:h-6 md:w-6 text-foreground flex-shrink-0" />
            <div className="flex flex-col items-start">
              <span className="text-sm md:text-base font-serif font-semibold text-foreground whitespace-nowrap tracking-tight">Umbrella Movers</span>
              <span className="text-[9px] md:text-[10px] text-muted-foreground hidden sm:block tracking-widest uppercase">We've Got You Covered</span>
            </div>
            <img src="/assets/wbenc-badge.png" alt="WBENC Certified Woman-Owned Business" className="h-8 md:h-10 lg:h-11 ml-1 md:ml-2 flex-shrink-0" />
          </button>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <button onClick={() => scrollToSection("hero")} className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors px-3 py-2 tracking-wide">
                  Home
                </button>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <button onClick={() => scrollToSection("about")} className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors px-3 py-2 tracking-wide">
                  About
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-sm font-medium text-foreground/70 hover:text-foreground">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-5 bg-background border border-border rounded-sm shadow-lifted">
                    <div className="grid gap-2">
                      <a href="/services" className="block px-3 py-2 text-xs font-medium tracking-widest uppercase text-accent hover:text-accent-dark transition-colors">
                        View All Services →
                      </a>
                      <div className="border-t border-border my-1" />
                      <div className="grid grid-cols-2 gap-1">
                        {servicesList.map((service) => (
                          <NavigationMenuLink key={service.slug} asChild>
                            <a
                              href={`/services/${service.slug}`}
                              className="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted rounded-sm transition-colors"
                            >
                              {service.title}
                            </a>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-sm font-medium text-foreground/70 hover:text-foreground">
                  Service Areas
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[350px] p-5 bg-background border border-border rounded-sm shadow-lifted">
                    <div className="grid gap-2">
                      <a href="/locations" className="block px-3 py-2 text-xs font-medium tracking-widest uppercase text-accent hover:text-accent-dark transition-colors">
                        View All Locations →
                      </a>
                      <div className="border-t border-border my-1" />
                      <div className="grid grid-cols-2 gap-1">
                        {areasList.map((area) => (
                          <NavigationMenuLink key={area.slug} asChild>
                            <a
                              href={`/locations/${area.slug}`}
                              className="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted rounded-sm transition-colors"
                            >
                              {area.name}
                            </a>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <a href="/recent-moves" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors px-3 py-2 whitespace-nowrap tracking-wide">
                  Recent Moves
                </a>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button onClick={() => scrollToSection("testimonials")} className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors px-3 py-2 tracking-wide">
                  Testimonials
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <a href="/blog" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors px-3 py-2 tracking-wide">
                  Blog
                </a>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button onClick={() => scrollToSection("contact")} className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors px-3 py-2 tracking-wide">
                  Contact
                </button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Button onClick={() => scrollToSection("contact")} className="bg-accent hover:bg-accent-dark text-accent-foreground text-xs tracking-widest uppercase px-6 py-2 h-9 rounded-sm font-medium">
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-foreground/70 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border bg-background">
            <nav className="flex flex-col gap-1">
              <button onClick={() => scrollToSection("hero")} className="text-left py-3 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide">
                Home
              </button>
              <button onClick={() => scrollToSection("about")} className="text-left py-3 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide">
                About
              </button>
              
              <div>
                <button 
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full py-3 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide"
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 flex flex-col gap-0.5 mt-1 border-l border-border ml-2">
                    <a href="/services" className="py-2 text-xs tracking-widest uppercase text-accent font-medium">
                      View All Services →
                    </a>
                    {servicesList.map((service) => (
                      <a 
                        key={service.slug}
                        href={`/services/${service.slug}`} 
                        className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {service.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button 
                  onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
                  className="flex items-center justify-between w-full py-3 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide"
                >
                  Service Areas
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileAreasOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileAreasOpen && (
                  <div className="pl-4 flex flex-col gap-0.5 mt-1 border-l border-border ml-2">
                    <a href="/locations" className="py-2 text-xs tracking-widest uppercase text-accent font-medium">
                      View All Locations →
                    </a>
                    {areasList.map((area) => (
                      <a 
                        key={area.slug}
                        href={`/locations/${area.slug}`} 
                        className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {area.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="/recent-moves" className="text-left py-3 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide">
                Recent Moves
              </a>
              <button onClick={() => scrollToSection("testimonials")} className="text-left py-3 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide">
                Testimonials
              </button>
              <a href="/blog" className="text-left py-3 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide">
                Blog
              </a>
              <button onClick={() => scrollToSection("contact")} className="text-left py-3 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide">
                Contact
              </button>
              
              <div className="border-t border-border mt-4 pt-4 flex flex-col gap-3">
                <a href="tel:7025332853" className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Phone className="h-4 w-4" />
                  702-533-2853
                </a>
                <Button onClick={() => scrollToSection("contact")} className="bg-accent hover:bg-accent-dark text-accent-foreground w-full text-xs tracking-widest uppercase rounded-sm font-medium">
                  Get a Quote
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
