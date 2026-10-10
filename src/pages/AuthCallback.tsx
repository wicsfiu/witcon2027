import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hasRegistration } from '../data/registration';
import { supabase } from '../lib/supabaseClient';

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
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-witcon-sage bg-white p-8 text-center shadow-sm">
          <p role="alert" className="text-sm text-witcon-terracotta">
            {error}
          </p>
          <Link
            to="/login"
            className="mt-5 inline-block font-semibold text-witcon-forest underline"
          >
            Return to log in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <p role="status" className="p-8 text-center text-witcon-brown">
      Completing sign-in…
    </p>
  );
}
