import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn, signInWithGoogle } from '../data/auth';
import { hasRegistration } from '../data/registration';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleGoogleSignIn() {
    setError('');
    setGoogleLoading(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed. Please try again.');
      setGoogleLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email.trim(), password);

      const { data } = await supabase.auth.getUser();

      const registered = data.user ? await hasRegistration(data.user.id) : false;
      navigate(registered ? '/profile' : '/registration');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-md rounded-3xl border border-witcon-sage bg-white p-8 shadow-sm">
        <h1 className="font-display text-4xl font-bold text-witcon-deep-forest">Log in</h1>

        <p className="mt-2 text-sm text-witcon-brown">Welcome back to WiTCON 2027.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-witcon-brown">
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

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-witcon-brown"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            disabled={loading || googleLoading}
            className="w-full rounded-full bg-witcon-forest px-6 py-3 font-semibold text-white shadow-md transition hover:bg-witcon-deep-forest focus:outline-none focus:ring-2 focus:ring-witcon-sage focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-witcon-brown/70">
          <span className="h-px flex-1 bg-witcon-sage" />
          or
          <span className="h-px flex-1 bg-witcon-sage" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading || googleLoading}
          className="w-full rounded-full border border-witcon-forest px-6 py-3 font-semibold text-witcon-forest transition hover:bg-witcon-sage/20 focus:outline-none focus:ring-2 focus:ring-witcon-sage focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {googleLoading ? 'Connecting to Google…' : 'Continue with Google'}
        </button>

        <p className="mt-6 text-sm text-witcon-brown">
          <Link to="/forgot-password" className="underline">
            Forgot password?
          </Link>
          {' · '}
          <Link to="/registration" className="underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
