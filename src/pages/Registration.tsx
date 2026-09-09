import { ChangeEvent, FormEvent, useState } from "react";

export default function Registration() {
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    dateOfBirth: "",

    country: "",
    state: "",

    linkedin: "",
    discord: "",
    github: "",
    website: "",

    race: "",
    raceOther: "",
    gender: "",
    genderOther: "",

    levelOfStudy: "",
    yearLevel: "",
    fieldOfStudy: "",
    fieldOther: "",
    school: "",
    schoolOther: "",

    shirtSize: "",
    foodAllergies: "",
    additionalInformation: "",

    codeOfConduct: false,
    photographyConsent: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setResume(null);
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      e.target.value = "";
      return;
    }

    if (file.size > 600 * 1024) {
      alert("Resume must be 600 KB or smaller.");
      e.target.value = "";
      return;
    }

    setResume(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.email !== formData.confirmEmail) {
      alert("Email addresses do not match.");
      return;
    }

    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    if (!formData.codeOfConduct) {
      alert("You must agree to the WiTCON Code of Conduct.");
      return;
    }

    // Supabase submission will be added here later.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl rounded-3xl border border-witcon-sage bg-white p-10 text-center shadow-sm">
          <div className="mb-4 text-5xl">🌸</div>

          <h1 className="font-display text-4xl font-bold text-witcon-deep-forest">
            Registration Successful!
          </h1>

          <p className="mt-4 text-witcon-brown">
            Thank you for registering for WiTCON 2027!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <h1 className="font-display text-4xl font-bold text-witcon-deep-forest sm:text-5xl">
            Welcome to WiTCON 2027!
          </h1>

          <p className="mt-2 font-display text-xl font-semibold text-witcon-burgundy sm:text-2xl">
            Please register here!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* =========================================
              PERSONAL INFORMATION + PROFILE LINKS
          ========================================= */}
          <div className="grid gap-5 lg:grid-cols-2">

            {/* Personal Information */}
            <div className="rounded-2xl border border-witcon-sage bg-witcon-sage/30 p-5 shadow-sm">
              <h2 className="mb-5 font-display text-2xl font-bold text-witcon-deep-forest">
                Personal Information
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">

                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    First Name *
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    Last Name *
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    Email *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Confirm Email */}
                <div>
                  <label
                    htmlFor="confirmEmail"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    Confirm Email *
                  </label>

                  <input
                    id="confirmEmail"
                    name="confirmEmail"
                    type="email"
                    required
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    Password *
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
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
                    className="form-input"
                  />
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    Country of Residence *
                  </label>

                  <select
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="form-input"
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
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    State of Residence *
                  </label>

                  <select
                    id="state"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="form-input"
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

            {/* Profile Links */}
            <div className="rounded-2xl border border-witcon-soft-lavender bg-witcon-soft-lavender/40 p-5 shadow-sm">
              <h2 className="mb-5 font-display text-2xl font-bold text-witcon-lavender">
                Profile Links
              </h2>

              <div className="space-y-4">

                {/* LinkedIn */}
                <div>
                  <label
                    htmlFor="linkedin"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
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
                    className="form-input"
                  />
                </div>

                {/* Discord */}
                <div>
                  <label
                    htmlFor="discord"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    Discord Username
                  </label>

                  <input
                    id="discord"
                    name="discord"
                    type="text"
                    placeholder="username#1234"
                    value={formData.discord}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* GitHub */}
                <div>
                  <label
                    htmlFor="github"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
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
                    className="form-input"
                  />
                </div>


                {/* Resume */}
                <div>
                  <label
                    htmlFor="resume"
                    className="mb-1.5 block text-sm font-semibold text-witcon-pink"
                  >
                    Resume Upload *
                  </label>

                  <label
                    htmlFor="resume"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-witcon-lavender bg-white/60 px-4 py-6 text-center transition hover:bg-white"
                  >
                    <span className="text-2xl">📄</span>

                    <span className="mt-2 text-sm font-semibold text-witcon-brown">
                      {resume
                        ? resume.name
                        : "Click to upload your resume"}
                    </span>

                    <span className="mt-1 text-xs text-witcon-brown/70">
                      PDF only · Maximum 600 KB
                    </span>

                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleResumeChange}
                      className="hidden"
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
            <div className="rounded-2xl border border-witcon-soft-pink bg-witcon-soft-pink/40 p-5 shadow-sm">
              <h2 className="mb-5 font-display text-2xl font-bold text-witcon-pink">
                Demographic Information
              </h2>

              <div className="space-y-4">

                {/* Race */}
                <div>
                  <label
                    htmlFor="race"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    Race or Ethnicity *
                  </label>

                  <select
                    id="race"
                    name="race"
                    required
                    value={formData.race}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select an option</option>
                    <option value="American Indian or Alaska Native">
                      American Indian or Alaska Native
                    </option>
                    <option value="Asian">Asian</option>
                    <option value="Black or African American">
                      Black or African American
                    </option>
                    <option value="Hispanic or Latino">
                      Hispanic or Latino
                    </option>
                    <option value="Native Hawaiian or Pacific Islander">
                      Native Hawaiian or Pacific Islander
                    </option>
                    <option value="White">White</option>
                    <option value="Two or More Races">
                      Two or More Races
                    </option>
                    <option value="Prefer not to say">
                      Prefer not to say
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.race === "Other" && (
                  <div>
                    <label
                      htmlFor="raceOther"
                      className="mb-1.5 block text-sm font-semibold text-witcon-brown"
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
                      className="form-input"
                    />
                  </div>
                )}

                {/* Gender */}
                <div>
                  <label
                    htmlFor="gender"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    Gender *
                  </label>

                  <select
                    id="gender"
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select gender</option>
                    <option value="Woman">Woman</option>
                    <option value="Man">Man</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">
                      Prefer not to say
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.gender === "Other" && (
                  <div>
                    <label
                      htmlFor="genderOther"
                      className="mb-1.5 block text-sm font-semibold text-witcon-brown"
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
                      className="form-input"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Academic Information */}
            <div className="rounded-2xl border border-witcon-peach bg-witcon-peach/40 p-5 shadow-sm">
              <h2 className="mb-5 font-display text-2xl font-bold text-witcon-terracotta">
                Academic Information
              </h2>

              <div className="space-y-4">

                {/* School */}
                <div>
                  <label
                    htmlFor="school"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    School / University *
                  </label>

                  <select
                    id="school"
                    name="school"
                    required
                    value={formData.school}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select school</option>
                    <option value="Florida International University">
                      Florida International University
                    </option>
                    <option value="University of Miami">
                      University of Miami
                    </option>
                    <option value="University of Florida">
                      University of Florida
                    </option>
                    <option value="Florida State University">
                      Florida State University
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.school === "Other" && (
                  <div>
                    <label
                      htmlFor="schoolOther"
                      className="mb-1.5 block text-sm font-semibold text-witcon-brown"
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
                      className="form-input"
                    />
                  </div>
                )}

                {/* Level of Study */}
                <div>
                  <label
                    htmlFor="levelOfStudy"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    Level of Study *
                  </label>

                  <select
                    id="levelOfStudy"
                    name="levelOfStudy"
                    required
                    value={formData.levelOfStudy}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select level</option>
                    <option value="High School">High School</option>
                    <option value="Undergraduate">
                      Undergraduate
                    </option>
                    <option value="Graduate">Graduate</option>
                    <option value="Doctoral">Doctoral</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Year */}
                <div>
                  <label
                    htmlFor="yearLevel"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    Year Level
                  </label>

                  <select
                    id="yearLevel"
                    name="yearLevel"
                    value={formData.yearLevel}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year or More">
                      5th Year or More
                    </option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                {/* Field of Study */}
                <div>
                  <label
                    htmlFor="fieldOfStudy"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    Field of Study *
                  </label>

                  <select
                    id="fieldOfStudy"
                    name="fieldOfStudy"
                    required
                    value={formData.fieldOfStudy}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select field</option>
                    <option value="Computer Science">
                      Computer Science
                    </option>
                    <option value="Information Technology">
                      Information Technology
                    </option>
                    <option value="Engineering">Engineering</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.fieldOfStudy === "Other" && (
                  <div>
                    <label
                      htmlFor="fieldOther"
                      className="mb-1.5 block text-sm font-semibold text-witcon-brown"
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
                      className="form-input"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="rounded-2xl border border-witcon-soft-blue bg-witcon-soft-blue/40 p-5 shadow-sm">
              <h2 className="mb-5 font-display text-2xl font-bold text-witcon-blue">
                Additional Information
              </h2>

              <div className="space-y-4">

                {/* Shirt Size */}
                <div>
                  <label
                    htmlFor="shirtSize"
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
                  >
                    T-Shirt Size *
                  </label>

                  <select
                    id="shirtSize"
                    name="shirtSize"
                    required
                    value={formData.shirtSize}
                    onChange={handleChange}
                    className="form-input"
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
                    className="mb-1.5 block text-sm font-semibold text-witcon-brown"
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
                    className="form-input resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =========================================
              AGREEMENTS
          ========================================= */}
          <div className="rounded-2xl border border-witcon-sage bg-witcon-sage/30 p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 font-display text-2xl font-bold text-witcon-deep-forest">
              Agreements
            </h2>

            <div className="space-y-4">

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="codeOfConduct"
                  checked={formData.codeOfConduct}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 accent-witcon-forest"
                />

                <span className="text-sm leading-relaxed text-witcon-brown">
                  I have read and agreed to the{" "}
                  <span className="font-semibold underline">
                    WiTCON Code of Conduct
                  </span>
                  . *
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="photographyConsent"
                  checked={formData.photographyConsent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 accent-witcon-forest"
                />

                <span className="text-sm leading-relaxed text-witcon-brown">
                  I consent to being photographed and/or recorded during the
                  event for promotional purposes.
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-center pt-3">
            <button
              type="submit"
              className="rounded-full bg-witcon-forest px-10 py-3 font-semibold text-white shadow-md transition hover:bg-witcon-deep-forest focus:outline-none focus:ring-2 focus:ring-witcon-sage focus:ring-offset-2"
            >
              Submit Registration →
            </button>
          </div>
        </form>
      </div>

      {/* =========================================
          FORM INPUT STYLING
      ========================================= */}
      <style>{`
        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(110, 65, 39, 0.18);
          background: rgba(255, 255, 255, 0.82);
          padding: 0.6rem 0.8rem;
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--color-witcon-brown);
          outline: none;
          transition: all 150ms ease;
        }

        .form-input::placeholder {
          color: rgba(110, 65, 39, 0.45);
        }

        .form-input:focus {
          border-color: var(--color-witcon-pink);
          box-shadow: 0 0 0 2px rgba(250, 162, 195, 0.35);
        }

        select.form-input {
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}