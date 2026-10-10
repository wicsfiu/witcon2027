import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../data/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    try {
      await requestPasswordReset(email.trim());
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-md rounded-3xl border border-witcon-sage bg-white p-8 shadow-sm">
        <h1 className="font-display text-4xl font-bold text-witcon-deep-forest">
          Reset your password
        </h1>

        {status === 'sent' ? (
          <p role="status" className="mt-4 text-witcon-brown">
            If that email has an account, reset instructions may arrive in your inbox. We cannot
            confirm delivery, so check your spam folder too.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-witcon-brown"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            {status === 'error' && (
              <p role="alert" className="text-sm text-witcon-terracotta">
                Something went wrong. Please try again in a few minutes.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-full bg-witcon-forest px-6 py-3 font-semibold text-white shadow-md transition hover:bg-witcon-deep-forest focus:outline-none focus:ring-2 focus:ring-witcon-sage focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        )}

        <p className="mt-6 text-sm text-witcon-brown">
          <Link to="/login" className="underline">
            Back to log in
          </Link>
        </p>
      </div>
    </section>
  );
}
