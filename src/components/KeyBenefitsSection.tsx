import React from 'react';
import { Target, Users, BookOpen, CheckCircle } from 'lucide-react';

export const KeyBenefitsSection: React.FC = () => {
  const benefits = [
    {
      id: 'benefit-1',
      number: '1',
      title: 'Real Personalization',
      tag: 'NO GENERIC GUESSWORK',
      icon: Target,
      summary: 'Most apps ask about goals. Our AI measures actual strength performance before building the plan.',
      details: [
        'Tests muscular endurance & joint capacity',
        'Eliminates generic boilerplate routines',
        'Calibrates exact reps to avoid early burnout',
      ],
    },
    {
      id: 'benefit-2',
      number: '2',
      title: 'Beginner Friendly',
      tag: 'ZERO INTIMIDATION',
      icon: Users,
      summary: 'Perfect for people who want to start exercising but don’t know where to begin.',
      details: [
        'Zero complex gym jargon or confusing equipment',
        'Clear form cues and progression paths',
        'Starts directly at your current physical capability',
      ],
    },
    {
      id: 'benefit-3',
      number: '3',
      title: 'Science-Based Training',
      tag: 'EXERCISE PHYSIOLOGY',
      icon: BookOpen,
      summary: 'Workouts follow proven fitness principles such as progressive overload, proper recovery, and balanced muscle training.',
      details: [
        'Progressive overload systematically scales intensity',
        'Structured recovery protects joints and tendons',
        'Balanced muscle training prevents postural imbalances',
      ],
    },
  ];

  return (
    <section id="benefits" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest">
            <span className="px-2.5 py-0.5 border border-zinc-700 bg-zinc-900 text-zinc-300 font-bold rounded-full">
              04 // VALUE PROPOSITION
            </span>
            <span>CORE ADVANTAGES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why This AI Coach Works Better
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            By shifting from superficial goal questionnaires to empirical strength testing, we eliminate the primary reasons traditional fitness apps fail.
          </p>
        </div>

        {/* 3 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                id={b.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between space-y-6 shadow-lg hover:border-zinc-700 transition-colors"
              >
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <div className="w-7 h-7 bg-white text-black rounded-full flex items-center justify-center font-mono font-bold text-xs">
                      {b.number}
                    </div>
                    <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700 uppercase">
                      {b.tag}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      {b.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {b.summary}
                    </p>
                  </div>
                </div>

                {/* Bullet details */}
                <div className="pt-4 border-t border-zinc-800 space-y-2">
                  {b.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
