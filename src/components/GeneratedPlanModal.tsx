import React, { useState } from 'react';
import { X, Calendar, Check, Copy, Printer, RotateCcw, Sparkles } from 'lucide-react';
import { GeneratedWorkoutPlan } from '../types';

interface GeneratedPlanModalProps {
  plan: GeneratedWorkoutPlan | null;
  isOpen: boolean;
  onClose: () => void;
  onRetakeTest: () => void;
}

export const GeneratedPlanModal: React.FC<GeneratedPlanModalProps> = ({
  plan,
  isOpen,
  onClose,
  onRetakeTest,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !plan) return null;

  const handleCopy = () => {
    const text = `AI Fitness Plan [${plan.id}] - Level: ${plan.userStrengthLevel}\n\n` +
      plan.weeklySchedule
        .map(
          (d) =>
            `${d.day.toUpperCase()} (${d.focus}):\n` +
            d.exercises.map((e) => `- ${e.name} | ${e.repsOrDuration}`).join('\n')
        )
        .join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl text-white">
        {/* Header */}
        <div className="bg-zinc-950 text-white p-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              YOUR PERSONALIZED WORKOUT PROGRAM // {plan.id}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plan Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Baseline Diagnostic Summary */}
          <div className="p-5 border border-zinc-800 bg-zinc-950 rounded-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500">Calibrated Strength Tier</span>
                <div className="text-2xl font-black font-mono text-white">
                  {plan.userStrengthLevel.toUpperCase()} LEVEL
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-300">
                <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded">
                  Push-ups: {plan.pushupBaseline}
                </span>
                <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded">
                  Plank: {plan.plankBaseline}s
                </span>
                <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded">
                  Squats: {plan.squatBaseline}
                </span>
              </div>
            </div>

            {/* AI Analysis Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-300 pt-1">
              <div>
                <strong className="text-white">Upper Chain:</strong> {plan.aiAnalysis.upperBodyRating}
              </div>
              <div>
                <strong className="text-white">Core Rigidity:</strong> {plan.aiAnalysis.coreRating}
              </div>
              <div>
                <strong className="text-white">Progression Rule:</strong> {plan.aiAnalysis.recommendedProgression}
              </div>
              <div>
                <strong className="text-white">Recovery:</strong> {plan.aiAnalysis.recoveryWindow}
              </div>
            </div>
          </div>

          {/* Weekly Schedule Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                Custom Weekly Schedule (Monday, Wednesday, Friday)
              </h3>
              <span className="text-xs font-mono text-zinc-500">3 SESSIONS / WEEK</span>
            </div>

            <div className="space-y-4">
              {plan.weeklySchedule.map((dayPlan, idx) => (
                <div key={idx} className="border border-zinc-800 bg-zinc-900/90 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-sm text-white font-mono">
                        {dayPlan.day.toUpperCase()} — {dayPlan.focus}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono bg-zinc-950 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-800">
                      SESSION {idx + 1}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {dayPlan.exercises.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="p-3 border border-zinc-800/80 bg-zinc-950 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <div className="font-bold text-xs text-white">{ex.name}</div>
                          <div className="text-[11px] text-zinc-400 font-mono">{ex.notes}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 bg-zinc-900 border border-zinc-700 text-white rounded">
                            {ex.repsOrDuration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onRetakeTest}
            className="px-3.5 py-2 text-xs font-mono bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake 60s Test</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 text-xs font-mono bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Plan'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-mono font-bold uppercase bg-white text-black hover:bg-zinc-200 rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
