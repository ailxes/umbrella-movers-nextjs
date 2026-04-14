"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { 
  MapPin, 
  Shield, 
  CheckCircle, 
  ChevronRight, 
  Home, 
  Phone,
  Star,
  Clock,
  Users,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { generateBreadcrumbSchema, siteUrl, socialImage } from "@/lib/seo";
import type { LocationPageData } from "@/data/locationPages";

interface LocationPageTemplateProps {
  data: LocationPageData;
}

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

const scrollToContact = () => {
  window.location.href = "/#contact";
};

// Review Carousel Component
const ReviewCarousel = ({ 
  reviews, 
  locationName 
}: { 
  reviews: { text: string; author: string; date?: string }[];
  locationName: string;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: false,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {reviews.map((review, index) => (
          <CarouselItem key={index} className="basis-full">
            <Card className="bg-foreground border-none shadow-xl rounded-lg overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="text-4xl md:text-5xl font-serif text-background/80 leading-none mb-3">
                  "
                </div>
                <p className="text-background text-base md:text-lg leading-relaxed italic mb-6">
                  {review.text}
                </p>
                <div className="w-full h-px bg-background/30 mb-4" />
                <p className="text-background font-bold text-base">
                  {review.author}
                </p>
                <p className="text-background/60 text-sm mt-1">
                  Verified {locationName} Resident
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-sm transition-all duration-300 ${
              index === current 
                ? "bg-foreground w-6" 
                : "bg-foreground/40 hover:bg-foreground/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </Carousel>
  );
};

const LocationPageTemplate = ({ data }: LocationPageTemplateProps) => {
  // Calculate if gallery should be shown (needs at least 3 real images)
  const realGalleryImages = data.photoGallery?.filter(photo => photo.image) || [];
  const shouldShowGallery = realGalleryImages.length >= 3;
  
  // Uniqueness validation for development mode
  const hasUniqueLocalFriction = !!data.uniqueLocalFrictionSection;
  const hasSufficientMoveHighlights = data.moveHighlights.length >= 3 && data.moveHighlights.length <= 6;
  const hasSufficientNeighborhoods = data.neighborhoodsWithBehaviors.length >= 3 && 
    data.neighborhoodsWithBehaviors.every(n => n.behaviors.length >= 3);
  
  const missingFields: string[] = [];
  if (!hasUniqueLocalFriction) missingFields.push("uniqueLocalFrictionSection");
  if (!hasSufficientMoveHighlights) missingFields.push("moveHighlights (need 3-6 items)");
  if (!hasSufficientNeighborhoods) missingFields.push("neighborhoodsWithBehaviors (need 3+ neighborhoods with 3+ behaviors each)");

  // Generate structured data
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "name": `Umbrella Movers - ${data.locationName} Moving Services`,
    "description": `Professional white-glove moving services in ${data.locationName}, Nevada. Woman-owned, WBENC certified moving company with ${data.proofMovesCount}+ moves completed.`,
    "image": data.heroImage,
    "telephone": "702-533-2853",
    "email": "umbrellamovers@gmail.com",
    "url": `${siteUrl}/locations/${data.slug}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3111 So. Valley View Blvd. Suite E-109",
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "postalCode": "89102",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": data.coordinates.lat,
      "longitude": data.coordinates.lng
    },
    "areaServed": {
      "@type": "City",
      "name": `${data.locationName}, Nevada`
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "300"
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Service Areas", url: `${siteUrl}/locations` },
    { name: data.locationName, url: `${siteUrl}/locations/${data.slug}` }
  ]);

  const pageTitle = `${data.locationName} Moving Company | Licensed Movers Near You | Umbrella Movers`;
  const metaDescription = `#1 rated movers in ${data.locationName}, Las Vegas. Fully licensed (CPCN 3364), woman-owned, 300+ verified reviews. Local ${data.locationName} moving experts. Professional, affordable, trusted. Get your free quote!`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />

      {/* Development-only TODO Banner for missing uniqueness fields */}
      {isDevelopment && missingFields.length > 0 && (
        <div className="bg-amber-100 border-b-2 border-amber-400 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 text-amber-800">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <div className="text-sm">
                <strong>TODO:</strong> Missing required uniqueness fields for {data.locationName}: {missingFields.join(", ")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="bg-muted/50 py-3 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/locations">Service Areas</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{data.locationName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* A) Hero Section */}
      <section 
        className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${data.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6">
            {data.heroTitle}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 max-w-4xl mx-auto">
            {data.heroSubhead}
          </p>
          
          {/* Proof Line */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-6 md:mb-8">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-semibold">{data.proofMovesCount}+ Moves</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-semibold">{data.proofYears} Years Experience</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold">Woman-Owned (WBENC)</span>
            </div>
          </div>
          
          <Button 
            size="lg" 
            onClick={scrollToContact}
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
          >
            Get Your Free {data.locationName} Quote
          </Button>
        </div>
      </section>

      {/* Intro Paragraph */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Parent location notice for sub-areas (e.g., Anthem -> Henderson) */}
            {data.parentLocation && (
              <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border/50">
                <p className="text-muted-foreground text-sm md:text-base">
                  {data.parentLocation.description}{" "}
                  <Link 
                    href={`/locations/${data.parentLocation.slug}`}
                    className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                  >
                    View all {data.parentLocation.name} services
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </p>
              </div>
            )}
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {data.introParagraph}
            </p>
            {/* Intro Links for SEO */}
            {data.introLinks && data.introLinks.length > 0 && (
              <p className="text-muted-foreground mt-4 text-base md:text-lg">
                {data.introLinks.map((link, index) => (
                  <span key={index}>
                    {link.context}{" "}
                    <Link href={link.url} className="text-primary hover:underline font-medium">
                      {link.text}
                    </Link>
                    {index < data.introLinks!.length - 1 ? ". " : "."}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8 md:mb-12 text-center">
              The Umbrella Standard
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {data.umbrellaStandard.map((item, index) => (
                <Card key={index} className="bg-card border border-border/50 shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">{index + 1}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* C) Neighborhood Behaviors Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8 md:mb-12 text-center">
              Serving {data.locationName}'s Premier Neighborhoods
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {data.neighborhoodsWithBehaviors.map((neighborhood, index) => (
                <Card key={index} className="bg-card border border-border/50 shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-foreground">
                        {neighborhood.name}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {neighborhood.behaviors.map((behavior, bIndex) => (
                        <li key={bIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm md:text-base">
                            {behavior}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* D) Move Highlights Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8 md:mb-12 text-center">
              Recent {data.locationName} Move Highlights
            </h2>
            
            <div className="space-y-4">
              {data.moveHighlights.map((highlight, index) => (
                <Card key={index} className="bg-card border-l-4 border-l-primary border border-border/50 shadow-md">
                  <CardContent className="p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">
                          {highlight.neighborhood}
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Page CTA Block */}
      <section className="py-10 md:py-14 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Want a protection-first plan for your {data.locationName} move?
            </h2>
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg px-6 md:px-8"
            >
              Get a {data.locationName} Quote
            </Button>
          </div>
        </div>
      </section>

      {/* E) White-Glove Includes Checklist */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8 md:mb-12 text-center">
              White-Glove Service Includes
            </h2>
            
            <Card className="bg-card border border-border/50 shadow-xl">
              <CardContent className="p-6 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.whiteGloveIncludes.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground font-medium text-sm md:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* F) Reviews Section */}
      {data.reviewSnippets && data.reviewSnippets.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8 md:mb-12 text-center">
                What {data.locationName} Residents Say
              </h2>
              
              <ReviewCarousel 
                reviews={data.reviewSnippets} 
                locationName={data.locationName} 
              />
            </div>
          </div>
        </section>
      )}

      {/* G) FAQ Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8 md:mb-12 text-center">
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="w-full space-y-3">
              {data.faqItems.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-card border border-border/50 rounded-lg px-4 md:px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left text-sm md:text-base font-medium hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* H) Photo Gallery Section - Only shown if >= 3 real images */}
      {shouldShowGallery && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8 md:mb-12 text-center">
                {data.locationName} Move Gallery
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {realGalleryImages.map((photo, index) => (
                  <Card key={index} className="bg-card border border-border/50 shadow-lg overflow-hidden">
                    <div className="aspect-video bg-muted/50 flex items-center justify-center">
                      <img 
                        src={photo.image} 
                        alt={photo.caption}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground text-center">
                        {photo.caption}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Specialty Neighborhoods Section (for parent locations like Henderson) */}
      {data.specialtyNeighborhoods && data.specialtyNeighborhoods.length > 0 && (
        <section className="py-10 md:py-14 bg-background border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-6 text-center">
                Specialty Neighborhoods
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.specialtyNeighborhoods.map((neighborhood, index) => (
                  <Link
                    key={index}
                    href={`/locations/${neighborhood.slug}`}
                    className="group p-4 bg-muted/50 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <h4 className="font-semibold text-foreground group-hover:text-primary mb-1 flex items-center gap-2">
                      {neighborhood.name}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {neighborhood.teaser}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Content Section - Dynamic from data */}
      {data.relatedContent && (
        <section className="py-10 md:py-14 bg-muted/30 border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {data.relatedContent.services && data.relatedContent.services.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Related Services</h3>
                    <ul className="space-y-2">
                      {data.relatedContent.services.map((service, index) => (
                        <li key={index}>
                          <Link 
                            href={`/services/${service.slug}`}
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ArrowRight className="h-4 w-4" />
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.relatedContent.locations && data.relatedContent.locations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Nearby Service Areas</h3>
                    <ul className="space-y-2">
                      {data.relatedContent.locations.map((loc, index) => (
                        <li key={index}>
                          <Link 
                            href={`/locations/${loc.slug}`}
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ArrowRight className="h-4 w-4" />
                            {loc.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Proof Links for E-E-A-T */}
              {data.proofLinks && data.proofLinks.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border/50 text-center">
                  <p className="text-muted-foreground">
                    {data.proofLinks.map((link, index) => (
                      <span key={index}>
                        {link.context}{" "}
                        <Link href={link.url} className="text-primary hover:underline font-medium">
                          {link.text}
                        </Link>
                        {index < data.proofLinks!.length - 1 ? " | " : ""}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Fallback Quick Links (only if no relatedContent) */}
      {!data.relatedContent && (
        <section className="py-8 md:py-12 bg-background border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base">
                <Link href="/why-choose-us" className="text-primary hover:underline">
                  Why Choose Us
                </Link>
                <Link href="/services/local-moving" className="text-primary hover:underline">
                  Local Moving
                </Link>
                <Link href="/services/packing-services" className="text-primary hover:underline">
                  Packing Services
                </Link>
                <Link href="/services/long-distance-moving" className="text-primary hover:underline">
                  Long Distance Moving
                </Link>
                <Link href="/#contact" className="text-primary hover:underline">
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* I) Final CTA Block */}
      <section className="py-12 md:py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
            Ready for a White-Glove Move in {data.locationName}?
          </h2>
          <p className="text-lg md:text-xl text-background/80 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join the {data.proofMovesCount}+ {data.locationName} families who trust Umbrella Movers with their belongings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg px-6 md:px-8"
            >
              Get Your Free Quote
            </Button>
            <a 
              href="tel:702-533-2853"
              className="inline-flex items-center justify-center gap-2 bg-background text-foreground text-base md:text-lg px-6 md:px-8 h-11 rounded-md font-medium"
            >
              <Phone className="h-5 w-5" />
              702-533-2853
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LocationPageTemplate;
