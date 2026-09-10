import React from 'react';
import { Dumbbell, ArrowUp, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 font-sans text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-black rotate-45 flex items-center justify-center">
                  <Dumbbell className="w-2 h-2 text-white -rotate-45" />
                </div>
              </div>
              <span className="font-bold text-base text-white tracking-tight uppercase">
                AI.Strength Coach
              </span>
            </div>

            <p className="text-zinc-400 leading-relaxed max-w-sm">
              The first AI fitness coach that empirically tests your physical baseline before prescribing a single set. Science-based progressive overload for home and gym training.
            </p>

            <div className="pt-1 flex items-center gap-2 text-zinc-500 font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Evidence-based exercise physiology engine</span>
            </div>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold uppercase text-white tracking-wider">
                Protocol
              </span>
              <ul className="space-y-2 font-mono text-xs">
                <li>
                  <a href="#fitness-test" className="hover:text-white transition-colors">
                    Strength Baseline Test
                  </a>
                </li>
                <li>
                  <a href="#sample-plan" className="hover:text-white transition-colors">
                    Sample Workout Plans
                  </a>
                </li>
                <li>
                  <a href="#science" className="hover:text-white transition-colors">
                    Progressive Overload
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="hover:text-white transition-colors">
                    Core Benefits
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs font-bold uppercase text-white tracking-wider">
                Community
              </span>
              <ul className="space-y-2 font-mono text-xs">
                <li>
                  <a href="#results" className="hover:text-white transition-colors">
                    Verified Proof &amp; Results
                  </a>
                </li>
                <li>
                  <a href="#results" className="hover:text-white transition-colors">
                    Media Upload Portal
                  </a>
                </li>
                <li>
                  <a href="#newsletter" className="hover:text-white transition-colors">
                    Weekly Science Digest
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <span className="font-mono text-xs font-bold uppercase text-white tracking-wider">
                Safety &amp; Rules
              </span>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-mono">
                Consult with a physician before starting any exercise program. All workout recommendations are algorithmic suggestions based on user-reported strength thresholds.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="text-zinc-500">
            &copy; {new Date().getFullYear()} AI.Strength Coach. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-md transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
