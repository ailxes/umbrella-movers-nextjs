"use client";
import { Button } from "@/components/ui/button";
import { Phone, Star, Shield } from "lucide-react";

import HeroQuoteForm from "@/components/HeroQuoteForm";

const Hero = () => {
  return (
    <section id="hero" className="relative">
      {/* Mobile Layout */}
      <div className="lg:hidden relative">
        <div className="relative">
          <div className="absolute inset-0 z-0">
            <img src="/assets/hero-trucks.jpg" alt="Professional Umbrella Movers team loading furniture into a moving truck" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          </div>

          <div className="relative z-10 px-6 pt-24 pb-10">
            <p className="editorial-subheading text-white/70 mb-4">Las Vegas' Premier Moving Company</p>
            
            <h1 className="text-3xl sm:text-4xl font-serif font-semibold mb-5 leading-tight text-white">
              Las Vegas' Highest-Rated
              <br />
              <span className="text-accent italic">Woman-Owned</span> Moving Company
            </h1>

            <div className="editorial-divider mb-6"></div>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-sm">
                <Star className="h-4 w-4 text-accent fill-accent" />
                <span className="text-white text-xs tracking-wide">300+ 5-Star Reviews</span>
              </div>
              <div className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-sm">
                <span className="text-white text-xs tracking-wide">15+ Years Trusted</span>
              </div>
            </div>

            <a href="tel:7025332853" className="inline-flex items-center gap-2 border border-white/30 text-white px-5 py-2.5 rounded-sm text-xs tracking-widest uppercase hover:bg-white/10 transition-colors">
              <Phone className="h-3.5 w-3.5" />
              702-533-2853
            </a>

            <div id="hero-form" className="mt-10 bg-[#F5F0E8]/90 backdrop-blur-sm rounded-none shadow-lifted p-6">
              <h2 className="text-lg font-serif font-semibold text-foreground mb-1">Get a Quote <span className="text-accent italic">Now</span></h2>
              <div className="editorial-divider mb-4"></div>
              <HeroQuoteForm compact />
            </div>
          </div>
        </div>

        <div className="bg-foreground py-3">
          <div className="px-4">
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[10px] tracking-widest uppercase text-background/80">
              <div className="flex items-center gap-2">
                <span className="text-accent">✦</span>
                <span>Woman-Owned</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✦</span>
                <span>Licensed & Insured</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block relative h-[calc(100vh-80px)] min-h-[700px] max-h-[900px]">
        <div className="absolute inset-0 z-0">
          <img src="/assets/hero-trucks.jpg" alt="Professional Umbrella Movers team loading furniture into a moving truck" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center gap-16 xl:gap-24 h-full px-8 xl:px-16 pt-28 pb-20">
          <div className="text-left max-w-xl">
            <p className="editorial-subheading text-white/60 mb-5">Las Vegas' Premier Moving Company</p>
            
            <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-serif font-semibold leading-[1.1] text-white mb-6">
              Las Vegas' Highest Rated
              <br />
              <span className="text-accent italic">Woman-Owned</span>
              <br />
              Moving Company
            </h1>

            <div className="editorial-divider mb-8"></div>

            <div className="flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 rounded-sm">
                <Star className="h-4 w-4 text-accent fill-accent" />
                <span className="text-white text-sm tracking-wide">Backed by 300+ 5-Star Reviews</span>
              </div>
              <div className="inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 rounded-sm">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-white text-sm tracking-wide">15+ Years Trusted</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F0E8]/90 backdrop-blur-sm rounded-none shadow-lifted p-6 w-full max-w-sm mt-12">
            <h2 className="text-lg font-serif font-semibold text-foreground mb-1 text-center">Get a Quote <span className="text-accent italic">Now</span></h2>
            <div className="editorial-divider mx-auto mb-4"></div>
            <HeroQuoteForm compact />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-foreground/95 backdrop-blur-sm py-3">
          <div className="flex justify-start items-center gap-8 text-[10px] tracking-widest uppercase text-background/70 px-8 xl:px-16">
            <div className="flex items-center gap-2">
              <span className="text-accent">✦</span>
              <span>Woman-Owned (WBENC)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">✦</span>
              <span>Fully Licensed & Insured</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
