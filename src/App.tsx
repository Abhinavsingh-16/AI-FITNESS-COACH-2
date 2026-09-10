/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StrengthTestPreview } from './components/StrengthTestPreview';
import { ExamplePlanSection } from './components/ExamplePlanSection';
import { KeyBenefitsSection } from './components/KeyBenefitsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { EarlyResultsSection } from './components/EarlyResultsSection';
import { ScienceSection } from './components/ScienceSection';
import { FinalCTASection } from './components/FinalCTASection';
import { EmailSignupSection } from './components/EmailSignupSection';
import { Footer } from './components/Footer';
import { FitnessTestModal } from './components/FitnessTestModal';
import { GeneratedPlanModal } from './components/GeneratedPlanModal';
import { GeneratedWorkoutPlan } from './types';

export default function App() {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [activePlan, setActivePlan] = useState<GeneratedWorkoutPlan | null>(null);
  const [initialTestValues, setInitialTestValues] = useState<{
    pushups: number;
    plankSeconds: number;
    squats: number;
    frequency: 'never' | '1-2' | '3-4' | '5+';
  } | undefined>(undefined);

  const handleStartTest = (email?: string) => {
    setInitialTestValues(undefined);
    if (email) setUserEmail(email);
    setIsTestModalOpen(true);
  };

  const handleOpenWithInitialValues = (values?: {
    pushups: number;
    plankSeconds: number;
    squats: number;
    frequency: 'never' | '1-2' | '3-4' | '5+';
  }) => {
    if (values) {
      setInitialTestValues(values);
    }
    setIsTestModalOpen(true);
  };

  const handlePlanGenerated = (plan: GeneratedWorkoutPlan) => {
    setActivePlan(plan);
    setIsTestModalOpen(false);
    setIsPlanModalOpen(true);
  };

  const handleRetakeTest = () => {
    setIsPlanModalOpen(false);
    setIsTestModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-zinc-100 selection:bg-zinc-800 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenTest={() => handleStartTest()} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection onStartTestWithEmail={handleStartTest} />

        {/* 2. Quick Fitness Test Preview */}
        <StrengthTestPreview onOpenFullTest={handleOpenWithInitialValues} />

        {/* 3. Example AI Generated Plan */}
        <ExamplePlanSection onOpenTest={() => handleStartTest()} />

        {/* 4. Key Benefits Section */}
        <KeyBenefitsSection />

        {/* 5. How It Works Section */}
        <HowItWorksSection onOpenTest={() => handleStartTest()} />

        {/* 6. Early User Results & Media Upload */}
        <EarlyResultsSection />

        {/* 7. Science Behind the Training */}
        <ScienceSection />

        {/* 8. Final CTA Section */}
        <FinalCTASection onOpenTest={() => handleStartTest()} />

        {/* 9. Email Signup Section */}
        <EmailSignupSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive 60-Second Test Modal */}
      <FitnessTestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        onPlanGenerated={handlePlanGenerated}
        initialEmail={userEmail}
        initialValues={initialTestValues}
      />

      {/* Generated AI Workout Plan Modal */}
      <GeneratedPlanModal
        plan={activePlan}
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        onRetakeTest={handleRetakeTest}
      />
    </div>
  );
}
