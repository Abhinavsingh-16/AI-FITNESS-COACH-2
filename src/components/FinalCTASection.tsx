import React from 'react';
import { ArrowRight, Activity, Check } from 'lucide-react';

interface FinalCTASectionProps {
  onOpenTest: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenTest }) => {
  return (
    <section id="final-cta" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-[#0A0A0A] elegant-grid">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Section tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-zinc-700 bg-zinc-900 text-zinc-300 text-xs font-mono rounded-full">
          <span>// SECTION 08 : INITIATION</span>
          <span>EST. TIME: &lt; 60 SEC</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-tight">
          Start Your Fitness Transformation Today
        </h2>

        {/* Text */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Discover your strength level and get a personalized workout plan in under a minute.
        </p>

        {/* CTA Button */}
        <div className="space-y-3 pt-2">
          <button
            id="final-cta-btn"
            onClick={onOpenTest}
            className="py-4 px-8 bg-white text-black font-bold uppercase tracking-wider text-sm sm:text-base rounded-md hover:bg-zinc-200 transition-colors inline-flex items-center justify-center gap-3 cursor-pointer shadow-2xl"
          >
            <Activity className="w-5 h-5" />
            <span>Start My Fitness Test</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Small text below CTA */}
          <p className="text-xs font-mono text-zinc-500 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
            <span>Free. Beginner friendly. No equipment required.</span>
          </p>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-8 border-t border-zinc-800 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Zero payment required</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Instant customized plan</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>No equipment needed</span>
          </div>
        </div>
      </div>
    </section>
  );
};
