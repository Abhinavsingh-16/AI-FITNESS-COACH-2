import { GoogleGenAI } from '@google/genai';

function cleanJsonString(str: string): string {
  let cleaned = str.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
}

async function generateWithGemini(ai: GoogleGenAI, prompt: string): Promise<string> {
  const candidateModels = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  let lastError: any = null;

  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
      if (response?.text) {
        return response.text;
      }
    } catch (err: any) {
      lastError = err;
      // If model not found (404), try fallback model
      if (err?.status === 404 || (typeof err?.message === 'string' && err.message.includes('not found'))) {
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error('No response from Gemini API');
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed. Only POST requests are supported.' });
  }

  // Parse body if delivered as string
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body.' });
    }
  }

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Missing request body.' });
  }

  const {
    pushups,
    plankSeconds,
    squats,
    exerciseFrequency,
    fitnessGoal,
    workoutLocation,
  } = body;

  // Basic input validation
  const errors: string[] = [];
  if (typeof pushups !== 'number' || isNaN(pushups) || pushups < 0) {
    errors.push('pushups must be a non-negative number');
  }
  if (typeof plankSeconds !== 'number' || isNaN(plankSeconds) || plankSeconds < 0) {
    errors.push('plankSeconds must be a non-negative number');
  }
  if (typeof squats !== 'number' || isNaN(squats) || squats < 0) {
    errors.push('squats must be a non-negative number');
  }
  if (typeof exerciseFrequency !== 'string' || !exerciseFrequency.trim()) {
    errors.push('exerciseFrequency must be a non-empty string');
  }
  if (typeof fitnessGoal !== 'string' || !fitnessGoal.trim()) {
    errors.push('fitnessGoal must be a non-empty string');
  }
  if (typeof workoutLocation !== 'string' || !workoutLocation.trim()) {
    errors.push('workoutLocation must be a non-empty string');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Invalid or missing required fields',
      details: errors,
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'Server configuration error: GEMINI_API_KEY is not set.',
    });
  }

  const prompt = `You are an expert certified strength and conditioning specialist (CSCS) and exercise physiologist.
Generate a personalized, science-backed weekly workout plan based strictly on the user's empirical test metrics:
- Push-ups Baseline: ${pushups} reps
- Plank Duration Baseline: ${plankSeconds} seconds
- Bodyweight Squats Baseline: ${squats} reps
- Current Exercise Frequency: ${exerciseFrequency}
- Primary Fitness Goal: ${fitnessGoal}
- Preferred Workout Location: ${workoutLocation}

You MUST return ONLY valid JSON matching this exact structure:
{
  "userStrengthLevel": "beginner" | "intermediate" | "advanced",
  "weeklySchedule": [
    {
      "day": "Monday",
      "focus": "string (e.g. Upper Body & Core Strength)",
      "exercises": [
        {
          "name": "string",
          "sets": 3,
          "repsOrDuration": "string (e.g. 8-10 reps or 30s hold)",
          "notes": "string (technique cues)",
          "targetMuscle": "string"
        }
      ]
    }
  ],
  "aiAnalysis": {
    "upperBodyRating": "string",
    "coreRating": "string",
    "lowerBodyRating": "string",
    "recommendedProgression": "string",
    "recoveryWindow": "string"
  }
}

Return ONLY valid JSON. No markdown formatting, no backticks, and no introductory or concluding text.`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const rawResponse = await generateWithGemini(ai, prompt);
    const cleaned = cleanJsonString(rawResponse);

    let parsedPlan: any;
    try {
      parsedPlan = JSON.parse(cleaned);
    } catch {
      return res.status(500).json({
        error: 'Failed to parse AI-generated workout plan as valid JSON.',
      });
    }

    return res.status(200).json(parsedPlan);
  } catch (error: any) {
    return res.status(500).json({
      error: 'Failed to generate workout plan from Gemini API.',
      message: typeof error?.message === 'string' ? error.message : 'Unknown error',
    });
  }
}
