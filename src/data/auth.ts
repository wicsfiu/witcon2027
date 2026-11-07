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

export async function signUp(
  email: string,
  password: string,
): Promise<{ needsConfirmation: boolean }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // The confirmation email sends the student back to the registration form.
      emailRedirectTo: `${window.location.origin}/registration`,
    },
  });

  if (error) {
    throw authError(error.message);
  }

  // With "Confirm email" on, there is no session until the link is clicked.
  return { needsConfirmation: !data.session };
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

function getPasswordResetRedirectUrl() {
  const isLocalhost = window.location.hostname === 'localhost';

  if (isLocalhost) {
    return `${window.location.origin}/reset-password`;
  }

  return `${window.location.origin}/reset-password`;
}

export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: getPasswordResetRedirectUrl(),
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