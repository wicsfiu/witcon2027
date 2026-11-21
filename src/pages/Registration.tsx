import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signUp } from '../data/auth';
import {
  createRegistration,
  getRegistration,
  hasRegistration,
  uploadResume,
} from '../data/registration.ts';
import witcon2027Background from '../assets/witcon2027_background.webp';
import birdSticker from '../assets/stickers/bird.svg';
import butterflySideSticker from '../assets/stickers/butterflyside.svg';
import butterflySticker from '../assets/stickers/butterfly.png';
import froggySticker from '../assets/stickers/froggy.svg';
import sunflowerSticker from '../assets/stickers/sunflower.svg';

// Same rules as the check constraints on the registrations table
const LINKEDIN_PATTERN = /^https:\/\/([a-z]+\.)?linkedin\.com\//i;
const GITHUB_PATTERN = /^https:\/\/(www\.)?github\.com\//i;

export default function Registration() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const didSubmit = useRef(false);

  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const initialEmail = (location.state as { email?: string } | null)?.email ?? '';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: initialEmail,
    confirmEmail: initialEmail,
    password: '',
    dateOfBirth: '',

    country: '',
    state: '',

    linkedin: '',
    discord: '',
    github: '',

    race: '',
    raceOther: '',
    gender: '',
    genderOther: '',

    levelOfStudy: '',
    yearLevel: '',
    fieldOfStudy: '',
    fieldOther: '',
    school: '',
    schoolOther: '',

    shirtSize: '',
    foodAllergies: '',
    additionalInformation: '',

    codeOfConduct: false,
    photographyConsent: false,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email: initialEmail,
      confirmEmail: initialEmail,
    }));
  }, [initialEmail]);

  // Already registered? Send them to their profile.
  useEffect(() => {
    if (!session || didSubmit.current) return;
    void hasRegistration(session.user.id)
      .then((exists) => {
        if (exists) navigate('/profile', { replace: true });
      })
      .catch(() => {
        setError('We could not verify your registration status. Please try again.');
      });
  }, [session, navigate]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (!file) {
      setResume(null);
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      e.target.value = '';
      setResume(null);
      return;
    }

    if (file.size > 600 * 1024) {
      setError('Resume must be 600 KB or smaller.');
      e.target.value = '';
      setResume(null);
      return;
    }

    setResume(file);
  };

  // Step 1: create the account. The registration form only appears once
  // the student has a session (after confirming their email, if required).
  const handleAccountSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (formData.email.trim() !== formData.confirmEmail.trim()) {
      setError('Email addresses do not match.');
      return;
    }

    if (formData.password.length < 10) {
      setError('Password must be at least 10 characters.');
      return;
    }

    setSubmitting(true);

    try {
      const { needsConfirmation } = await signUp(formData.email.trim(), formData.password);
      if (needsConfirmation) setAwaitingConfirmation(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Step 2: save the registration and upload the resume
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!session || !session.user.email) {
      setError('Your session has expired. Please log in again.');
      return;
    }

    if (!resume) {
      setError('Please upload your resume.');
      return;
    }

    const linkedin = formData.linkedin.trim();
    if (linkedin && !LINKEDIN_PATTERN.test(linkedin)) {
      setError('LinkedIn link must start with https://linkedin.com/ or https://www.linkedin.com/');
      return;
    }

    const github = formData.github.trim();
    if (github && !GITHUB_PATTERN.test(github)) {
      setError('GitHub link must start with https://github.com/');
      return;
    }

    if (!formData.codeOfConduct) {
      setError('You must agree to the WiTCON Code of Conduct.');
      return;
    }

    didSubmit.current = true;
    setSubmitting(true);

    try {
      const userId = session.user.id;

      // 1. Registration row (skipped if a previous attempt already created it)
      const existingRegistration = await getRegistration(userId);
      if (!existingRegistration) {
        await createRegistration(userId, session.user.email, formData);
      }

      // 2. Resume
      await uploadResume(userId, resume);

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section
        className="relative flex min-h-screen items-center justify-center bg-cream bg-cover bg-center px-4"
        style={{ backgroundImage: `url(${witcon2027Background})` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-cream/35" aria-hidden="true" />
        <p
          role="status"
          className="relative z-10 rounded-full border border-peach bg-cream/95 px-6 py-2.5 font-arima text-xs font-semibold text-brown shadow-sm"
        >
          Loading…
        </p>
      </section>
    );
  }

  // Account created, waiting for the student to click the emailed link
  if (!session && awaitingConfirmation) {
    return (
      <section
        className="relative flex min-h-screen items-center justify-center bg-cream bg-cover bg-center px-4 py-16 sm:px-6"
        style={{ backgroundImage: `url(${witcon2027Background})` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-cream/35" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-peach bg-cream/95 p-7 text-center shadow-md backdrop-blur-xs">
          <img
            src={birdSticker}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-11 right-4 w-24 sm:w-28 rotate-6 drop-shadow-sm select-none"
          />

          <h1 className="font-the-seasons text-xl sm:text-2xl font-bold tracking-tight text-brown">
            Check your email
          </h1>

          <p className="mt-2 font-arima text-xs leading-relaxed text-light-brown">
            We sent a confirmation link to{' '}
            <span className="font-semibold text-brown">{formData.email.trim()}</span>. Click it to
            come back and finish your registration.
          </p>

          <div className="mt-5 border-t border-peach/70 pt-3.5 font-arima text-[11px] text-light-brown">
            Already confirmed?{' '}
            <Link
              to="/login"
              className="font-semibold text-brown underline decoration-pink/60 underline-offset-4 transition hover:text-hot-pink"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Step 1 of 2: no session yet, so create the account first
  if (!session) {
    return (
      <section
        className="relative flex min-h-screen items-center justify-center bg-cream bg-cover bg-center px-4 py-16 sm:px-6"
        style={{ backgroundImage: `url(${witcon2027Background})` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-cream/35" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-sm rounded-3xl border border-peach bg-cream/95 p-6 shadow-md backdrop-blur-xs">
          {/* Butterfly side sticker perched top-right */}
          <img
            src={butterflySideSticker}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-11 right-3 w-24 sm:w-28 rotate-6 drop-shadow-sm select-none"
          />

          <span className="inline-block rounded-full bg-peach/60 px-2.5 py-0.5 font-arima text-[10px] font-semibold uppercase tracking-wider text-brown">
            Step 1 of 2
          </span>

          <h1 className="mt-2 font-the-seasons text-xl sm:text-2xl font-bold tracking-tight text-brown">
            Create your account
          </h1>

          <p className="mt-1 font-arima text-xs text-light-brown">
            Welcome to WiTCON 2027! Set up your login first.
          </p>

          <form onSubmit={handleAccountSubmit} className="mt-4 space-y-3">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@fiu.edu"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input !py-2 !text-xs"
              />
            </div>

            <div>
              <label
                htmlFor="confirmEmail"
                className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
              >
                Confirm Email
              </label>
              <input
                id="confirmEmail"
                name="confirmEmail"
                type="email"
                autoComplete="email"
                placeholder="you@fiu.edu"
                required
                value={formData.confirmEmail}
                onChange={handleChange}
                className="form-input !py-2 !text-xs"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
              >
                Password <span className="font-normal text-light-brown">(min. 10 chars)</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••••"
                required
                minLength={10}
                value={formData.password}
                onChange={handleChange}
                className="form-input !py-2 !text-xs"
              />
            </div>

            {error && (
              <p role="alert" className="font-arima text-[11px] font-medium text-burgundy">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full cursor-pointer rounded-full bg-pink px-5 py-2 font-arima text-xs font-semibold tracking-wide text-white shadow-sm transition hover:bg-hot-pink focus:outline-none focus:ring-2 focus:ring-medium-pink focus:ring-offset-2 focus:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <div className="mt-4 border-t border-peach/70 pt-3 font-arima text-[11px] text-light-brown">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-brown underline decoration-pink/60 underline-offset-4 transition hover:text-hot-pink"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section
        className="relative flex min-h-screen items-center justify-center bg-cream bg-cover bg-center px-4 py-16 sm:px-6"
        style={{ backgroundImage: `url(${witcon2027Background})` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-cream/35" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-peach bg-cream/95 p-7 text-center shadow-md backdrop-blur-xs">
          <img
            src={butterflySticker}
            alt=""
            aria-hidden="true"
            className="mx-auto mb-3 w-28 sm:w-32 drop-shadow-sm select-none"
          />

          <h1 className="font-the-seasons text-xl sm:text-2xl font-bold tracking-tight text-brown">
            Registration Successful!
          </h1>

          <p className="mt-1.5 font-arima text-xs text-light-brown">
            Thank you for registering for WiTCON 2027! We can&apos;t wait to see you there.
          </p>

          <div className="mt-5">
            <Link
              to="/profile"
              className="inline-block rounded-full bg-pink px-6 py-2 font-arima text-xs font-semibold tracking-wide text-white shadow-sm transition hover:bg-hot-pink"
            >
              View your profile
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Step 2 of 2: full registration form
  return (
    <section
      className="relative min-h-screen bg-cream bg-cover bg-fixed bg-center px-4 py-14 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${witcon2027Background})` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-cream/35" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Page Header Banner */}
        <div className="mx-auto mb-8 max-w-lg rounded-3xl border border-peach bg-cream/95 px-6 py-5 text-center shadow-md backdrop-blur-xs">
          <span className="inline-block rounded-full bg-peach/60 px-2.5 py-0.5 font-arima text-[10px] font-semibold uppercase tracking-wider text-brown">
            Step 2 of 2
          </span>
          <h1 className="mt-1.5 font-the-seasons text-2xl sm:text-3xl font-bold tracking-tight text-brown">
            Registration
          </h1>
          <p className="mt-1 font-arima text-xs text-light-brown">
            Complete your WiTCON 2027 registration details.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-burgundy/40 bg-cream/95 p-3 text-center font-arima text-xs font-medium text-burgundy shadow-sm"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* =========================================
              PERSONAL INFORMATION + PROFILE LINKS
          ========================================= */}
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Personal Information */}
            <div className="flex flex-col justify-between rounded-3xl border border-soft-green bg-cream/95 p-6 shadow-md backdrop-blur-xs">
              <div>
                <h2 className="mb-4 font-the-seasons text-lg sm:text-xl font-bold tracking-tight text-dark-green">
                  Personal Information
                </h2>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                    >
                      First Name *
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-input !py-2 !text-xs"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                    >
                      Last Name *
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="form-input !py-2 !text-xs"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                    >
                      Email *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      readOnly
                      value={session.user.email ?? ''}
                      className="form-input !py-2 !text-xs"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                    >
                      Date of Birth *
                    </label>

                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="form-input !py-2 !text-xs"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label
                      htmlFor="country"
                      className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                    >
                      Country of Residence *
                    </label>

                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="form-input !py-2 !text-xs"
                    >
                      <option value="">Select a country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Peru">Peru</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* State */}
                  <div>
                    <label
                      htmlFor="state"
                      className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                    >
                      State of Residence *
                    </label>

                    <select
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="form-input !py-2 !text-xs"
                    >
                      <option value="">Select a state</option>
                      <option value="Alabama">Alabama</option>
                      <option value="Alaska">Alaska</option>
                      <option value="Arizona">Arizona</option>
                      <option value="California">California</option>
                      <option value="Colorado">Colorado</option>
                      <option value="Florida">Florida</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Illinois">Illinois</option>
                      <option value="Maryland">Maryland</option>
                      <option value="Massachusetts">Massachusetts</option>
                      <option value="Michigan">Michigan</option>
                      <option value="New Jersey">New Jersey</option>
                      <option value="New York">New York</option>
                      <option value="North Carolina">North Carolina</option>
                      <option value="Ohio">Ohio</option>
                      <option value="Pennsylvania">Pennsylvania</option>
                      <option value="Texas">Texas</option>
                      <option value="Virginia">Virginia</option>
                      <option value="Washington">Washington</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bird sticker in the open bottom space of Personal Information on desktop */}
              <div className="mt-4 hidden justify-center lg:flex">
                <img
                  src={birdSticker}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none w-32 rotate-3 drop-shadow-sm select-none"
                />
              </div>
            </div>

            {/* Profile Links */}
            <div className="rounded-3xl border border-soft-lavender bg-cream/95 p-6 shadow-md backdrop-blur-xs">
              <h2 className="mb-4 font-the-seasons text-lg sm:text-xl font-bold tracking-tight text-purple">
                Profile Links
              </h2>

              <div className="space-y-3.5">
                {/* LinkedIn */}
                <div>
                  <label
                    htmlFor="linkedin"
                    className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                  >
                    LinkedIn
                  </label>

                  <input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="form-input !py-2 !text-xs"
                  />
                </div>

                {/* Discord */}
                <div>
                  <label
                    htmlFor="discord"
                    className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                  >
                    Discord Username
                  </label>

                  <input
                    id="discord"
                    name="discord"
                    type="text"
                    placeholder="username"
                    value={formData.discord}
                    onChange={handleChange}
                    className="form-input !py-2 !text-xs"
                  />
                </div>

                {/* GitHub */}
                <div>
                  <label
                    htmlFor="github"
                    className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                  >
                    GitHub
                  </label>

                  <input
                    id="github"
                    name="github"
                    type="url"
                    placeholder="https://github.com/username"
                    value={formData.github}
                    onChange={handleChange}
                    className="form-input !py-2 !text-xs"
                  />
                </div>

                {/* Resume */}
                <div>
                  <span className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-pink">
                    Resume Upload *
                  </span>

                  <label
                    htmlFor="resume"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-soft-lavender bg-white/80 px-4 py-4 text-center transition hover:bg-soft-lavender/15 focus-within:ring-2 focus-within:ring-pink"
                  >
                    <span className="text-xl" aria-hidden="true">
                      📄
                    </span>

                    <span className="mt-1 font-arima text-xs font-semibold text-brown">
                      {resume ? resume.name : 'Click to upload your resume'}
                    </span>

                    <span className="mt-0.5 font-arima text-[11px] text-light-brown">
                      PDF only · Maximum 600 KB
                    </span>

                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleResumeChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================
              DEMOGRAPHICS + ACADEMICS + ADDITIONAL
          ========================================= */}
          <div className="grid gap-5 lg:grid-cols-3">
            {/* Demographics */}
            <div className="rounded-3xl border border-medium-pink bg-cream/95 p-6 shadow-md backdrop-blur-xs">
              <h2 className="mb-4 font-the-seasons text-lg sm:text-xl font-bold tracking-tight text-pink">
                Demographic Information
              </h2>

              <div className="space-y-3.5">
                {/* Race */}
                <div>
                  <label
                    htmlFor="race"
                    className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                  >
                    Race or Ethnicity *
                  </label>

                  <select
                    id="race"
                    name="race"
                    required
                    value={formData.race}
                    onChange={handleChange}
                    className="form-input !py-2 !text-xs"
                  >
                    <option value="">Select an option</option>
                    <option value="American Indian or Alaska Native">
                      American Indian or Alaska Native
                    </option>
                    <option value="Asian">Asian</option>
                    <option value="Black or African American">Black or African American</option>
                    <option value="Hispanic or Latino">Hispanic or Latino</option>
                    <option value="Native Hawaiian or Pacific Islander">
                      Native Hawaiian or Pacific Islander
                    </option>
                    <option value="White">White</option>
                    <option value="Two or More Races">Two or More Races</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.race === 'Other' && (
                  <div>
                    <label
                      htmlFor="raceOther"
                      className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                    >
                      Other
                    </label>

                    <input
                      id="raceOther"
                      name="raceOther"
                      type="text"
                      placeholder="Please specify"
                      value={formData.raceOther}
                      onChange={handleChange}
                      className="form-input !py-2 !text-xs"
                    />
                  </div>
                )}

                {/* Gender */}
                <div>
                  <label
                    htmlFor="gender"
                    className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                  >
                    Gender *
                  </label>

                  <select
                    id="gender"
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-input !py-2 !text-xs"
                  >
                    <option value="">Select gender</option>
                    <option value="Woman">Woman</option>
                    <option value="Man">Man</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.gender === 'Other' && (
                  <div>
                    <label
                      htmlFor="genderOther"
                      className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                    >
                      Other
                    </label>

                    <input
                      id="genderOther"
                      name="genderOther"
                      type="text"
                      placeholder="Please specify"
                      value={formData.genderOther}
                      onChange={handleChange}
                      className="form-input !py-2 !text-xs"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Academic Information */}
            <div className="rounded-3xl border border-peach bg-cream/95 p-6 shadow-md backdrop-blur-xs">
              <h2 className="mb-4 font-the-seasons text-lg sm:text-xl font-bold tracking-tight text-light-brown">
                Academic Information
              </h2>

              <div className="space-y-3.5">
                {/* School */}
                <div>
                  <label
                    htmlFor="school"
                    className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                  >
                    School / University *
                  </label>

                  <select
                    id="school"
                    name="school"
                    required
                    value={formData.school}
                    onChange={handleChange}
                    className="form-input !py-2 !text-xs"
                  >
                    <option value="">Select school</option>
                    <option value="Florida International University">
                      Florida International University
                    </option>
                    <option value="University of Miami">University of Miami</option>
                    <option value="University of Florida">University of Florida</option>
                    <option value="Florida State University">Florida State University</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.school === 'Other' && (
                  <div>
                    <label
                      htmlFor="schoolOther"
                      className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                    >
                      Other School
                    </label>

                    <input
                      id="schoolOther"
                      name="schoolOther"
                      type="text"
                      placeholder="Please specify"
                      value={formData.schoolOther}
                      onChange={handleChange}
                      className="form-input !py-2 !text-xs"
                    />
                  </div>
                )}

                {/* Level of Study */}
                <div>
                  <label
                    htmlFor="levelOfStudy"
                    className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                  >
                    Level of Study *
                  </label>

                  <select
                    id="levelOfStudy"
                    name="levelOfStudy"
                    required
                    value={formData.levelOfStudy}
                    onChange={handleChange}
                    className="form-input !py-2 !text-xs"
                  >
                    <option value="">Select level</option>
                    <option value="High School">High School</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Doctoral">Doctoral</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Year */}
                <div>
                  <label
                    htmlFor="yearLevel"
                    className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                  >
                    Year Level
                  </label>

                  <select
                    id="yearLevel"
                    name="yearLevel"
                    value={formData.yearLevel}
                    onChange={handleChange}
                    className="form-input !py-2 !text-xs"
                  >
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year or More">5th Year or More</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                {/* Field of Study */}
                <div>
                  <label
                    htmlFor="fieldOfStudy"
                    className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                  >
                    Field of Study *
                  </label>

                  <select
                    id="fieldOfStudy"
                    name="fieldOfStudy"
                    required
                    value={formData.fieldOfStudy}
                    onChange={handleChange}
                    className="form-input !py-2 !text-xs"
                  >
                    <option value="">Select field</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.fieldOfStudy === 'Other' && (
                  <div>
                    <label
                      htmlFor="fieldOther"
                      className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                    >
                      Other Field
                    </label>

                    <input
                      id="fieldOther"
                      name="fieldOther"
                      type="text"
                      placeholder="Please specify"
                      value={formData.fieldOther}
                      onChange={handleChange}
                      className="form-input !py-2 !text-xs"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="flex flex-col justify-between rounded-3xl border border-soft-blue bg-cream/95 p-6 shadow-md backdrop-blur-xs">
              <div>
                <h2 className="mb-4 font-the-seasons text-lg sm:text-xl font-bold tracking-tight text-blue">
                  Additional Information
                </h2>

                <div className="space-y-3.5">
                  {/* Shirt Size */}
                  <div>
                    <label
                      htmlFor="shirtSize"
                      className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                    >
                      T-Shirt Size *
                    </label>

                    <select
                      id="shirtSize"
                      name="shirtSize"
                      required
                      value={formData.shirtSize}
                      onChange={handleChange}
                      className="form-input !py-2 !text-xs"
                    >
                      <option value="">Select a size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="2XL">2XL</option>
                      <option value="3XL">3XL</option>
                      <option value="4XL">4XL</option>
                    </select>
                  </div>

                  {/* Food Allergies */}
                  <div>
                    <label
                      htmlFor="foodAllergies"
                      className="mb-1 block font-arima text-[11px] sm:text-xs font-semibold text-brown"
                    >
                      Food Allergies / Restrictions
                    </label>

                    <textarea
                      id="foodAllergies"
                      name="foodAllergies"
                      rows={3}
                      placeholder="Please list any allergies or restrictions"
                      value={formData.foodAllergies}
                      onChange={handleChange}
                      className="form-input resize-none !py-2 !text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Smaller sunflower sticker so it doesn't over-stretch the section */}
              <div className="mt-3 hidden justify-center lg:flex">
                <img
                  src={sunflowerSticker}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none w-24 -rotate-3 drop-shadow-sm select-none"
                />
              </div>
            </div>
          </div>

          {/* =========================================
              AGREEMENTS
          ========================================= */}
          <div className="relative rounded-3xl border border-soft-green bg-cream/95 p-6 shadow-md backdrop-blur-xs">
            {/* Froggy sticker perched on the bottom-right corner of Agreements */}
            <img
              src={froggySticker}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 right-4 w-20 sm:w-24 rotate-3 drop-shadow-sm select-none"
            />

            <h2 className="mb-4 font-the-seasons text-lg sm:text-xl font-bold tracking-tight text-dark-green">
              Agreements
            </h2>

            <div className="space-y-3 pr-16 sm:pr-24">
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  name="codeOfConduct"
                  checked={formData.codeOfConduct}
                  onChange={handleChange}
                  required
                  className="mt-0.5 h-3.5 w-3.5 accent-pink"
                />

                <span className="font-arima text-xs leading-relaxed text-brown">
                  I have read and agreed to the{' '}
                  <span className="font-semibold underline decoration-pink/60 underline-offset-2">
                    WiTCON Code of Conduct
                  </span>
                  . *
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  name="photographyConsent"
                  checked={formData.photographyConsent}
                  onChange={handleChange}
                  className="mt-0.5 h-3.5 w-3.5 accent-pink"
                />

                <span className="font-arima text-xs leading-relaxed text-brown">
                  I consent to being photographed and/or recorded during the event for promotional
                  purposes.
                </span>
              </label>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mx-auto max-w-2xl rounded-2xl border border-burgundy/40 bg-cream/95 p-3 text-center font-arima text-xs font-medium text-burgundy shadow-sm"
            >
              {error}
            </p>
          )}

          <div className="flex justify-center pt-2 pb-4">
            <button
              type="submit"
              disabled={submitting}
              className="cursor-pointer rounded-full bg-pink px-10 py-2.5 font-arima text-xs font-semibold tracking-wide text-white shadow-md transition hover:bg-hot-pink focus:outline-none focus:ring-2 focus:ring-medium-pink focus:ring-offset-2 focus:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Submitting…' : 'Submit Registration →'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}