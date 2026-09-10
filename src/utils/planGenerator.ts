import { TestFormData, GeneratedWorkoutPlan } from '../types';

export function calculateStrengthLevel(
  pushups: number,
  plankSec: number,
  squats: number
): 'Beginner' | 'Novice' | 'Intermediate' | 'Advanced' {
  const score = pushups * 1.2 + (plankSec / 5) * 1.0 + squats * 0.8;
  if (score < 25) return 'Beginner';
  if (score < 50) return 'Novice';
  if (score < 85) return 'Intermediate';
  return 'Advanced';
}

export function generatePersonalizedPlan(data: TestFormData): GeneratedWorkoutPlan {
  const level = calculateStrengthLevel(data.pushups, data.plankSeconds, data.squats);

  // Scaled progressions based on baseline
  let mondayPushups: string;
  let mondaySquats: string;
  let mondayPlank: string;
  let wednesdayPush: string;
  let wednesdayLegs: string;
  let wednesdayCore: string;
  let fridayFullBody: string;

  if (level === 'Beginner') {
    const pushTarget = Math.max(4, Math.round(data.pushups * 0.7) || 5);
    const squatTarget = Math.max(8, Math.round(data.squats * 0.7) || 10);
    const plankTarget = Math.max(15, Math.round(data.plankSeconds * 0.6) || 15);
    
    mondayPushups = `Incline / Knee Push-ups (3×${pushTarget})`;
    mondaySquats = `Box / Bodyweight Squats (3×${squatTarget})`;
    mondayPlank = `Plank Hold (3×${plankTarget}s)`;
    
    wednesdayPush = `Wall / Countertop Push-ups (3×10)`;
    wednesdayLegs = `Static Lunges (3×8/side)`;
    wednesdayCore = `Bird-Dog & Deadbug (3×10)`;
    
    fridayFullBody = `Gentle Full Body Circuit (3 rounds)`;
  } else if (level === 'Novice') {
    const pushTarget = Math.max(8, Math.round(data.pushups * 0.75));
    const squatTarget = Math.max(12, Math.round(data.squats * 0.8));
    const plankTarget = Math.max(25, Math.round(data.plankSeconds * 0.7));

    mondayPushups = `Push-ups (3×${pushTarget})`;
    mondaySquats = `Bodyweight Squats (3×${squatTarget})`;
    mondayPlank = `Plank (3×${plankTarget}s)`;

    wednesdayPush = `Incline Push-ups (3×10)`;
    wednesdayLegs = `Walking Lunges (3×10/leg)`;
    wednesdayCore = `Hollow Body Hold (3×20s)`;

    fridayFullBody = `Full Body Strength Circuit (3 rounds)`;
  } else if (level === 'Intermediate') {
    const pushTarget = Math.max(15, Math.round(data.pushups * 0.8));
    const squatTarget = Math.max(20, Math.round(data.squats * 0.85));
    const plankTarget = Math.max(45, Math.round(data.plankSeconds * 0.75));

    mondayPushups = `Standard / Diamond Push-ups (4×${pushTarget})`;
    mondaySquats = `Tempo Squats with 3s Pause (4×${squatTarget})`;
    mondayPlank = `Weighted / Extended Plank (3×${plankTarget}s)`;

    wednesdayPush = `Decline Push-ups (4×12)`;
    wednesdayLegs = `Bulgarian Split Squats (3×12/leg)`;
    wednesdayCore = `Hanging Knee Raises / V-Ups (3×15)`;

    fridayFullBody = `High-Intensity Full Body Progression (4 rounds)`;
  } else {
    const pushTarget = Math.max(25, Math.round(data.pushups * 0.85));
    const squatTarget = Math.max(30, Math.round(data.squats * 0.9));
    const plankTarget = Math.max(60, Math.round(data.plankSeconds * 0.8));

    mondayPushups = `Archer / Explosive Push-ups (4×${pushTarget})`;
    mondaySquats = `Pistol Squats / Jump Squats (4×${squatTarget})`;
    mondayPlank = `RKC Hardstyle Plank (4×${plankTarget}s)`;

    wednesdayPush = `Deficit Push-ups (4×15)`;
    wednesdayLegs = `Single-Leg Box Squats (4×12/leg)`;
    wednesdayCore = `Dragon Flags / L-Sit (4×20s)`;

    fridayFullBody = `Elite Calisthenic & Strength Integration (5 rounds)`;
  }

  return {
    id: `PLAN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    userStrengthLevel: level,
    pushupBaseline: data.pushups,
    plankBaseline: data.plankSeconds,
    squatBaseline: data.squats,
    weeklySchedule: [
      {
        day: 'Monday',
        focus: 'Upper Body & Core Foundation',
        exercises: [
          {
            name: mondayPushups,
            sets: level === 'Beginner' ? 3 : 4,
            repsOrDuration: mondayPushups.split('(')[1]?.replace(')', '') || '3×10',
            notes: 'Rest 60-90s between sets. Focus on locked core and full range of motion.',
            targetMuscle: 'Chest, Triceps, Anterior Deltoids'
          },
          {
            name: mondaySquats,
            sets: 3,
            repsOrDuration: mondaySquats.split('(')[1]?.replace(')', '') || '3×12',
            notes: 'Control the eccentric descent for 2 full seconds. Keep chest tall.',
            targetMuscle: 'Quadriceps, Glutes, Hamstrings'
          },
          {
            name: mondayPlank,
            sets: 3,
            repsOrDuration: mondayPlank.split('(')[1]?.replace(')', '') || '3×25s',
            notes: 'Squeeze glutes and engage lats to brace lumbar spine.',
            targetMuscle: 'Transverse Abdominis, Core Stabilizers'
          }
        ]
      },
      {
        day: 'Wednesday',
        focus: 'Unilateral Strength & Kinetic Balance',
        exercises: [
          {
            name: wednesdayLegs,
            sets: 3,
            repsOrDuration: wednesdayLegs.split('(')[1]?.replace(')', '') || '3×10',
            notes: 'Ensures left/right leg strength symmetry to protect knee joints.',
            targetMuscle: 'Glutes, Hip Adductors, Quads'
          },
          {
            name: wednesdayPush,
            sets: 3,
            repsOrDuration: wednesdayPush.split('(')[1]?.replace(')', '') || '3×10',
            notes: 'Adjust angle if fatigue breaks scapular retraction.',
            targetMuscle: 'Upper Chest, Shoulders, Triceps'
          },
          {
            name: wednesdayCore,
            sets: 3,
            repsOrDuration: wednesdayCore.split('(')[1]?.replace(')', '') || '3×15',
            notes: 'Move strictly with controlled breathing—no momentum.',
            targetMuscle: 'Obliques, Rectus Abdominis'
          }
        ]
      },
      {
        day: 'Friday',
        focus: 'Full Body Integration & Progressive Overload',
        exercises: [
          {
            name: fridayFullBody,
            sets: 3,
            repsOrDuration: '3-4 progressive rounds',
            notes: 'Synthesizes push, pull, squat, and hinge patterns calibrated to your baseline.',
            targetMuscle: 'Full Body Kinetic Chain'
          },
          {
            name: 'Scapular Pull / Doorway Rows (3×10)',
            sets: 3,
            repsOrDuration: '3×10',
            notes: 'Crucial antagonist pulling work to balance Monday and Wednesday pressing.',
            targetMuscle: 'Rhomboids, Middle Trapezius, Posterior Deltoid'
          },
          {
            name: 'Side Plank Holds (3×20s per side)',
            sets: 3,
            repsOrDuration: '3×20s/side',
            notes: 'Stabilizes lateral trunk and improves pelvic alignment.',
            targetMuscle: 'Quadratus Lumborum, Obliques'
          }
        ]
      }
    ],
    aiAnalysis: {
      upperBodyRating: data.pushups < 10 ? 'Developing baseline (knee/incline focus)' : data.pushups < 25 ? 'Solid foundation (hypertrophy range)' : 'High strength-to-weight ratio',
      coreRating: data.plankSeconds < 30 ? 'Initial stabilization phase' : data.plankSeconds < 60 ? 'Good endurance & spine control' : 'Advanced trunk rigidity',
      lowerBodyRating: data.squats < 15 ? 'Movement pattern coaching recommended' : data.squats < 35 ? 'Balanced leg power' : 'Exceptional lower chain endurance',
      recommendedProgression: level === 'Beginner' ? '+1 rep or +3 seconds per week' : '+2 reps and reduced rest interval by 5s weekly',
      recoveryWindow: '48 hours between strenuous sessions with active mobility on rest days'
    }
  };
}
