"use client";
import { Button } from "@/components/ui/button";


const BlogHero = () => {
  const scrollToContact = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.location.href = "/#contact";
    }, 500);
  };

  return (
    <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/assets/blog-hero.jpg)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/70 to-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
          READ OUR BLOG
        </h1>
        <Button 
          onClick={scrollToContact}
          size="lg"
          className="bg-accent hover:bg-accent-dark text-accent-foreground font-bold text-lg px-8 py-6 rounded-full shadow-strong transition-all hover:scale-105"
        >
          Get Quote!
        </Button>
      </div>
    </section>
  );
};

export default BlogHero;
