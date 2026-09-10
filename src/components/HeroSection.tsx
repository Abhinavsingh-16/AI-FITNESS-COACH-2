import React, { useState } from 'react';
import { ArrowRight, Cpu } from 'lucide-react';

interface HeroSectionProps {
  onStartTestWithEmail: (email: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartTestWithEmail }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    onStartTestWithEmail(email);
  };

  return (
    <section id="hero-section" className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 elegant-grid">
      <div className="max-w-6xl mx-auto">
        {/* Section tag */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-8 pb-3 border-b border-zinc-800/80 text-zinc-500 font-mono text-[10px] sm:text-xs">
          <span className="uppercase tracking-widest break-words">// SECTION 01 : STRENGTH_FIRST_INITIALIZATION</span>
          <span className="shrink-0">EST. TIME: 60 SECONDS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Headline & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-zinc-800 bg-zinc-900/90 text-zinc-300 text-xs font-mono rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="uppercase tracking-wider">CALIBRATED STRENGTH-FIRST ALGORITHM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              The First AI Fitness Coach That Tests Your Strength Before Creating Your Workout.
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
              Most workout apps give generic plans. Our AI measures your real strength level and builds a personalized training program in under 60 seconds.
            </p>

            {/* Email Input & Primary CTA Form */}
            <form onSubmit={handleSubmit} className="pt-2 max-w-xl space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg">
                <div className="relative flex-1">
                  <input
                    id="hero-email-input"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className="w-full bg-transparent border-none text-sm px-4 py-3 outline-none text-white placeholder:text-zinc-500 font-sans"
                  />
                </div>

                <button
                  id="hero-cta-btn"
                  type="submit"
                  className="bg-white text-black px-6 py-3 font-bold text-sm rounded-md hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Take the 60-Second Fitness Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {error && (
                <p className="text-xs font-mono text-rose-400 bg-rose-950/40 p-2 border border-rose-800 rounded">
                  {error}
                </p>
              )}

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 text-xs text-zinc-400 pt-2 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="text-green-500 font-bold">✔</span> Beginner Friendly
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-green-500 font-bold">✔</span> Home or Gym
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-green-500 font-bold">✔</span> Science Based
                </span>
              </div>
            </form>

            <p className="text-xs text-zinc-500 flex items-center gap-2 pt-1 font-mono">
              <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></span>
              <span>Free personalized workout plan. No equipment required.</span>
            </p>
          </div>

          {/* Right Column: Diagnostic Visual Card (Matching Design HTML Aesthetic) */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-zinc-400" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                    Step 1: Strength Test
                  </h3>
                </div>
                <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700">
                  LIVE SENSOR MATRIX
                </span>
              </div>

              {/* Visual Simulated Calibration Bars */}
              <div className="space-y-3">
                <div className="p-3.5 bg-zinc-800/80 border border-zinc-700/80 rounded-lg text-xs space-y-2">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>How many push-ups can you do?</span>
                    <span className="text-white font-mono font-bold">12 reps</span>
                  </div>
                  <div className="h-1.5 bg-zinc-700 rounded-full w-full overflow-hidden">
                    <div className="h-full bg-white w-2/5 transition-all"></div>
                  </div>
                </div>

                <div className="p-3.5 bg-zinc-800/80 border border-zinc-700/80 rounded-lg text-xs space-y-2">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>Max plank duration (seconds)?</span>
                    <span className="text-white font-mono font-bold">45 sec</span>
                  </div>
                  <div className="h-1.5 bg-zinc-700 rounded-full w-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-3/5 transition-all"></div>
                  </div>
                </div>

                <div className="p-3.5 bg-zinc-800/80 border border-zinc-700/80 rounded-lg text-xs space-y-2">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>Frequency of current exercise?</span>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2.5 py-1 border border-zinc-700 text-[10px] text-zinc-400 rounded">None</span>
                    <span className="px-2.5 py-1 border border-white text-[10px] bg-white text-black font-bold rounded">1-2 days</span>
                    <span className="px-2.5 py-1 border border-zinc-700 text-[10px] text-zinc-400 rounded">3+ days</span>
                  </div>
                </div>
              </div>

              {/* Calibration outcome summary */}
              <div className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between text-xs">
                <div className="text-zinc-400">
                  <span>Output: </span>
                  <span className="text-white font-bold">100% Calibrated Plan</span>
                </div>
                <button
                  type="button"
                  onClick={() => onStartTestWithEmail(email)}
                  className="text-xs font-bold text-zinc-200 hover:text-white underline font-mono cursor-pointer"
                >
                  START NOW &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
