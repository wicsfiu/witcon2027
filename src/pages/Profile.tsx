import { useState } from "react";

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

const initialProfile: ProfileData = {
  firstName: "Ariana",
  lastName: "De las Casas",
  email: "aricasa@gmail.com",
  school: "Florida International University",
  fieldOfStudy: "Computer Science",
  levelOfStudy: "Undergraduate",
  yearLevel: "Senior",
  linkedin: "linkedin.com/in/ariana-casas",
  github: "github.com/ariana-casas",
  discord: "Ariana#1234",
};

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [editData, setEditData] = useState<ProfileData>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    setEditData({ ...profile });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData({ ...profile });
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile({ ...editData });
    setIsEditing(false);
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    setEditData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <main className="min-h-screen bg-witcon-cream">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        
        {/* Page heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-witcon-pink">
            WiTCON 2027
          </p>

          <h1 className="font-display text-4xl font-bold text-witcon-deep-forest sm:text-5xl">
            My Profile
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-witcon-deep-forest/70 sm:text-base">
            Manage your attendee information and connect with the WiTCON
            community.
          </p>
        </div>

        {/* Profile header */}
        <section className="rounded-3xl border border-witcon-deep-forest/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            
            {/* Profile information */}
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
              
              {/* Avatar */}
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 border-witcon-pink bg-witcon-sage/30">
                <span className="font-display text-3xl font-bold text-witcon-deep-forest">
                  {profile.firstName.charAt(0)}
                  {profile.lastName.charAt(0)}
                </span>
              </div>

              <div className="text-center sm:text-left">
                <h2 className="font-display text-2xl font-bold text-witcon-deep-forest sm:text-3xl">
                  {profile.firstName} {profile.lastName}
                </h2>

                <p className="mt-1 text-sm text-witcon-deep-forest/65">
                  {profile.email}
                </p>

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

            {/* Edit button */}
            <button
              type="button"
              onClick={handleEdit}
              className="rounded-full bg-witcon-pink px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-witcon-pink focus:ring-offset-2"
            >
              Edit Profile
            </button>
          </div>
        </section>

        {/* Main profile content */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* Academic Information */}
          <InfoCard title="Academic Information">
            <InfoRow
              label="Major"
              value={profile.fieldOfStudy}
            />

            <InfoRow
              label="School"
              value={profile.school}
            />

            <InfoRow
              label="Level of Study"
              value={profile.levelOfStudy}
            />

            <InfoRow
              label="Year"
              value={profile.yearLevel}
            />
          </InfoCard>

          {/* Contact & Social */}
          <InfoCard title="Contact & Social">
            <InfoRow
              label="Email"
              value={profile.email}
            />

            <InfoRow
              label="LinkedIn"
              value={profile.linkedin}
              isLink
            />

            <InfoRow
              label="GitHub"
              value={profile.github}
              isLink
            />

            <InfoRow
              label="Discord"
              value={profile.discord}
            />
          </InfoCard>

          {/* Resume */}
          <InfoCard title="Resume">
            <div className="rounded-2xl bg-witcon-cream p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-witcon-deep-forest">
                    Resume
                  </p>

                  <p className="mt-1 text-sm text-witcon-deep-forest/60">
                    Upload your resume for networking and career opportunities.
                  </p>
                </div>

                <button
                  type="button"
                  className="shrink-0 rounded-full bg-witcon-sage/40 px-5 py-2 text-sm font-semibold text-witcon-deep-forest transition hover:bg-witcon-sage/60"
                  onClick={() =>
                    alert("Resume upload will be connected to Supabase later.")
                  }
                >
                  Upload Resume
                </button>
              </div>
            </div>
          </InfoCard>

          {/* WiTCON Resources */}
          <InfoCard title="WiTCON Resources">
            <div className="space-y-3">
              <ResourceButton
                label="WiTCON Attendee Guide"
                onClick={() =>
                  alert("The attendee guide will be added when available.")
                }
              />

              <ResourceButton
                label="WiCS Discord"
                href="https://discord.gg/wicsfiu"
              />

              <ResourceButton
                label="WiCS LinkedIn"
                href="https://www.linkedin.com/company/wicsatfiu/"
              />

              <ResourceButton
                label="WiCS Instagram"
                href="https://instagram.com/wicsfiu"
              />
            </div>
          </InfoCard>
        </div>

        {/* Safety / reporting */}
        <section className="mt-6 rounded-3xl border border-witcon-pink/20 bg-witcon-pink/5 p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-witcon-deep-forest">
            Need help at WiTCON?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-witcon-deep-forest/70">
            If you experience or witness inappropriate behavior during the
            conference, please use the reporting process provided by WiTCON.
          </p>

          <button
            type="button"
            onClick={() =>
              alert("The incident reporting form will be connected later.")
            }
            className="mt-4 rounded-full bg-witcon-pink px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Report an Incident
          </button>
        </section>

        {/* Delete profile */}
        <section className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="text-sm font-semibold text-red-600 underline underline-offset-4 transition hover:text-red-700"
          >
            Delete my profile
          </button>
        </section>
      </div>

      {/* Edit modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-witcon-cream p-6 shadow-xl sm:p-8">
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-witcon-pink">
                  Account
                </p>

                <h2 className="font-display text-2xl font-bold text-witcon-deep-forest">
                  Edit Profile
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCancel}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-witcon-sage/30 text-xl text-witcon-deep-forest transition hover:bg-witcon-sage/50"
                aria-label="Close edit profile"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                label="First Name"
                value={editData.firstName}
                onChange={(value) => handleChange("firstName", value)}
              />

              <FormField
                label="Last Name"
                value={editData.lastName}
                onChange={(value) => handleChange("lastName", value)}
              />

              <FormField
                label="Email"
                value={editData.email}
                onChange={(value) => handleChange("email", value)}
                type="email"
              />

              <FormField
                label="School"
                value={editData.school}
                onChange={(value) => handleChange("school", value)}
              />

              <FormField
                label="Major"
                value={editData.fieldOfStudy}
                onChange={(value) => handleChange("fieldOfStudy", value)}
              />

              <FormField
                label="Level of Study"
                value={editData.levelOfStudy}
                onChange={(value) => handleChange("levelOfStudy", value)}
              />

              <FormField
                label="Year"
                value={editData.yearLevel}
                onChange={(value) => handleChange("yearLevel", value)}
              />

              <FormField
                label="Discord"
                value={editData.discord}
                onChange={(value) => handleChange("discord", value)}
              />

              <FormField
                label="LinkedIn"
                value={editData.linkedin}
                onChange={(value) => handleChange("linkedin", value)}
              />

              <FormField
                label="GitHub"
                value={editData.github}
                onChange={(value) => handleChange("github", value)}
              />
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-full border border-witcon-deep-forest/20 px-6 py-2.5 text-sm font-semibold text-witcon-deep-forest transition hover:bg-witcon-sage/20"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="rounded-full bg-witcon-pink px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-witcon-cream p-6 shadow-xl sm:p-8">
            <h2 className="font-display text-2xl font-bold text-witcon-deep-forest">
              Delete your profile?
            </h2>

            <p className="mt-3 text-sm leading-6 text-witcon-deep-forest/70">
              This action will permanently remove your WiTCON attendee
              profile once profile deletion is connected to the database.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-full border border-witcon-deep-forest/20 px-6 py-2.5 text-sm font-semibold text-witcon-deep-forest transition hover:bg-witcon-sage/20"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  alert("Profile deletion will be connected to Supabase later.");
                }}
                className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ---------------------------------- */
/* Reusable components                 */
/* ---------------------------------- */

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

function InfoCard({ title, children }: InfoCardProps) {
  return (
    <section className="rounded-3xl border border-witcon-deep-forest/10 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-5 font-display text-xl font-bold text-witcon-deep-forest">
        {title}
      </h2>

      <div className="space-y-3">{children}</div>
    </section>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  isLink?: boolean;
}

function InfoRow({ label, value, isLink = false }: InfoRowProps) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-witcon-cream px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-36 shrink-0 text-xs font-semibold uppercase tracking-wide text-witcon-deep-forest/55">
        {label}
      </span>

      {isLink ? (
        <a
          href={
            value.startsWith("http://") || value.startsWith("https://")
              ? value
              : `https://${value}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 truncate text-sm font-medium text-witcon-pink underline-offset-4 hover:underline"
        >
          {value}
        </a>
      ) : (
        <span className="min-w-0 truncate text-sm font-medium text-witcon-deep-forest">
          {value}
        </span>
      )}
    </div>
  );
}

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
}: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-witcon-deep-forest">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-witcon-deep-forest/10 bg-white px-4 py-3 text-sm text-witcon-deep-forest outline-none transition placeholder:text-witcon-deep-forest/40 focus:border-witcon-pink focus:ring-2 focus:ring-witcon-pink/20"
      />
    </label>
  );
}

interface ResourceButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

function ResourceButton({
  label,
  href,
  onClick,
}: ResourceButtonProps) {
  const className =
    "flex w-full items-center justify-between rounded-2xl bg-witcon-cream px-4 py-3 text-sm font-semibold text-witcon-deep-forest transition hover:bg-witcon-sage/20";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <span>{label}</span>
        <span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </button>
  );
}