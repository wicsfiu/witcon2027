import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn, signInWithGoogle } from '../data/auth';
import { hasRegistration } from '../data/registration';
import { supabase } from '../lib/supabaseClient';
import witcon2027Background from '../assets/witcon2027_background.webp';
import keyboardSticker from '../assets/stickers/keyboard.svg';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleGoogleSignIn() {
    setLoginError('');
    setRegisterError('');
    setGoogleLoading(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Google sign-in failed. Please try again.');
      setRegisterError(err instanceof Error ? err.message : 'Google sign-in failed. Please try again.');
      setGoogleLoading(false);
    }
  }

  async function handleLoginSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      await signIn(email.trim(), password);

      const { data } = await supabase.auth.getUser();
      const registered = data.user ? await hasRegistration(data.user.id) : false;
      navigate(registered ? '/profile' : '/registration');
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleRegisterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRegisterError('');

    const nextEmail = registerEmail.trim();
    if (!nextEmail) {
      setRegisterError('Please enter your email address.');
      return;
    }

    setRegisterLoading(true);

    try {
      navigate('/registration', { state: { email: nextEmail } });
    } catch (err) {
      setRegisterError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setRegisterLoading(false);
    }
  }

  return (
    <section
      className="relative flex min-h-screen items-center justify-center bg-cream bg-cover bg-center px-4 py-16 sm:px-6"
      style={{ backgroundImage: `url(${witcon2027Background})` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-cream/35" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center justify-center gap-5 md:flex-row md:items-stretch md:gap-6">
        {/* Log In Card */}
        <div className="relative w-full max-w-sm flex-1 rounded-3xl border border-peach bg-cream/95 p-6 shadow-md backdrop-blur-xs">
          {/* Larger mobile sticker perched on the top-right corner */}
          <img
            src={keyboardSticker}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 right-2 w-36 rotate-6 drop-shadow-sm select-none md:hidden"
          />

          <h1 className="font-the-seasons text-xl sm:text-2xl font-bold tracking-tight text-brown">
            Log in
          </h1>

          <p className="mt-1 font-arima text-xs text-light-brown">
            Welcome back to WiTCON 2027.
          </p>

          <form onSubmit={handleLoginSubmit} className="mt-4 space-y-3">
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

            <div>
              <label
                htmlFor="password"
                className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input !py-2 !text-xs"
              />
            </div>

            {loginError && (
              <p role="alert" className="font-arima text-[11px] font-medium text-burgundy">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading || googleLoading}
              className="w-full cursor-pointer rounded-full bg-pink px-5 py-2 font-arima text-xs font-semibold tracking-wide text-white shadow-sm transition hover:bg-hot-pink focus:outline-none focus:ring-2 focus:ring-medium-pink focus:ring-offset-2 focus:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loginLoading ? 'Logging in…' : 'Log in'}
            </button>
          </form>

          <div className="my-3.5 flex items-center gap-3 font-arima text-[10px] uppercase tracking-wider text-light-brown">
            <span className="h-px flex-1 bg-peach" />
            or
            <span className="h-px flex-1 bg-peach" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loginLoading || registerLoading || googleLoading}
            className="w-full cursor-pointer rounded-full border border-light-brown bg-white px-5 py-2 font-arima text-xs font-semibold text-brown shadow-2xs transition hover:bg-light-yellow/60 focus:outline-none focus:ring-2 focus:ring-peach focus:ring-offset-2 focus:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-60"
          >
            {googleLoading ? 'Connecting to Google…' : 'Continue with Google'}
          </button>

          <div className="mt-4 border-t border-peach/70 pt-3 font-arima text-[11px] text-light-brown">
            <Link
              to="/forgot-password"
              className="font-medium text-brown underline decoration-pink/60 underline-offset-4 transition hover:text-hot-pink"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Register Card */}
        <div className="relative flex w-full max-w-sm flex-1 flex-col justify-between rounded-3xl border border-peach bg-cream/95 p-6 shadow-md backdrop-blur-xs">
          <div>
            <h2 className="font-the-seasons text-xl sm:text-2xl font-bold tracking-tight text-brown">
              Register
            </h2>

            <p className="mt-1 font-arima text-xs text-light-brown">
              New to WiTCON? Enter your email to get started.
            </p>

            <form onSubmit={handleRegisterSubmit} className="mt-4 space-y-3">
              <div>
                <label
                  htmlFor="register-email"
                  className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                >
                  Email
                </label>
                <input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@fiu.edu"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="form-input !py-2 !text-xs"
                />
              </div>

              {registerError && (
                <p role="alert" className="font-arima text-[11px] font-medium text-burgundy">
                  {registerError}
                </p>
              )}

              <button
                type="submit"
                disabled={registerLoading || googleLoading || loginLoading}
                className="w-full cursor-pointer rounded-full bg-pink px-5 py-2 font-arima text-xs font-semibold tracking-wide text-white shadow-sm transition hover:bg-hot-pink focus:outline-none focus:ring-2 focus:ring-medium-pink focus:ring-offset-2 focus:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-60"
              >
                {registerLoading ? 'Continuing…' : 'Continue'}
              </button>
            </form>
          </div>

          {/* Larger desktop sticker filling the bottom whitespace of the Register card */}
          <div className="mt-4 hidden justify-center md:flex">
            <img
              src={keyboardSticker}
              alt=""
              aria-hidden="true"
              className="pointer-events-none w-56 lg:w-64 -rotate-3 drop-shadow-sm select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}