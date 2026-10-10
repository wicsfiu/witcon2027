import { supabase } from '../lib/supabaseClient';

export interface RegistrationForm {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  state: string;
  linkedin: string;
  discord: string;
  github: string;
  race: string;
  raceOther: string;
  gender: string;
  genderOther: string;
  school: string;
  schoolOther: string;
  levelOfStudy: string;
  yearLevel: string;
  fieldOfStudy: string;
  fieldOther: string;
  shirtSize: string;
  foodAllergies: string;
  additionalInformation: string;
  codeOfConduct: boolean;
  photographyConsent: boolean;
}

const emptyToNull = (v: string) => (v.trim() === '' ? null : v.trim());

export async function getRegistration(userId: string) {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error('Your session has expired. Please log in again.');
  }
  if (authData.user.id !== userId) {
    throw new Error('You are not authorized to view this registration.');
  }
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function hasRegistration(userId: string) {
  const registration = await getRegistration(userId);
  return registration?.registration_status === 'complete';
}

export async function createRegistration(userId: string, email: string, f: RegistrationForm) {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user || authData.user.id !== userId) {
    throw new Error('Your session has expired. Please log in again.');
  }
  const { error } = await supabase.from('registrations').insert({
    user_id: userId,
    email,
    first_name: f.firstName.trim(),
    last_name: f.lastName.trim(),
    date_of_birth: f.dateOfBirth,
    country: f.country,
    state: f.state,
    linkedin_url: emptyToNull(f.linkedin),
    discord_handle: emptyToNull(f.discord),
    github_url: emptyToNull(f.github),
    race: f.race,
    race_other: f.race === 'Other' ? emptyToNull(f.raceOther) : null,
    gender: f.gender,
    gender_other: f.gender === 'Other' ? emptyToNull(f.genderOther) : null,
    school: f.school,
    school_other: f.school === 'Other' ? emptyToNull(f.schoolOther) : null,
    level_of_study: f.levelOfStudy,
    year_level: emptyToNull(f.yearLevel),
    field_of_study: f.fieldOfStudy,
    field_other: f.fieldOfStudy === 'Other' ? emptyToNull(f.fieldOther) : null,
    shirt_size: f.shirtSize,
    food_allergies: emptyToNull(f.foodAllergies),
    additional_info: emptyToNull(f.additionalInformation),
    code_of_conduct: f.codeOfConduct,
    photography_consent: f.photographyConsent,
  });
  if (error?.code === '23505') throw new Error("You're already registered.");
  if (error) throw error;
}

export async function uploadResume(userId: string, file: File) {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user || authData.user.id !== userId) {
    throw new Error('You are not authorized to upload this resume.');
  }
  if (file.type !== 'application/pdf' || !file.name.toLowerCase().endsWith('.pdf'))
    throw new Error('Resume must be a PDF.');
  if (file.size > 600 * 1024) throw new Error('Resume must be 600 KB or smaller.');

  const { error } = await supabase.storage
    .from('resumes')
    .upload(`${userId}/resume.pdf`, file, { upsert: true, contentType: 'application/pdf' });
  if (error)
    throw new Error(
      'Resume upload failed. Your registration is still recoverable; please try again.',
    );

  const { error: completionError } = await supabase.rpc('complete_registration');
  if (completionError) {
    throw new Error('Resume uploaded, but registration could not be completed. Please try again.');
  }
}
