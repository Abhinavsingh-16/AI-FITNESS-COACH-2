import React, { useState } from 'react';
import { Calendar, Sparkles, ArrowRight, Target } from 'lucide-react';


interface ExamplePlanSectionProps {
  onOpenTest: () => void;
}

export const ExamplePlanSection: React.FC<ExamplePlanSectionProps> = ({ onOpenTest }) => {
  const [activeTier, setActiveTier] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const tierPlans = {
    beginner: {
      label: 'Beginner Baseline (e.g., 8-10 Push-ups Max)',
      badge: 'STRENGTH LEVEL: ENTRY',
      adjustmentNote: 'Scaled volume with generous rest intervals to build tendon and joint resilience.',
      monday: [
        { name: 'Push-ups', spec: '3 × 8 reps', note: 'Standard or elevated hands if needed' },
        { name: 'Bodyweight squats', spec: '3 × 12 reps', note: 'Full hip depth, knees tracking over toes' },
        { name: 'Plank', spec: '3 × 20 sec', note: 'Solid glute and core tension' },
      ],
      wednesday: [
        { name: 'Lunges', spec: '3 × 10 reps', note: '5 reps per leg, slow controlled cadence' },
        { name: 'Incline push-ups', spec: '3 × 10 reps', note: 'Bench or box elevation for volume control' },
        { name: 'Core exercises', spec: '3 × 12 reps', note: 'Deadbug and bird-dog rotations' },
      ],
      friday: [
        { name: 'Full body workout', spec: '3 rounds circuit', note: 'Integrated circuit combining push, squat, hinge, & plank' },
      ],
    },
    intermediate: {
      label: 'Intermediate Baseline (e.g., 20-25 Push-ups Max)',
      badge: 'STRENGTH LEVEL: INTERMEDIATE',
      adjustmentNote: 'Increased eccentric time under tension with explosive concentric phase.',
      monday: [
        { name: 'Push-ups', spec: '3 × 18 reps', note: 'Strict chest-to-floor with 1s pause' },
        { name: 'Bodyweight squats', spec: '3 × 22 reps', note: 'Tempo 3-0-1 with isometric pause' },
        { name: 'Plank', spec: '3 × 45 sec', note: 'Hardstyle active lats engagement' },
      ],
      wednesday: [
        { name: 'Walking Lunges', spec: '3 × 16 reps', note: '8 reps per leg continuous stride' },
        { name: 'Decline / Diamond push-ups', spec: '3 × 14 reps', note: 'Tricep and anterior load focus' },
        { name: 'Core exercises', spec: '3 × 20 reps', note: 'Hollow body rocks & hanging knee raises' },
      ],
      friday: [
        { name: 'Full body workout', spec: '4 rounds high-intensity', note: 'Targeted density circuit with 60s rest between sets' },
      ],
    },
    advanced: {
      label: 'Advanced Baseline (e.g., 40+ Push-ups Max)',
      badge: 'STRENGTH LEVEL: ADVANCED',
      adjustmentNote: 'Calisthenic lever progressions, unilateral loads, and high muscular density.',
      monday: [
        { name: 'Archer / Deficit Push-ups', spec: '4 × 15 reps', note: 'Unilateral pushing emphasis' },
        { name: 'Pistol / Jump squats', spec: '4 × 12 reps', note: 'Single-leg balance & explosive power' },
        { name: 'Extended Plank / RKC', spec: '3 × 60+ sec', note: 'Maximal abdominal torque' },
      ],
      wednesday: [
        { name: 'Bulgarian Split Squats', spec: '4 × 15 reps/leg', note: 'Deep hip flexion & quad overload' },
        { name: 'Pseudo Planche push-ups', spec: '4 × 12 reps', note: 'High shoulder & wrist conditioning' },
        { name: 'Core exercises', spec: '4 × 20 reps', note: 'Dragon flags & L-sit holds' },
      ],
      friday: [
        { name: 'Full body workout', spec: '5 rounds elite calisthenics', note: 'High volume kinetic integration' },
      ],
    },
  };

  const currentPlan = tierPlans[activeTier];

  return (
    <section id="sample-plan" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-[#0A0A0A] elegant-grid">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest">
            <span className="px-2.5 py-0.5 border border-zinc-700 bg-zinc-900 text-zinc-300 font-bold rounded-full">
              03 // SAMPLE OUTPUT
            </span>
            <span>SAMPLE AI GENERATED TRAINING PROGRAM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            See What Your AI Workout Plan Looks Like
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Below is an example weekly training program. Notice how exercises, sets, and rep ranges dynamically recalibrate depending on your strength test score.
          </p>
        </div>

        {/* Dynamic Tier Switcher */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-300">
            <Target className="w-4 h-4 text-emerald-400" />
            <span className="uppercase tracking-wider">PREVIEW BY STRENGTH TIER:</span>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
            {(['beginner', 'intermediate', 'advanced'] as const).map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setActiveTier(tier)}
                className={`py-2 px-4 text-xs font-mono uppercase tracking-wider rounded-md border transition-all cursor-pointer ${
                  activeTier === tier
                    ? 'border-white bg-white text-black font-bold'
                    : 'border-zinc-700 bg-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-500'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* MONDAY */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full shadow-lg">
            {/* Header */}
            <div className="p-4 bg-zinc-800/90 border-b border-zinc-700/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white" />
                <span className="font-mono font-bold text-sm uppercase tracking-wider text-white">
                  Monday
                </span>
              </div>
              <span className="text-[10px] font-mono bg-zinc-900 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700 uppercase">
                DAY 01 • 42 MIN
              </span>
            </div>

            {/* Exercise List */}
            <div className="p-5 space-y-4 flex-1 bg-zinc-900/60">
              <div className="text-xs font-mono uppercase text-zinc-400 pb-2 border-b border-zinc-800">
                Target: Upper Power & Core
              </div>

              <div className="space-y-3">
                {currentPlan.monday.map((ex, i) => (
                  <div key={i} className="p-3 border border-zinc-800 bg-zinc-950 rounded-lg space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">
                        {ex.name}
                      </span>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-200">
                        {ex.spec}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-mono">
                      {ex.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-800 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
              <span>Rest: 60-90s</span>
              <span>Pacing: Calibrated</span>
            </div>
          </div>

          {/* WEDNESDAY */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full shadow-lg">
            {/* Header */}
            <div className="p-4 bg-zinc-800/90 border-b border-zinc-700/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white" />
                <span className="font-mono font-bold text-sm uppercase tracking-wider text-white">
                  Wednesday
                </span>
              </div>
              <span className="text-[10px] font-mono bg-zinc-900 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700 uppercase">
                DAY 02 • 38 MIN
              </span>
            </div>

            {/* Exercise List */}
            <div className="p-5 space-y-4 flex-1 bg-zinc-900/60">
              <div className="text-xs font-mono uppercase text-zinc-400 pb-2 border-b border-zinc-800">
                Target: Lower Body & Incline
              </div>

              <div className="space-y-3">
                {currentPlan.wednesday.map((ex, i) => (
                  <div key={i} className="p-3 border border-zinc-800 bg-zinc-950 rounded-lg space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">
                        {ex.name}
                      </span>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-200">
                        {ex.spec}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-mono">
                      {ex.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-800 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
              <span>Rest: 60s</span>
              <span>Pacing: Unilateral</span>
            </div>
          </div>

          {/* FRIDAY */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full shadow-lg">
            {/* Header */}
            <div className="p-4 bg-zinc-800/90 border-b border-zinc-700/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white" />
                <span className="font-mono font-bold text-sm uppercase tracking-wider text-white">
                  Friday
                </span>
              </div>
              <span className="text-[10px] font-mono bg-zinc-900 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700 uppercase">
                DAY 03 • 35 MIN
              </span>
            </div>

            {/* Exercise List */}
            <div className="p-5 space-y-4 flex-1 bg-zinc-900/60">
              <div className="text-xs font-mono uppercase text-zinc-400 pb-2 border-b border-zinc-800">
                Target: Core & Stability Circuit
              </div>

              <div className="space-y-3">
                {currentPlan.friday.map((ex, i) => (
                  <div key={i} className="p-3 border border-zinc-800 bg-zinc-950 rounded-lg space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">
                        {ex.name}
                      </span>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-200">
                        {ex.spec}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-mono">
                      {ex.note}
                    </p>
                  </div>
                ))}

                <div className="p-3 border border-zinc-800 bg-zinc-950 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">
                      Active Recovery Protocol
                    </span>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-200">
                      Weekend
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Walking, joint mobility, and 48-hour muscular recovery
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-800 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
              <span>Rest: 90s</span>
              <span>Full Integration</span>
            </div>
          </div>
        </div>

        {/* Dynamic Adjustment Explanation Note */}
        <div className="border border-zinc-800 bg-zinc-900 rounded-xl p-6 space-y-3 shadow-md">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-white">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>HOW THE AI ADJUSTS YOUR PLAN:</span>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            The plan above automatically adapts to your strength level. If your push-up max is 6 reps, your plan starts with 3×4 with knee or incline regressions. If your push-up max is 35 reps, the AI elevates the load with deficit depth and explosive pacing. As you get stronger, the AI updates your sets each week.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-zinc-800">
            <span className="text-xs font-mono text-zinc-500">
              // CURRENT VIEW: {currentPlan.badge}
            </span>
            <button
              onClick={onOpenTest}
              className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Test My Real Baseline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
