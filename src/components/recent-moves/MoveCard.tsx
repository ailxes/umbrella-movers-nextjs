"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Home, Users, CheckCircle, Truck, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { RecentMove } from "@/data/recentMoves";

interface MoveCardProps {
  move: RecentMove;
  variant?: "full" | "compact";
}

const MoveCard = ({ move, variant = "full" }: MoveCardProps) => {
  const isCompact = variant === "compact";
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const photos = move.photos;
  const hasMultiplePhotos = photos.length > 1;

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToPhoto = (index: number) => {
    setCurrentPhotoIndex(index);
  };

  return (
    <Card className="overflow-hidden border-border/50 bg-card shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Photo Section with Carousel */}
      <div className="relative">
        {/* Main Photo */}
        <div className={`relative overflow-hidden bg-secondary/30 ${isCompact ? "aspect-[16/9]" : "aspect-[16/10] md:aspect-[21/9]"}`}>
          <img
            src={photos[currentPhotoIndex]?.src}
            alt={photos[currentPhotoIndex]?.alt}
            className="w-full h-full object-contain"
            loading="lazy"
          />
          
          {/* Photo Counter Badge */}
          {hasMultiplePhotos && (
            <div className="absolute top-3 right-3 bg-primary/80 text-primary-foreground text-xs px-2 py-1 rounded-full">
              {currentPhotoIndex + 1} / {photos.length}
            </div>
          )}

          {/* Navigation Arrows - only show if multiple photos */}
          {hasMultiplePhotos && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary/90 text-primary-foreground p-2 rounded-full transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary/90 text-primary-foreground p-2 rounded-full transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip - only show on full variant with multiple photos */}
        {!isCompact && hasMultiplePhotos && (
          <div className="flex gap-2 p-3 bg-secondary/30 overflow-x-auto">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => goToPhoto(index)}
                className={`relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all ${
                  index === currentPhotoIndex
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                    : "opacity-60 hover:opacity-100"
                }`}
                aria-label={`View photo ${index + 1}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

        {/* Dot Indicators for Mobile - only if multiple photos */}
        {hasMultiplePhotos && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPhoto(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentPhotoIndex
                    ? "bg-accent w-4"
                    : "bg-primary-foreground/50"
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <CardContent className={isCompact ? "p-4" : "p-4 md:p-6"}>
        {/* Move Details */}
        <div className="space-y-3 md:space-y-4">
          {/* Neighborhood & Home Type */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4">
            <div className="flex items-center gap-2 text-foreground">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span className="font-semibold text-sm md:text-base">{move.neighborhood}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Home className="w-4 h-4 shrink-0" />
              <span className="text-sm md:text-base">{move.homeType}</span>
            </div>
          </div>

          {!isCompact && (
            <>
              {/* Move Details */}
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-accent mt-1 shrink-0" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {move.moveDetails}
                </p>
              </div>

              {/* Crew Size */}
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm font-medium">{move.crewSize}</span>
              </div>

              {/* Protection Checklist */}
              <div className="bg-secondary/50 rounded-lg p-3 md:p-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  Protection-First Checklist
                </h4>
                <ul className="space-y-2">
                  {move.protectionChecklist.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Links */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 pt-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Related Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {move.relatedServices.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="text-sm text-accent hover:text-accent-dark underline-offset-2 hover:underline transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Areas Served:</p>
                  <div className="flex flex-wrap gap-2">
                    {move.relatedAreas.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="text-sm text-accent hover:text-accent-dark underline-offset-2 hover:underline transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild className="bg-accent hover:bg-accent-dark text-accent-foreground w-full sm:w-auto">
                  <Link href="/#contact">
                    Get a Quote
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </>
          )}

          {/* Compact Summary */}
          {isCompact && (
            <>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {move.summary}
              </p>
              <div className="flex justify-end">
                <Link
                  href="/recent-moves"
                  className="text-sm text-accent hover:text-accent-dark flex items-center gap-1 transition-colors"
                >
                  View details
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoveCard;
