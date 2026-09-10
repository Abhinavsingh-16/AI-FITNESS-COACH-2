import React, { useState } from 'react';
import { Sliders, Play, Info } from 'lucide-react';

import { calculateStrengthLevel } from '../utils/planGenerator';

interface StrengthTestPreviewProps {
  onOpenFullTest: (initialValues?: { pushups: number; plankSeconds: number; squats: number; frequency: any }) => void;
}

export const StrengthTestPreview: React.FC<StrengthTestPreviewProps> = ({ onOpenFullTest }) => {
  const [samplePushups, setSamplePushups] = useState(12);
  const [samplePlank, setSamplePlank] = useState(30);
  const [sampleSquats, setSampleSquats] = useState(20);
  const [sampleFrequency, setSampleFrequency] = useState<'never' | '1-2' | '3-4' | '5+'>('1-2');

  const estimatedLevel = calculateStrengthLevel(samplePushups, samplePlank, sampleSquats);

  return (
    <section id="fitness-test" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest">
            <span className="px-2.5 py-0.5 border border-zinc-700 bg-zinc-900 text-zinc-300 font-bold rounded-full">
              02 // TEST PROTOCOL
            </span>
            <span>STRENGTH MEASUREMENT ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Start With a Simple Strength Test
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Before creating any workouts, users take a quick 1-minute strength test. By measuring real reps and time under tension, our AI understands your true physical baseline instead of guessing.
          </p>
        </div>

        {/* Interactive Strength Test Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: The 4 Core Diagnostic Questions */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-white" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Interactive Strength Input Simulator
                </span>
              </div>
              <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700">
                TRY THE CONTROLS
              </span>
            </div>

            {/* Question 1: Push-ups */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-white text-black rounded flex items-center justify-center font-mono font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      How many push-ups can you do?
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      Tests upper-body pushing power & chest endurance
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-black text-white">
                    {samplePushups}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 ml-1">reps</span>
                </div>
              </div>

              <input
                id="preview-pushups-slider"
                type="range"
                min="0"
                max="50"
                value={samplePushups}
                onChange={(e) => setSamplePushups(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white border border-zinc-700"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>0 (Knee/Incline)</span>
                <span>15 (Standard)</span>
                <span>35+ (Advanced)</span>
                <span>50+</span>
              </div>
            </div>

            {/* Question 2: Plank */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-white text-black rounded flex items-center justify-center font-mono font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      How long can you hold a plank?
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      Measures core isometric rigidity & spine stabilization
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-black text-white">
                    {samplePlank}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 ml-1">sec</span>
                </div>
              </div>

              <input
                id="preview-plank-slider"
                type="range"
                min="5"
                max="120"
                step="5"
                value={samplePlank}
                onChange={(e) => setSamplePlank(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white border border-zinc-700"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>5s (Starting)</span>
                <span>30s (Solid)</span>
                <span>60s (Strong)</span>
                <span>120s+</span>
              </div>
            </div>

            {/* Question 3: Squats */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-white text-black rounded flex items-center justify-center font-mono font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      How many squats can you perform?
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      Assesses lower kinetic chain & quad/glute capacity
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-black text-white">
                    {sampleSquats}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 ml-1">reps</span>
                </div>
              </div>

              <input
                id="preview-squats-slider"
                type="range"
                min="0"
                max="60"
                value={sampleSquats}
                onChange={(e) => setSampleSquats(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white border border-zinc-700"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>0 (Assisted)</span>
                <span>20 (Standard)</span>
                <span>40 (High Volume)</span>
                <span>60+</span>
              </div>
            </div>

            {/* Question 4: Current Exercise Frequency */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-white text-black rounded flex items-center justify-center font-mono font-bold text-xs">
                  04
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    Do you currently exercise?
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Determines weekly volume & recovery frequency
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {[
                  { value: 'never', label: 'Rarely / Never' },
                  { value: '1-2', label: '1 - 2 Days/wk' },
                  { value: '3-4', label: '3 - 4 Days/wk' },
                  { value: '5+', label: '5+ Days/wk' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setSampleFrequency(item.value as any)}
                    className={`py-2 px-3 text-xs font-mono border rounded-md transition-all text-center cursor-pointer ${
                      sampleFrequency === item.value
                        ? 'border-white bg-white text-black font-bold'
                        : 'border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:border-zinc-500 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Real-time AI Calibration Output Panel */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  AI Real-Time Calibration
                </span>
                <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700">
                  CALCULATED LIVE
                </span>
              </div>

              {/* Estimated Level Card */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 space-y-2">
                <span className="text-[11px] font-mono uppercase text-zinc-400">
                  Detected Baseline Strength Tier:
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-white">
                    {estimatedLevel.toUpperCase()}
                  </span>
                  <span className="font-mono text-xs px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded text-zinc-200">
                    SCORE: {Math.round(samplePushups * 1.2 + (samplePlank / 5) * 1.0 + sampleSquats * 0.8)} PTS
                  </span>
                </div>
              </div>

              {/* Explanatory AI summary */}
              <div className="space-y-3 text-xs font-mono text-zinc-300 bg-zinc-950/60 p-4 border border-zinc-800/80 rounded-lg">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Why this test matters:</strong> The AI uses these 4 metrics to calculate your starting sets, reps, and exercise progressions. You won&apos;t get assigned workouts that are too hard or too easy.
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800 space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Target Push Load:</span>
                    <span className="font-bold text-white">
                      {Math.max(4, Math.round(samplePushups * 0.75))} reps / set
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Plank Time Target:</span>
                    <span className="font-bold text-white">
                      {Math.max(15, Math.round(samplePlank * 0.7))} seconds
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Weekly Cadence:</span>
                    <span className="font-bold text-emerald-400">
                      3 full-body cycles + 48h rest
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                id="launch-full-test-btn"
                onClick={() =>
                  onOpenFullTest({
                    pushups: samplePushups,
                    plankSeconds: samplePlank,
                    squats: sampleSquats,
                    frequency: sampleFrequency,
                  })
                }
                className="w-full py-3.5 px-4 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-md hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Play className="w-4 h-4" />
                <span>Take Official 60s Test & Get Plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
