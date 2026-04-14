import type { Metadata } from "next";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Thank You!",
  description: "Thank you for rating your moving experience with Umbrella Movers.",
};

export default function ThankYouRatingPage() {
  const googleReviewUrl = "https://g.page/r/CQwIVJ2M8iW7EAI/review";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="mb-6"><span className="text-5xl">☂️</span></div>
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-8 h-8 fill-amber-400 text-amber-400" />)}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Thank You for Your Rating!</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">We&apos;re so glad you had a great experience with Umbrella Movers! Your feedback means the world to us.</p>
          <div className="bg-slate-50 rounded-xl p-6 mb-6">
            <p className="text-slate-700 font-medium mb-4">Would you mind sharing your experience on Google? It helps other families find trusted movers!</p>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
              <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
                Leave a Google Review <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
          <div className="pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-400">Umbrella Movers • Woman-Owned • Since 2009</p>
          </div>
        </div>
      </div>
    </div>
  );
}
