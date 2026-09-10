import React from 'react';
import { ClipboardCheck, Cpu, Dumbbell, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenTest: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenTest }) => {
  const steps = [
    {
      step: '01',
      title: 'Take the 60-Second Fitness Test',
      icon: ClipboardCheck,
      description: 'Answer 4 simple questions measuring your push-ups, plank time, squat reps, and current activity levels.',
      features: ['No equipment needed', 'Takes 60 seconds', 'Zero guesswork'],
    },
    {
      step: '02',
      title: 'The AI Analyzes Your Data',
      icon: Cpu,
      description: 'Our engine processes your strength level, workout history, and fitness goals to model your safe capacity threshold.',
      features: ['Strength level index', 'Workout history weighting', 'Kinetic balance check'],
    },
    {
      step: '03',
      title: 'Receive Your Custom Plan',
      icon: Dumbbell,
      description: 'Get an immediate, structured weekly workout plan customized specifically for your home or gym setup.',
      features: ['Home or gym adaptable', 'Dynamic weekly scaling', 'Ready immediately'],
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-zinc-950/60 elegant-grid">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest">
            <span className="px-2.5 py-0.5 border border-zinc-700 bg-zinc-900 text-zinc-300 font-bold rounded-full">
              05 // PROTOCOL
            </span>
            <span>THREE-STAGE WORKFLOW</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How Your Workout Plan Is Created
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            From initial strength measurement to custom workout delivery in 3 streamlined steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between space-y-6 shadow-lg hover:border-zinc-700 transition-colors"
              >
                {/* Step Marker Badge */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 bg-white text-black rounded flex items-center justify-center font-mono font-bold text-xs">
                        {s.step}
                      </span>
                      <span className="font-mono text-xs font-bold text-zinc-300 tracking-wider">
                        STAGE {s.step}
                      </span>
                    </div>
                    <Icon className="w-5 h-5 text-zinc-400" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">
                      {s.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>

                {/* Micro Features list */}
                <div className="mt-3 space-y-2 bg-zinc-950 p-3.5 rounded-lg border border-zinc-800">
                  <div className="text-[10px] font-mono uppercase text-zinc-500 mb-1">
                    Key Deliverables:
                  </div>
                  {s.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trigger */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-white font-mono text-sm uppercase tracking-wider">
              Ready to generate your custom plan?
            </h4>
            <p className="text-xs text-zinc-400 font-mono">
              Takes approximately 60 seconds • 100% Free • No credit card
            </p>
          </div>
          <button
            onClick={onOpenTest}
            className="bg-white text-black hover:bg-zinc-200 px-6 py-3 font-bold text-xs uppercase tracking-wider rounded-md flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Start Step 01 Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
