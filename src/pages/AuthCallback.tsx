import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hasRegistration } from '../data/registration';
import { supabase } from '../lib/supabaseClient';
import witcon2027Background from '../assets/witcon2027_background.webp';

export default function AuthCallback() {
  const navigate = useNavigate();
  const started = useRef(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let active = true;

    void (async () => {
      const oauthError = new URLSearchParams(window.location.search).get('error');
      if (oauthError) {
        if (active) setError('Google sign-in was cancelled or could not be completed.');
        return;
      }

      const { data, error: sessionError } = await supabase.auth.getSession();
      if (!active) return;
      if (sessionError || !data.session) {
        setError('We could not restore your sign-in. Please try again.');
        return;
      }

      try {
        const registered = await hasRegistration(data.session.user.id);
        if (!active) return;
        navigate(registered ? '/profile' : '/registration', { replace: true });
      } catch {
        if (active) setError('We could not verify your registration status. Please try again.');
      }
    })();

    return () => {
      active = false;
    };
  }, [navigate]);

  if (error) {
    return (
      <section
        className="relative flex min-h-screen items-center justify-center bg-cream bg-cover bg-center px-4 py-14 sm:px-6"
        style={{ backgroundImage: `url(${witcon2027Background})` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-cream/35" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-sm rounded-3xl border border-peach bg-cream/95 p-6 text-center shadow-md backdrop-blur-xs">
          <p role="alert" className="font-arima text-xs font-medium text-burgundy">
            {error}
          </p>

          <Link
            to="/login"
            className="mt-4 inline-block rounded-full bg-pink px-5 py-2 font-arima text-xs font-semibold tracking-wide text-white shadow-sm transition hover:bg-hot-pink"
          >
            Return to log in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative flex min-h-screen items-center justify-center bg-cream bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${witcon2027Background})` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-cream/35" aria-hidden="true" />

      <div
        role="status"
        className="relative z-10 flex items-center gap-2.5 rounded-full border border-peach bg-cream/95 px-6 py-2.5 font-arima text-xs font-semibold text-brown shadow-sm"
      >
        <span
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-pink border-t-transparent"
          aria-hidden="true"
        />
        <span>Completing sign-in…</span>
      </div>
    </section>
  );
}