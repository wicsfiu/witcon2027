import { supabase } from '../lib/supabaseClient';

function authError(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes('invalid login credentials')) {
    return new Error('Incorrect email or password.');
  }
  if (normalized.includes('already registered')) {
    return new Error('An account with this email already exists. Please log in instead.');
  }
  if (normalized.includes('email not confirmed')) {
    return new Error('Please confirm your email address before logging in.');
  }
  return new Error('Authentication failed. Please try again.');
}

export async function signUp(email: string, password: string): Promise<string> {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw authError(error.message);
  }

  if (!data.session || !data.user) {
    throw new Error('Account created. Please confirm your email, then log in to continue.');
  }

  return data.user.id;
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw authError(error.message);
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw new Error('Google sign-in could not be started. Please try again.');
}

export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
}

export async function setNewPassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new Error('Could not update your password. Please request a new reset link.');
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error('Could not sign out. Please try again.');
}
