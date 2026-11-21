import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRegistration } from '../data/registration';
import witcon2027Background from '../assets/witcon2027_background.webp';
import butterflySideSticker from '../assets/stickers/butterflyside.svg';
import cellphoneSticker from '../assets/stickers/cellphone.svg';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  school: string;
  fieldOfStudy: string;
  levelOfStudy: string;
  yearLevel: string;
  linkedin: string;
  github: string;
  discord: string;
}

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    void getRegistration(user.id)
      .then((registration) => {
        if (!registration || registration.registration_status !== 'complete') {
          setError('Your registration is not complete yet.');
          return;
        }
        setProfile({
          firstName: registration.first_name,
          lastName: registration.last_name,
          email: registration.email,
          school:
            registration.school === 'Other'
              ? (registration.school_other ?? '')
              : registration.school,
          fieldOfStudy:
            registration.field_of_study === 'Other'
              ? (registration.field_other ?? '')
              : registration.field_of_study,
          levelOfStudy: registration.level_of_study,
          yearLevel: registration.year_level ?? '',
          linkedin: registration.linkedin_url ?? '',
          github: registration.github_url ?? '',
          discord: registration.discord_handle ?? '',
        });
      })
      .catch(() => {
        setError('We could not load your profile. Please try again.');
      });
  }, [user]);

  if (error) {
    return (
      <section
        className="relative flex min-h-screen items-center justify-center bg-cream bg-cover bg-center px-4 py-14 sm:px-6"
        style={{ backgroundImage: `url(${witcon2027Background})` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-cream/35" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-sm rounded-3xl border border-peach bg-cream/95 p-6 text-center shadow-md backdrop-blur-xs">
          <img
            src={butterflySideSticker}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 right-4 w-20 sm:w-24 rotate-6 drop-shadow-sm select-none"
          />
          <p role="alert" className="font-arima text-xs font-medium text-burgundy">
            {error}
          </p>
          <Link
            to="/registration"
            className="mt-4 inline-block rounded-full bg-pink px-5 py-2 font-arima text-xs font-semibold tracking-wide text-white shadow-sm transition hover:bg-hot-pink"
          >
            Return to registration
          </Link>
        </div>
      </section>
    );
  }

  if (!profile) {
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
          Loading profile…
        </p>
      </section>
    );
  }

  return (
    <main
      className="relative min-h-screen bg-cream bg-cover bg-fixed bg-center px-4 py-12 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${witcon2027Background})` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-cream/35" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl space-y-5">
        {/* Top Row: Attendee Identity + Resume Status */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <section className="relative rounded-3xl border border-peach bg-cream/95 p-5 shadow-md backdrop-blur-xs md:col-span-2 sm:p-6">
            <img
              src={butterflySideSticker}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -top-9 right-4 w-20 sm:w-24 rotate-6 drop-shadow-sm select-none"
            />

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
              <div className="flex h-16 w-16 sm:h-18 sm:w-18 shrink-0 items-center justify-center rounded-full border-2 border-pink bg-peach/40">
                <span className="font-the-seasons text-xl font-bold text-brown">
                  {profile.firstName.charAt(0)}
                  {profile.lastName.charAt(0)}
                </span>
              </div>

              <div className="text-center sm:text-left">
                <h1 className="font-the-seasons text-xl sm:text-2xl font-bold tracking-tight text-brown">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="mt-0.5 font-arima text-xs text-light-brown">{profile.email}</p>

                <div className="mt-2.5 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <span className="rounded-full border border-soft-green bg-soft-green/25 px-3 py-0.5 font-arima text-[11px] font-semibold text-dark-green">
                    {profile.fieldOfStudy}
                  </span>
                  <span className="rounded-full border border-medium-pink bg-pink/15 px-3 py-0.5 font-arima text-[11px] font-semibold text-hot-pink">
                    {profile.levelOfStudy}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col justify-center rounded-3xl border border-medium-pink bg-cream/95 p-5 shadow-md backdrop-blur-xs sm:p-6">
            <h2 className="font-the-seasons text-lg font-bold tracking-tight text-pink">
              Resume
            </h2>
            <p className="mt-2 rounded-2xl border border-peach/70 bg-white/80 p-3 font-arima text-xs leading-relaxed text-brown">
              Your PDF resume is securely stored for WiTCON attendee opportunities.
            </p>
          </section>
        </div>

        {/* Bottom Row: Academic Info + Contact & Social / Resources */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <section className="rounded-3xl border border-soft-green bg-cream/95 p-5 shadow-md backdrop-blur-xs sm:p-6">
            <h2 className="mb-3.5 font-the-seasons text-lg font-bold tracking-tight text-dark-green">
              Academic Information
            </h2>

            <div className="space-y-2">
              <InfoRow label="Major" value={profile.fieldOfStudy} />
              <InfoRow label="School" value={profile.school} />
              <InfoRow label="Level of Study" value={profile.levelOfStudy} />
              <InfoRow label="Year" value={profile.yearLevel} />
            </div>
          </section>

          <div className="flex flex-col gap-5">
            <section className="relative rounded-3xl border border-soft-lavender bg-cream/95 p-5 shadow-md backdrop-blur-xs sm:p-6">
              <img
                src={cellphoneSticker}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 right-4 w-16 sm:w-20 -rotate-6 drop-shadow-sm select-none"
              />

              <h2 className="mb-3.5 font-the-seasons text-lg font-bold tracking-tight text-purple">
                Contact &amp; Social
              </h2>

              <div className="space-y-2">
                <InfoRow label="Email" value={profile.email} />
                <InfoRow label="LinkedIn" value={profile.linkedin} isLink />
                <InfoRow label="GitHub" value={profile.github} isLink />
                <InfoRow label="Discord" value={profile.discord} />
              </div>
            </section>

            <section className="rounded-3xl border border-soft-blue bg-cream/95 p-5 shadow-md backdrop-blur-xs sm:p-6">
              <h2 className="mb-3 font-the-seasons text-lg font-bold tracking-tight text-blue">
                WiTCON Resources
              </h2>

              <div className="space-y-2">
                <ResourceButton label="WiCS Discord" href="https://discord.gg/wicsfiu" />
                <ResourceButton
                  label="WiCS LinkedIn"
                  href="https://www.linkedin.com/company/wicsatfiu/"
                />
                <ResourceButton label="WiCS Instagram" href="https://instagram.com/wicsfiu" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoRow({
  label,
  value,
  isLink = false,
}: {
  label: string;
  value: string;
  isLink?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5 rounded-2xl border border-peach/60 bg-white/80 px-3.5 py-2 sm:flex-row sm:items-center sm:gap-3">
      <span className="w-28 shrink-0 font-arima text-[11px] font-semibold uppercase tracking-wider text-light-brown">
        {label}
      </span>
      {isLink ? (
        <a
          href={value.startsWith('http') ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate font-arima text-xs font-medium text-hot-pink underline decoration-pink/60 underline-offset-4 transition hover:text-burgundy"
        >
          {value}
        </a>
      ) : (
        <span className="truncate font-arima text-xs font-medium text-brown">{value}</span>
      )}
    </div>
  );
}

function ResourceButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-between rounded-2xl border border-peach/70 bg-white/85 px-3.5 py-2 font-arima text-xs font-semibold text-brown transition hover:border-pink hover:bg-peach/25 hover:text-hot-pink"
    >
      <span>{label}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}