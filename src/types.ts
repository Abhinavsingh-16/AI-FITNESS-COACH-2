export interface TestFormData {
  email?: string;
  pushups: number;
  plankSeconds: number;
  squats: number;
  exerciseFrequency: 'never' | '1-2' | '3-4' | '5+';
  fitnessGoal: 'build_strength' | 'lose_fat' | 'improve_endurance' | 'general_health';
  workoutLocation: 'home' | 'gym' | 'both';
}

export interface WorkoutExercise {
  name: string;
  sets: number;
  repsOrDuration: string;
  notes: string;
  targetMuscle: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: WorkoutExercise[];
}

export interface GeneratedWorkoutPlan {
  id: string;
  createdAt: string;
  userStrengthLevel: 'Beginner' | 'Novice' | 'Intermediate' | 'Advanced';
  pushupBaseline: number;
  plankBaseline: number;
  squatBaseline: number;
  weeklySchedule: WorkoutDay[];
  aiAnalysis: {
    upperBodyRating: string;
    coreRating: string;
    lowerBodyRating: string;
    recommendedProgression: string;
    recoveryWindow: string;
  };
}

export interface UserTestimonial {
  id: string;
  name: string;
  role: string;
  age: number;
  timeframe: string;
  quote: string;
  statBefore: string;
  statAfter: string;
  metricLabel: string;
  weightChange?: string;
  mediaType: 'image' | 'video';
  mediaLabel: string;
}

export interface UploadedProgressItem {
  id: string;
  title: string;
  userName: string;
  date: string;
  category: 'before_after' | 'pushups_form' | 'plank_progress' | 'squats_test';
  fileUrl: string;
  fileType: 'image' | 'video';
  notes: string;
  strengthDelta: string;
}
