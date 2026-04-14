"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

export default function RateExperiencePage() {
  const router = useRouter();
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
    if (starValue >= 4) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ["#FFD700", "#FFA500", "#FF6347", "#00CED1", "#9370DB"] });
      setTimeout(() => { router.push("/rate/thank-you"); }, 1500);
    } else {
      setShowFeedback(true);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      toast({ title: "Please enter your feedback", description: "We'd love to hear what went wrong.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch("https://dzjxcbajoapjeaauqjua.supabase.co/functions/v1/send-feedback-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, feedback: feedback.trim() }),
      });
    } catch (error) {
      console.error("Error sending feedback:", error);
    } finally {
      toast({ title: "Thank you", description: "A manager has been notified." });
      setFeedback("");
      setRating(0);
      setShowFeedback(false);
      setIsSubmitting(false);
    }
  };

  const displayRating = hoveredRating || rating;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="mb-6"><span className="text-4xl">☂️</span></div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">How was your move with Umbrella Movers?</h1>
          <p className="text-slate-500 mb-8">Your feedback means the world to us</p>
          <div className="flex justify-center gap-2 md:gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded-full p-1"
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <Star className={`w-12 h-12 md:w-14 md:h-14 transition-colors duration-200 ${star <= displayRating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200 hover:fill-amber-200 hover:text-amber-200"}`} />
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="animate-fade-in space-y-4 border-t border-slate-100 pt-6">
              <div className="text-left">
                <label htmlFor="feedback" className="block text-slate-700 font-medium mb-2">We&apos;re sorry to hear that. Please tell us what went wrong so we can fix it.</label>
                <Textarea id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Share your experience..." className="min-h-[120px] resize-none border-slate-300 focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <Button onClick={handleSubmitFeedback} disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </div>
          )}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-400">Umbrella Movers • Woman-Owned • Since 2009</p>
          </div>
        </div>
      </div>
    </div>
  );
}
