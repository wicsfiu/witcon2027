import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../data/auth';
import witcon2027Background from '../assets/witcon2027_background.webp';

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
    <section
      className="relative flex min-h-screen items-center justify-center bg-cream bg-cover bg-center px-4 py-14 sm:px-6"
      style={{ backgroundImage: `url(${witcon2027Background})` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-cream/35" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-peach bg-cream/95 p-6 shadow-md backdrop-blur-xs">
        <h1 className="font-the-seasons text-xl sm:text-2xl font-bold tracking-tight text-brown">
          Reset your password
        </h1>

        <p className="mt-1 font-arima text-xs text-light-brown">
          Enter your email and we&apos;ll send a reset link if an account exists.
        </p>

        {status === 'sent' ? (
          <p
            role="status"
            className="mt-4 rounded-2xl border border-peach/70 bg-white/80 p-3.5 font-arima text-xs leading-relaxed text-brown"
          >
            If that email has an account, reset instructions may arrive in your inbox. We cannot
            confirm delivery, so check your spam folder too.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@fiu.edu"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input !py-2 !text-xs"
              />
            </div>

            {status === 'error' && (
              <p role="alert" className="font-arima text-[11px] font-medium text-burgundy">
                Something went wrong. Please try again in a few minutes.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full cursor-pointer rounded-full bg-pink px-5 py-2 font-arima text-xs font-semibold tracking-wide text-white shadow-sm transition hover:bg-hot-pink focus:outline-none focus:ring-2 focus:ring-medium-pink focus:ring-offset-2 focus:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        )}

        <div className="mt-4 border-t border-peach/70 pt-3 font-arima text-[11px] text-light-brown">
          <Link
            to="/login"
            className="font-medium text-brown underline decoration-pink/60 underline-offset-4 transition hover:text-hot-pink"
          >
            Back to log in
          </Link>
        </div>
      </div>
    </section>
  );
}
