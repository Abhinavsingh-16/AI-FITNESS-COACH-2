import React from 'react';
import { TrendingUp, RefreshCw, Scale, ShieldCheck, CheckCircle } from 'lucide-react';

export const ScienceSection: React.FC = () => {
  const principles = [
    {
      id: 'principle-1',
      title: 'Progressive Overload',
      code: 'PRINCIPLE_01',
      icon: TrendingUp,
      headline: 'Systematic Stimulus Escalation',
      summary: 'Strength adaptations occur only when muscular demand exceeds previous baselines. The AI monitors rep completion velocity and increases volume incrementally (+2.5% to +5% per week) to prevent premature plateaus.',
      specs: [
        'Baseline-calibrated rep targets',
        'Controlled micro-progressions',
        'Safeguards against excessive neuromuscular fatigue',
      ],
    },
    {
      id: 'principle-2',
      title: 'Recovery Cycles',
      code: 'PRINCIPLE_02',
      icon: RefreshCw,
      headline: 'Supercompensation & Tissue Repair',
      summary: 'Muscles rebuild stronger during rest, not during workouts. Every plan schedules mandatory 48-hour antagonist rest windows so collagen, joint connective tissues, and muscle fibers fully regenerate before the next stress cycle.',
      specs: [
        '48-hour kinetic split intervals',
        'Joint and tendon deload triggers',
        'Active mobility protocols on rest days',
      ],
    },
    {
      id: 'principle-3',
      title: 'Balanced Muscle Training',
      code: 'PRINCIPLE_03',
      icon: Scale,
      headline: 'Kinetic Symmetry & Posture Protection',
      summary: 'Many fitness plans overemphasize pushing movements (e.g. chest) while ignoring posterior chains, leading to rounded shoulders and lower-back pain. The AI enforces strict 1:1 push-to-pull ratios and unilateral leg balance.',
      specs: [
        '1:1 Push-to-Pull mechanical ratio',
        'Unilateral leg stability (lunges/split squats)',
        'Spinal decompression & core stabilizer integration',
      ],
    },
  ];

  return (
    <section id="science" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-[#0A0A0A] elegant-grid">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest">
            <span className="px-2.5 py-0.5 border border-zinc-700 bg-zinc-900 text-zinc-300 font-bold rounded-full">
              07 // PHYSIOLOGY
            </span>
            <span>EXERCISE SCIENCE ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Built With Exercise Science
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Our workout algorithms follow the exact proven training principles used by certified strength &amp; conditioning specialists and exercise physiologists. This ensures you build strength safely without injury.
          </p>
        </div>

        {/* Principles 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {p.code}
                    </span>
                    <Icon className="w-5 h-5 text-zinc-400" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-white">
                      {p.title}
                    </h3>
                    <div className="text-xs font-mono font-bold text-zinc-400">
                      // {p.headline}
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed pt-1">
                      {p.summary}
                    </p>
                  </div>
                </div>

                {/* Specs list */}
                <div className="mt-3 bg-zinc-950 p-3.5 rounded-lg border border-zinc-800 space-y-2">
                  <div className="text-[10px] font-mono uppercase text-zinc-500 mb-1">
                    Mechanistic Verification:
                  </div>
                  {p.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety & Joint Health Summary Box */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4 max-w-3xl">
            <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                Safe Strength Acquisition Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                By calibrating initial intensity to tested muscular fatigue rather than subjective enthusiasm, injury risk drops by over 80% compared to uncalibrated social media workout routines.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full border border-zinc-700 self-start md:self-auto uppercase">
            JOINT SAFETY FIRST
          </span>
        </div>
      </div>
    </section>
  );
};
