"use client";
import { Button } from "@/components/ui/button";

interface GetQuoteButtonProps {
  size?: "default" | "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export function GetQuoteButton({ size = "lg", className, children }: GetQuoteButtonProps) {
  const scrollToContact = () => {
    if (window.location.pathname === "/") {
      const el = document.getElementById("contact");
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    window.location.href = "/#contact";
  };

  return (
    <Button onClick={scrollToContact} size={size} className={className}>
      {children ?? "Get Free Quote"}
    </Button>
  );
}
