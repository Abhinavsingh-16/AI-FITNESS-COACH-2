import React, { useState } from 'react';
import { Mail, CheckCircle2, Bell } from 'lucide-react';


export const EmailSignupSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || email.indexOf('@') === email.length - 1) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    // TODO: Phase 3 - connect to Supabase (send email to newsletter subscribers table instead of local state only)
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section id="newsletter" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] text-white border-b border-zinc-800">
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-10 text-white relative shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800 text-zinc-500 font-mono text-xs">
            <span className="uppercase tracking-widest">// SECTION 09 : KNOWLEDGE_DISPATCH</span>
            <span>WEEKLY CADENCE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Title & description */}
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-zinc-700 bg-zinc-800 text-zinc-300 text-xs font-mono rounded-full">
                <Bell className="w-3.5 h-3.5 text-emerald-400" />
                <span>EXERCISE SCIENCE DIGEST</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
                Get Weekly Fitness Tips
              </h2>

              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Evidence-based training breakdowns, form correction guides, progression strategies, and nutritional recovery cues delivered to your inbox every Sunday.
              </p>
            </div>

            {/* Email Form & CTA */}
            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-5 border border-zinc-700 bg-zinc-950 rounded-xl space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>SUBSCRIPTION CONFIRMED</span>
                  </div>
                  <p className="text-zinc-400">
                    You have been subscribed to our weekly exercise science newsletter. Look out for the first issue this Sunday.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubscribed(false)}
                    className="text-zinc-300 underline text-[11px] pt-1 hover:text-white cursor-pointer"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-zinc-400 uppercase">
                      Email Address:
                    </label>
                    <div className="relative">
                      <input
                        id="newsletter-email-input"
                        type="email"
                        placeholder="yourname@domain.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        className="w-full h-12 px-4 bg-zinc-950 border border-zinc-700 rounded-md font-sans text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs font-mono text-rose-400 bg-rose-950/40 p-2 border border-rose-800 rounded">
                      {error}
                    </p>
                  )}

                  <button
                    id="subscribe-cta-btn"
                    type="submit"
                    className="w-full h-12 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-md hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Subscribe for Fitness Tips</span>
                  </button>

                  <p className="text-[11px] font-mono text-zinc-500 text-center">
                    No spam ever. 1-click unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
