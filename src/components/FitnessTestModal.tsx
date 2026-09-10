import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Cpu, Sparkles, Play, RotateCcw } from 'lucide-react';
import { TestFormData, GeneratedWorkoutPlan } from '../types';
import { generatePersonalizedPlan, calculateStrengthLevel } from '../utils/planGenerator';

interface FitnessTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanGenerated: (plan: GeneratedWorkoutPlan) => void;
  initialEmail?: string;
  initialValues?: {
    pushups: number;
    plankSeconds: number;
    squats: number;
    frequency: 'never' | '1-2' | '3-4' | '5+';
  };
}

export const FitnessTestModal: React.FC<FitnessTestModalProps> = ({
  isOpen,
  onClose,
  onPlanGenerated,
  initialEmail = '',
  initialValues,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pushups, setPushups] = useState(initialValues?.pushups ?? 10);
  const [plankSeconds, setPlankSeconds] = useState(initialValues?.plankSeconds ?? 30);
  const [squats, setSquats] = useState(initialValues?.squats ?? 15);
  const [frequency, setFrequency] = useState<'never' | '1-2' | '3-4' | '5+'>(initialValues?.frequency ?? '1-2');
  const [location, setLocation] = useState<'home' | 'gym' | 'both'>('home');
  const [goal, setGoal] = useState<'build_strength' | 'lose_fat' | 'improve_endurance' | 'general_health'>('build_strength');
  const [email, setEmail] = useState(initialEmail);

  // Stopwatch for plank test
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerCount, setTimerCount] = useState(0);

  // Analyzing state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingStage, setAnalyzingStage] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerCount((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Reset all internal state when the modal is closed so reopening starts fresh
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setIsTimerRunning(false);
      setTimerCount(0);
      setIsAnalyzing(false);
      setAnalyzingStage(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Start AI Generation simulation
      setIsAnalyzing(true);
      setAnalyzingStage(1);

      setTimeout(() => setAnalyzingStage(2), 700);
      setTimeout(() => setAnalyzingStage(3), 1400);
      setTimeout(() => {
        setIsAnalyzing(false);
        const data: TestFormData = {
          email,
          pushups,
          plankSeconds,
          squats,
          exerciseFrequency: frequency,
          fitnessGoal: goal,
          workoutLocation: location,
        };
        const plan = generatePersonalizedPlan(data);
        onPlanGenerated(plan);
      }, 2100);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Stop the plank timer when navigating away from step 2
      if (currentStep === 2) {
        setIsTimerRunning(false);
      }
    }
  };

  const currentEstimatedLevel = calculateStrengthLevel(pushups, plankSeconds, squats);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        {/* Modal Top Bar */}
        <div className="bg-zinc-950 text-white p-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              60-Second Strength Assessment // Step {currentStep} of 4
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Line */}
        <div className="h-1 w-full bg-zinc-800">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {isAnalyzing ? (
            /* AI Processing Screen */
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-zinc-800 text-white border border-zinc-700 rounded-full flex items-center justify-center animate-spin">
                <Sparkles className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold font-mono uppercase text-white">
                  AI Calibrating Your Strength Profile...
                </h3>
                <p className="text-xs font-mono text-zinc-400 max-w-sm mx-auto">
                  Synthesizing push volume, core isometric rigidity, and recovery kinetics.
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 border border-zinc-800 bg-zinc-950 rounded-xl space-y-2 text-left font-mono text-xs text-zinc-300">
                <div className="flex items-center justify-between">
                  <span>[1/3] Upper Kinetic Ratio:</span>
                  <span className={analyzingStage >= 1 ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>
                    {analyzingStage >= 1 ? 'MEASURED' : 'ANALYZING...'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>[2/3] Spine Stabilization Index:</span>
                  <span className={analyzingStage >= 2 ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>
                    {analyzingStage >= 2 ? 'MEASURED' : 'PENDING...'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>[3/3] Progressive Overload Schedule:</span>
                  <span className={analyzingStage >= 3 ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>
                    {analyzingStage >= 3 ? 'CALIBRATED' : 'PENDING...'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: Push-ups */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2 pb-3 border-b border-zinc-800">
                    <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700">
                      QUESTION 01 / 04
                    </span>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      How many push-ups can you perform in a single set?
                    </h2>
                    <p className="text-xs font-mono text-zinc-400">
                      Standard chest-to-floor push-ups with full elbow extension. If you do knee or incline push-ups, count those!
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between">
                      <span className="font-mono text-xs text-zinc-400 uppercase">Max Rep Count:</span>
                      <div className="text-right">
                        <span className="font-mono text-3xl font-black text-white">{pushups}</span>
                        <span className="font-mono text-xs text-zinc-500 ml-1">reps</span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="60"
                      value={pushups}
                      onChange={(e) => setPushups(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white border border-zinc-700"
                    />

                    {/* Quick Rep Preset Buttons */}
                    <div className="grid grid-cols-5 gap-2">
                      {[0, 5, 12, 25, 45].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setPushups(val)}
                          className={`py-2 px-2 text-xs font-mono rounded border transition-all cursor-pointer ${
                            pushups === val
                              ? 'bg-white text-black font-bold border-white'
                              : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-white'
                          }`}
                        >
                          {val === 0 ? '0 (Knee)' : `${val} reps`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Plank */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2 pb-3 border-b border-zinc-800">
                    <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700">
                      QUESTION 02 / 04
                    </span>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      How long can you hold a standard forearm plank?
                    </h2>
                    <p className="text-xs font-mono text-zinc-400">
                      Tests core isometric rigidity. You can use our built-in stopwatch below or enter your estimate.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between">
                      <span className="font-mono text-xs text-zinc-400 uppercase">Duration:</span>
                      <div className="text-right">
                        <span className="font-mono text-3xl font-black text-white">{plankSeconds}</span>
                        <span className="font-mono text-xs text-zinc-500 ml-1">seconds</span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="5"
                      max="150"
                      step="5"
                      value={plankSeconds}
                      onChange={(e) => setPlankSeconds(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white border border-zinc-700"
                    />

                    {/* Live Plank Stopwatch Tool */}
                    <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-400">// LIVE PLANK TIMER</span>
                        <span className="font-bold text-white text-sm">{timerCount}s Elapsed</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setIsTimerRunning(!isTimerRunning)}
                          className="flex-1 py-2 bg-white text-black font-bold font-mono text-xs rounded flex items-center justify-center gap-1.5 cursor-pointer hover:bg-zinc-200 transition-colors"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>{isTimerRunning ? 'Pause Stopwatch' : 'Start Plank Now'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPlankSeconds(timerCount);
                            setIsTimerRunning(false);
                          }}
                          className="py-2 px-3 bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono text-xs rounded hover:bg-zinc-700 cursor-pointer"
                        >
                          Use {timerCount}s
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsTimerRunning(false);
                            setTimerCount(0);
                          }}
                          className="p-2 border border-zinc-700 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Squats */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2 pb-3 border-b border-zinc-800">
                    <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700">
                      QUESTION 03 / 04
                    </span>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      How many bodyweight squats can you perform?
                    </h2>
                    <p className="text-xs font-mono text-zinc-400">
                      Standard bodyweight squats to parallel or 90-degree knee flexion without resting hands on thighs.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between">
                      <span className="font-mono text-xs text-zinc-400 uppercase">Squat Reps:</span>
                      <div className="text-right">
                        <span className="font-mono text-3xl font-black text-white">{squats}</span>
                        <span className="font-mono text-xs text-zinc-500 ml-1">reps</span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="70"
                      value={squats}
                      onChange={(e) => setSquats(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white border border-zinc-700"
                    />

                    {/* Quick presets */}
                    <div className="grid grid-cols-4 gap-2">
                      {[5, 15, 30, 50].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setSquats(val)}
                          className={`py-2 px-2 text-xs font-mono rounded border transition-all cursor-pointer ${
                            squats === val
                              ? 'bg-white text-black font-bold border-white'
                              : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-white'
                          }`}
                        >
                          {val} reps
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Experience & Preferences */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="space-y-2 pb-3 border-b border-zinc-800">
                    <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700">
                      QUESTION 04 / 04
                    </span>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      Exercise History &amp; Delivery Setup
                    </h2>
                    <p className="text-xs font-mono text-zinc-400">
                      Final details to calibrate weekly frequency and equipment requirements.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Exercise Frequency */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold">
                        Do you currently exercise?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { val: 'never', label: 'Rarely / Never' },
                          { val: '1-2', label: '1 - 2 Days/wk' },
                          { val: '3-4', label: '3 - 4 Days/wk' },
                          { val: '5+', label: '5+ Days/wk' },
                        ].map((item) => (
                          <button
                            key={item.val}
                            type="button"
                            onClick={() => setFrequency(item.val as any)}
                            className={`p-2.5 text-xs font-mono border rounded text-center transition-all cursor-pointer ${
                              frequency === item.val
                                ? 'bg-white text-black font-bold border-white'
                                : 'bg-zinc-950 text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-white'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Workout Location */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold">
                        Preferred Location:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { val: 'home', label: 'Home (Bodyweight)' },
                          { val: 'gym', label: 'Gym (Equipment)' },
                          { val: 'both', label: 'Hybrid' },
                        ].map((item) => (
                          <button
                            key={item.val}
                            type="button"
                            onClick={() => setLocation(item.val as any)}
                            className={`p-2.5 text-xs font-mono border rounded text-center transition-all cursor-pointer ${
                              location === item.val
                                ? 'bg-white text-black font-bold border-white'
                                : 'bg-zinc-950 text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-white'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Email Input for Saving Plan */}
                    <div className="space-y-1 pt-2">
                      <label className="block text-xs font-mono uppercase text-zinc-400">
                        Email to Save Your Plan (Optional):
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-10 px-3 bg-zinc-950 border border-zinc-700 rounded-md font-mono text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!isAnalyzing && (
          <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className={`px-4 py-2 text-xs font-mono border rounded flex items-center gap-1.5 transition-colors ${
                currentStep === 1
                  ? 'opacity-40 cursor-not-allowed bg-zinc-900 border-zinc-800 text-zinc-600'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:text-white cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <div className="text-[11px] font-mono text-zinc-400 hidden sm:block">
              Strength Baseline: <strong className="text-white">{currentEstimatedLevel.toUpperCase()}</strong>
            </div>

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-white text-black font-bold px-5 py-2 text-xs font-mono uppercase tracking-wider rounded flex items-center gap-2 hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <span>{currentStep === 4 ? 'Generate My AI Plan' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
