import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRegistration } from '../data/registration';

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
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-witcon-sage bg-white p-8 text-center shadow-sm">
          <p role="alert" className="text-witcon-terracotta">
            {error}
          </p>
          <Link
            to="/registration"
            className="mt-4 inline-block font-semibold text-witcon-forest underline"
          >
            Return to registration
          </Link>
        </div>
      </section>
    );
  }

  if (!profile) {
    return (
      <p role="status" className="p-8 text-center text-witcon-brown">
        Loading profile…
      </p>
    );
  }

  return (
    <main className="min-h-screen bg-witcon-cream">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="rounded-3xl border border-witcon-deep-forest/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 border-witcon-pink bg-witcon-sage/30">
              <span className="font-display text-3xl font-bold text-witcon-deep-forest">
                {profile.firstName.charAt(0)}
                {profile.lastName.charAt(0)}
              </span>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="font-display text-3xl font-bold text-witcon-deep-forest">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="mt-1 text-sm text-witcon-deep-forest/65">{profile.email}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="rounded-full bg-witcon-sage/30 px-3 py-1 text-xs font-semibold text-witcon-deep-forest">
                  {profile.fieldOfStudy}
                </span>
                <span className="rounded-full bg-witcon-pink/10 px-3 py-1 text-xs font-semibold text-witcon-pink">
                  {profile.levelOfStudy}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <InfoCard title="Academic Information">
            <InfoRow label="Major" value={profile.fieldOfStudy} />
            <InfoRow label="School" value={profile.school} />
            <InfoRow label="Level of Study" value={profile.levelOfStudy} />
            <InfoRow label="Year" value={profile.yearLevel} />
          </InfoCard>
          <InfoCard title="Contact & Social">
            <InfoRow label="Email" value={profile.email} />
            <InfoRow label="LinkedIn" value={profile.linkedin} isLink />
            <InfoRow label="GitHub" value={profile.github} isLink />
            <InfoRow label="Discord" value={profile.discord} />
          </InfoCard>
          <InfoCard title="Resume">
            <p className="rounded-2xl bg-witcon-cream p-4 text-sm text-witcon-deep-forest">
              Your PDF resume is securely stored for WiTCON attendee opportunities.
            </p>
          </InfoCard>
          <InfoCard title="WiTCON Resources">
            <ResourceButton label="WiCS Discord" href="https://discord.gg/wicsfiu" />
            <ResourceButton
              label="WiCS LinkedIn"
              href="https://www.linkedin.com/company/wicsatfiu/"
            />
            <ResourceButton label="WiCS Instagram" href="https://instagram.com/wicsfiu" />
          </InfoCard>
        </div>
      </div>
    </main>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-witcon-deep-forest/10 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-5 font-display text-xl font-bold text-witcon-deep-forest">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
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
    <div className="flex flex-col gap-1 rounded-2xl bg-witcon-cream px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-36 shrink-0 text-xs font-semibold uppercase tracking-wide text-witcon-deep-forest/55">
        {label}
      </span>
      {isLink ? (
        <a
          href={value.startsWith('http') ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-sm font-medium text-witcon-pink underline"
        >
          {value}
        </a>
      ) : (
        <span className="truncate text-sm font-medium text-witcon-deep-forest">{value}</span>
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
      className="flex w-full items-center justify-between rounded-2xl bg-witcon-cream px-4 py-3 text-sm font-semibold text-witcon-deep-forest transition hover:bg-witcon-sage/20"
    >
      <span>{label}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}
