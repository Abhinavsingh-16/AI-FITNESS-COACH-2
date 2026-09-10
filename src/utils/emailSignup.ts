import { supabase } from './supabaseClient';

export interface EmailSignupResult {
  success: boolean;
  error?: string;
}

export async function signupEmail(email: string): Promise<EmailSignupResult> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedEmail = email.trim();

  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  try {
    const { error: insertError } = await supabase
      .from('email_signups')
      .insert([{ email: trimmedEmail }]);

    if (insertError) {
      if (
        insertError.code === '23505' ||
        insertError.message?.toLowerCase().includes('duplicate') ||
        insertError.message?.toLowerCase().includes('unique')
      ) {
        return { success: false, error: 'This email is already signed up.' };
      } else {
        return { success: false, error: 'Something went wrong, please try again.' };
      }
    }

    return { success: true };
  } catch {
    return { success: false, error: 'Something went wrong, please try again.' };
  }
}
