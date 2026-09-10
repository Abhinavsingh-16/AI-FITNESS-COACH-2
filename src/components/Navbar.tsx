import React from 'react';
import { Activity, Dumbbell } from 'lucide-react';

interface NavbarProps {
  onOpenTest: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTest }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-8 py-3.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center shadow-xs">
            <div className="w-4 h-4 bg-black rotate-45 flex items-center justify-center">
              <Dumbbell className="w-2.5 h-2.5 text-white -rotate-45" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight uppercase text-white font-sans">
                AI.Strength
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border border-zinc-700 bg-zinc-800/80 text-zinc-300">
                AI COACH
              </span>
            </div>
          </div>
        </div>

        {/* Section Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest text-zinc-400 font-medium">
          <a href="#fitness-test" className="hover:text-white transition-colors">
            Test
          </a>
          <a href="#sample-plan" className="hover:text-white transition-colors">
            AI Plan
          </a>
          <a href="#benefits" className="hover:text-white transition-colors">
            Benefits
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#results" className="hover:text-white transition-colors">
            Community
          </a>
          <a href="#science" className="hover:text-white transition-colors">
            Science
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            id="nav-cta-btn"
            onClick={onOpenTest}
            className="bg-white text-black hover:bg-zinc-200 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Take 60s Test</span>
          </button>
        </div>
      </div>
    </header>
  );
};
