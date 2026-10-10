import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
      navigate('/profile');
    } catch {
      setError("Couldn't update your password. The link may have expired.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p role="status" className="p-8 text-center text-witcon-brown">
        Loading…
      </p>
    );
  }

  if (!session) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md rounded-3xl border border-witcon-sage bg-white p-8 text-center shadow-sm">
          <p role="alert" className="text-witcon-brown">
            This reset link is invalid or has expired.
          </p>
          <Link
            to="/forgot-password"
            className="mt-4 inline-block font-semibold text-witcon-forest underline"
          >
            Request a new link
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-md rounded-3xl border border-witcon-sage bg-white p-8 shadow-sm">
        <h1 className="font-display text-4xl font-bold text-witcon-deep-forest">
          Choose a new password
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-witcon-brown"
            >
              New password (10+ characters)
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
              htmlFor="confirm"
              className="mb-1.5 block text-sm font-semibold text-witcon-brown"
            >
              Confirm new password
            </label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              required
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
            className="w-full rounded-full bg-witcon-forest px-6 py-3 font-semibold text-white shadow-md transition hover:bg-witcon-deep-forest focus:outline-none focus:ring-2 focus:ring-witcon-sage focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Update password'}
          </button>
        </form>
      </div>
    </section>
  );
}
