import React, { useState } from 'react';
import { Activity, Dumbbell, Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { signupEmail } from '../utils/emailSignup';

interface NavbarProps {
  onOpenTest: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTest }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signupEmail(email);

    if (result.success) {
      setSubscribed(true);
      setEmail('');
    } else {
      setError(result.error || 'Something went wrong, please try again.');
    }

    setLoading(false);
  };

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
          {/* Compact Email Signup - Hidden on small screens */}
          <div className="hidden md:flex items-center gap-2">
            {subscribed ? (
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Subscribed!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    disabled={loading}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className={`w-40 h-8 px-2.5 bg-zinc-900 border rounded-sm text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white disabled:opacity-50 ${error ? 'border-rose-500' : 'border-zinc-700'}`}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-8 px-3 bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-700"
                  >
                    {loading ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <>
                        <Mail className="w-3 h-3" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                </form>
                {error && (
                  <div className="text-rose-400 text-[10px] font-mono max-w-32">
                    {error}
                  </div>
                )}
              </div>
            )}
          </div>

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
