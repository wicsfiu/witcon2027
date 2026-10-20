import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { setNewPassword } from '../data/auth';

const MIN_LENGTH = 10;

export default function ResetPassword() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [recoveryError, setRecoveryError] = useState('');

  useEffect(() => {
    let active = true;

    async function prepareRecovery() {
      try {
        // Supabase normally processes recovery links automatically.
        // This also handles links that include an access token in the URL hash.
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.replace(/^#/, ''));

        const urlError = params.get('error_description') || params.get('error');
        if (urlError) {
          if (active) {
            setRecoveryError(
              'This reset link is invalid or has expired. Please request a new one.'
            );
          }
          return;
        }

        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const type = params.get('type');

        if (accessToken && refreshToken && type === 'recovery') {
          const { error: sessionError } =
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

          if (sessionError) {
            if (active) {
              setRecoveryError(
                'This reset link is invalid or has expired. Please request a new one.'
              );
            }
            return;
          }
        }

        // Read the session after allowing Supabase to process the link.
        const { data, error: sessionError } =
          await supabase.auth.getSession();

        if (!active) return;

        if (sessionError || !data.session) {
          setRecoveryError(
            'This reset link is invalid or has expired. Please request a new one.'
          );
          return;
        }

        setRecoveryReady(true);
      } catch {
        if (active) {
          setRecoveryError(
            'We could not verify this reset link. Please request a new one.'
          );
        }
      }
    }

    void prepareRecovery();

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (password.length < MIN_LENGTH) {
      setError(`Password must be at least ${MIN_LENGTH} characters.`);
      return;
    }

    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setSaving(true);

    try {
      await setNewPassword(password);

      // Password updated successfully; send the user to their profile.
      navigate('/profile', { replace: true });
    } catch {
      setError(
        "Couldn't update your password. The reset link may have expired. Please request a new one if needed."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading || (!recoveryReady && !recoveryError)) {
    return (
      <p
        role="status"
        className="p-8 text-center text-witcon-brown"
      >
        Verifying your reset link…
      </p>
    );
  }

  if (recoveryError || !session) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md rounded-3xl border border-witcon-sage bg-white p-8 shadow-sm">
          <h1 className="font-display text-3xl font-bold text-witcon-deep-forest">
            Reset link unavailable
          </h1>

          <p role="alert" className="mt-4 text-witcon-brown">
            {recoveryError ||
              'This reset link is invalid or has expired. Please request a new one.'}
          </p>

          <Link
            to="/forgot-password"
            className="mt-6 inline-block rounded-full bg-witcon-deep-forest px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Request a new link
          </Link>

          <p className="mt-4 text-sm text-witcon-brown">
            <Link to="/login" className="underline">
              Back to log in
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-md rounded-3xl border border-witcon-sage bg-white p-8 shadow-sm">
        <h1 className="font-display text-4xl font-bold text-witcon-deep-forest">
          Create a new password
        </h1>

        <p className="mt-3 text-witcon-brown">
          Choose a new password for your account. It must be at least{' '}
          {MIN_LENGTH} characters long.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-witcon-brown"
            >
              New password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={MIN_LENGTH}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-1.5 block text-sm font-semibold text-witcon-brown"
            >
              Confirm new password
            </label>

            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={MIN_LENGTH}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="form-input"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-witcon-terracotta">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-witcon-deep-forest px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Updating password…' : 'Update password'}
          </button>
        </form>

        <p className="mt-6 text-sm text-witcon-brown">
          <Link to="/login" className="underline">
            Back to log in
          </Link>
        </p>
      </div>
    </section>
  );
}
