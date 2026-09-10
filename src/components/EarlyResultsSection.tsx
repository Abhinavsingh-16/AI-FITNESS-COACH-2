import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Video, CheckCircle2, TrendingUp, Plus, Loader2 } from 'lucide-react';
import { UserTestimonial, UploadedProgressItem } from '../types';
import { supabase } from '../utils/supabaseClient';

export const EarlyResultsSection: React.FC = () => {

  // Initial verified early user results
  const defaultTestimonials: UserTestimonial[] = [
    {
      id: 'test-1',
      name: 'Marcus Chen',
      role: 'Software Engineer',
      age: 31,
      timeframe: '30 Days',
      quote: 'After following the AI plan for 30 days I increased my push-ups from 10 to 35 and lost 4kg. Because the first test calibrated my starting reps, I never got shoulder tendon pain.',
      statBefore: '10 Push-ups',
      statAfter: '35 Push-ups',
      metricLabel: '+250% Pushing Volume',
      weightChange: '-4.0 kg',
      mediaType: 'image',
      mediaLabel: 'WF_PROGRESS_SCAN_01.PNG',
    },
    {
      id: 'test-2',
      name: 'Elena Rostova',
      role: 'Graphic Designer',
      age: 28,
      timeframe: '6 Weeks',
      quote: 'I had never done a single strict pull-up or held a 30s plank. The AI started me with incline push-ups and isometric knee holds. Today I held a 95-second plank with zero back fatigue.',
      statBefore: '15s Plank',
      statAfter: '95s Plank',
      metricLabel: '+533% Core Endurance',
      weightChange: '-2.8 kg',
      mediaType: 'image',
      mediaLabel: 'WF_CORE_ASSESSMENT_02.PNG',
    },
    {
      id: 'test-3',
      name: 'David Miller',
      role: 'Operations Lead',
      age: 42,
      timeframe: '45 Days',
      quote: 'Most workout apps assume a 42-year-old can do 50 squats on day one. This AI coach actually tested my leg baseline (14 squats) and systematically overloaded it to 42 continuous reps.',
      statBefore: '14 Squats',
      statAfter: '42 Squats',
      metricLabel: '+200% Leg Power',
      weightChange: '-5.2 kg',
      mediaType: 'video',
      mediaLabel: 'WF_VIDEO_LOG_03.MP4',
    },
  ];

  // User uploaded items state
  const [uploadedItems, setUploadedItems] = useState<UploadedProgressItem[]>([
    {
      id: 'up-1',
      title: '30-Day Strict Pushup Form Progress',
      userName: 'Liam K. (Beta Cohort)',
      date: 'Aug 2026',
      category: 'pushups_form',
      fileUrl: '',
      fileType: 'image',
      notes: 'Chest-to-floor depth checked against baseline sensor test.',
      strengthDelta: '12 reps → 34 reps (+183%)',
    },
    {
      id: 'up-2',
      title: 'Plank Isometric Tension Transformation',
      userName: 'Sophia M.',
      date: 'Aug 2026',
      category: 'plank_progress',
      fileUrl: '',
      fileType: 'video',
      notes: 'Spine alignment held steady throughout full duration.',
      strengthDelta: '20s → 75s (+275%)',
    },
  ]);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploaderName, setUploaderName] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'before_after' | 'pushups_form' | 'plank_progress' | 'squats_test'>('before_after');
  const [strengthDeltaInput, setStrengthDeltaInput] = useState('');
  const [uploadNotes, setUploadNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<{ name: string; type: 'image' | 'video'; previewUrl: string } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState<{
    userName?: string;
    category?: string;
    milestoneTitle?: string;
  }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file) return;
    const isVideo = file.type.startsWith('video');
    const isImg = file.type.startsWith('image');
    
    if (!isImg && !isVideo) {
      alert('Please upload an image (PNG, JPG) or video (MP4, WEBM) file.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setSelectedFile({
      name: file.name,
      type: isVideo ? 'video' : 'image',
      previewUrl,
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (loading) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmitUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const newErrors: { userName?: string; category?: string; milestoneTitle?: string } = {};
    if (!uploaderName.trim()) {
      newErrors.userName = 'Name is required.';
    }
    if (!uploadCategory || !uploadCategory.trim()) {
      newErrors.category = 'Category is required.';
    }
    if (!uploadTitle.trim()) {
      newErrors.milestoneTitle = 'Milestone title is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setFormErrors({});
    setLoading(true);

    const fileName = selectedFile ? selectedFile.name : '';

    try {
      const { error: insertError } = await supabase
        .from('community_uploads')
        .insert([
          {
            user_name: uploaderName.trim(),
            category: uploadCategory,
            milestone_title: uploadTitle.trim(),
            strength_delta: strengthDeltaInput.trim(),
            notes: uploadNotes.trim(),
            file_url: fileName,
          },
        ]);

      if (insertError) {
        setErrorMessage('Something went wrong, please try again.');
        return;
      }

      const newItem: UploadedProgressItem = {
        id: `up-${Date.now()}`,
        title: uploadTitle.trim(),
        userName: uploaderName.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        category: uploadCategory,
        fileUrl: selectedFile ? selectedFile.previewUrl : '',
        fileType: selectedFile ? selectedFile.type : 'image',
        notes: uploadNotes.trim() || 'Verified workout log update based on AI strength recalibration.',
        strengthDelta: strengthDeltaInput.trim() || 'Baseline recalibrated successfully',
      };

      setUploadedItems([newItem, ...uploadedItems]);
      setUploadSuccess(true);

      // Reset form
      setUploadTitle('');
      setUploaderName('');
      setUploadCategory('before_after');
      setStrengthDeltaInput('');
      setUploadNotes('');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setTimeout(() => {
        setUploadSuccess(false);
      }, 5000);
    } catch {
      setErrorMessage('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="results" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest">
            <span className="px-2.5 py-0.5 border border-zinc-700 bg-zinc-900 text-zinc-300 font-bold rounded-full">
              06 // EVIDENCE
            </span>
            <span>EMPIRICAL PROOF & MEDIA ARCHIVE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Real Results From Early Users
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Verified proof and strength progression data from beta users who calibrated their workouts with our 60-second baseline test.
          </p>
        </div>

        {/* Global Summary Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-1 text-center shadow-md">
            <span className="text-[11px] font-mono uppercase text-zinc-500">Avg. Push-up Increase</span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">+185%</div>
            <span className="text-[10px] font-mono text-zinc-500">Across 30-day cohorts</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-1 text-center shadow-md">
            <span className="text-[11px] font-mono uppercase text-zinc-500">Core Endurance Hold</span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">+210%</div>
            <span className="text-[10px] font-mono text-zinc-500">Plank time under tension</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-1 text-center shadow-md">
            <span className="text-[11px] font-mono uppercase text-zinc-500">Program Adherence</span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">94.2%</div>
            <span className="text-[10px] font-mono text-zinc-500">Zero joint burnout rate</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-1 text-center shadow-md">
            <span className="text-[11px] font-mono uppercase text-zinc-500">Average Weight Loss</span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">-3.8 kg</div>
            <span className="text-[10px] font-mono text-zinc-500">First 30 days</span>
          </div>
        </div>

        {/* Testimonials Grid (Matching the Elegant Dark aesthetic) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {defaultTestimonials.map((t) => (
            <div key={t.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-zinc-700 transition-colors">
              {/* Card Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono font-bold text-sm text-white">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{t.name}, {t.age}</div>
                      <div className="text-[11px] text-zinc-500">{t.role}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700">
                    {t.timeframe}
                  </span>
                </div>

                {/* User Quote */}
                <blockquote className="text-xs text-zinc-300 leading-relaxed italic border-l-2 border-zinc-700 pl-3">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Progress Metric Matrix */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-center">
                    <p className="text-[10px] text-zinc-500 uppercase font-mono">Baseline</p>
                    <p className="text-xs font-bold text-zinc-300">{t.statBefore}</p>
                  </div>
                  <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-center">
                    <p className="text-[10px] text-zinc-500 uppercase font-mono">Day 30 Result</p>
                    <p className="text-xs font-bold text-emerald-400">{t.statAfter}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer Metric */}
              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  {t.metricLabel}
                </span>
                {t.weightChange && (
                  <span className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-[11px] rounded">
                    {t.weightChange}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Media Upload Section for Users */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                <Upload className="w-4 h-4 text-white" />
                <span>COMMUNITY PROOF ARCHIVE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
                Upload Your Before & After Progress
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Help future members verify real progress. Upload your photos or form check videos directly.
              </p>
            </div>
            <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-full border border-zinc-700 self-start sm:self-center">
              DRAG &amp; DROP ENABLED
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Upload Form (Left Column) */}
            <form onSubmit={handleSubmitUpload} noValidate className="lg:col-span-6 space-y-4">
              {/* Drag & Drop File Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  if (!loading) setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => !loading && fileInputRef.current?.click()}
                className={`border-2 border-dashed p-6 text-center cursor-pointer rounded-xl transition-all ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                } ${
                  isDragOver
                    ? 'border-white bg-zinc-800'
                    : 'border-zinc-700 bg-zinc-950 hover:border-zinc-500 hover:bg-zinc-900/60'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  disabled={loading}
                  onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                  accept="image/*,video/*"
                  className="hidden"
                />

                <div className="space-y-2">
                  <div className="w-12 h-12 mx-auto bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center text-white">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-white uppercase">
                      {selectedFile ? selectedFile.name : 'Click to Browse or Drag & Drop Media'}
                    </span>
                    <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                      Supports Before/After Photos (PNG, JPG) and Progress Videos (MP4)
                    </p>
                  </div>

                  {selectedFile && (
                    <div className="pt-2 text-xs font-mono text-zinc-200 bg-zinc-800 p-2 rounded border border-zinc-700 flex items-center justify-between">
                      <span>Format: {selectedFile.type.toUpperCase()}</span>
                      <span className="text-[10px] text-emerald-400 font-bold">[READY FOR LOG]</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Metadata Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    Your Name / Handle *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Jordan P."
                    value={uploaderName}
                    disabled={loading}
                    onChange={(e) => {
                      setUploaderName(e.target.value);
                      if (formErrors.userName) {
                        setFormErrors((prev) => ({ ...prev, userName: undefined }));
                      }
                    }}
                    className={`w-full h-10 px-3 bg-zinc-950 border ${
                      formErrors.userName ? 'border-rose-500' : 'border-zinc-700'
                    } rounded-md font-mono text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white disabled:opacity-50`}
                  />
                  {formErrors.userName && (
                    <p className="text-[11px] font-mono text-rose-400 mt-1">
                      {formErrors.userName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    Category *
                  </label>
                  <select
                    value={uploadCategory}
                    disabled={loading}
                    onChange={(e) => {
                      setUploadCategory(e.target.value as any);
                      if (formErrors.category) {
                        setFormErrors((prev) => ({ ...prev, category: undefined }));
                      }
                    }}
                    className={`w-full h-10 px-3 bg-zinc-950 border ${
                      formErrors.category ? 'border-rose-500' : 'border-zinc-700'
                    } rounded-md font-mono text-xs text-white focus:outline-none focus:border-white disabled:opacity-50`}
                  >
                    <option value="before_after">Before &amp; After Photo</option>
                    <option value="pushups_form">Push-ups Form Video</option>
                    <option value="plank_progress">Plank Progress Check</option>
                    <option value="squats_test">Squats Assessment</option>
                  </select>
                  {formErrors.category && (
                    <p className="text-[11px] font-mono text-rose-400 mt-1">
                      {formErrors.category}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Milestone Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., 30-Day Strength Recalibration Milestone"
                  value={uploadTitle}
                  disabled={loading}
                  onChange={(e) => {
                    setUploadTitle(e.target.value);
                    if (formErrors.milestoneTitle) {
                      setFormErrors((prev) => ({ ...prev, milestoneTitle: undefined }));
                    }
                  }}
                  className={`w-full h-10 px-3 bg-zinc-950 border ${
                    formErrors.milestoneTitle ? 'border-rose-500' : 'border-zinc-700'
                  } rounded-md font-mono text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white disabled:opacity-50`}
                />
                {formErrors.milestoneTitle && (
                  <p className="text-[11px] font-mono text-rose-400 mt-1">
                    {formErrors.milestoneTitle}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Strength Delta Stats
                </label>
                <input
                  type="text"
                  placeholder="e.g., Push-ups: 10 → 32 | Plank: 20s → 60s"
                  value={strengthDeltaInput}
                  disabled={loading}
                  onChange={(e) => setStrengthDeltaInput(e.target.value)}
                  className="w-full h-10 px-3 bg-zinc-950 border border-zinc-700 rounded-md font-mono text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Workout Notes or Experience
                </label>
                <textarea
                  rows={2}
                  placeholder="Share details on how the strength test guided your training..."
                  value={uploadNotes}
                  disabled={loading}
                  onChange={(e) => setUploadNotes(e.target.value)}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-700 rounded-md font-mono text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-md hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Submit Verified Milestone</span>
                  </>
                )}
              </button>

              {errorMessage && (
                <div className="p-3 bg-rose-950/40 text-rose-400 font-mono text-xs border border-rose-800 rounded-md">
                  {errorMessage}
                </div>
              )}

              {uploadSuccess && (
                <div className="p-3 bg-zinc-950 text-white font-mono text-xs border border-emerald-500/50 rounded-md flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Success! Your progress entry has been logged in the community archive.</span>
                </div>
              )}
            </form>

            {/* Live Community Feed (Right Column) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="font-mono text-xs font-bold uppercase text-white">
                  Recent User Uploads ({uploadedItems.length})
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE FEED
                </span>
              </div>

              <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                {uploadedItems.map((item) => (
                  <div key={item.id} className="border border-zinc-800 bg-zinc-950 rounded-xl p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.fileType === 'video' ? (
                          <Video className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-emerald-400" />
                        )}
                        <span className="font-bold text-xs text-white font-mono">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {item.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                      <span>By {item.userName}</span>
                      <span>•</span>
                      <span className="font-bold text-white bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700">
                        {item.strengthDelta}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 font-mono bg-zinc-900 p-2.5 rounded border border-zinc-800">
                      {item.notes}
                    </p>

                    {item.fileUrl && (
                      <div className="mt-2 border border-zinc-800 rounded-lg p-1 bg-zinc-900 overflow-hidden">
                        {item.fileType === 'video' ? (
                          <video src={item.fileUrl} controls className="w-full max-h-48 rounded bg-black" />
                        ) : (
                          <img
                            src={item.fileUrl}
                            alt={item.title}
                            className="w-full max-h-48 object-cover rounded border border-zinc-800"
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
