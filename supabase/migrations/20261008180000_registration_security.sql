-- Registration completion, ownership, and private resume storage.
-- Apply this migration only after confirming the existing registrations table
-- uses the columns referenced by src/data/registration.ts.

alter table public.registrations
  add column if not exists registration_status text not null default 'pending_resume';

alter table public.registrations
  drop constraint if exists registrations_registration_status_check;

alter table public.registrations
  add constraint registrations_registration_status_check
  check (registration_status in ('pending_resume', 'complete'));

create unique index if not exists registrations_user_id_unique
  on public.registrations (user_id);

alter table public.registrations enable row level security;

drop policy if exists "attendees can read their registration" on public.registrations;
create policy "attendees can read their registration"
  on public.registrations for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "attendees can create their registration" on public.registrations;
create policy "attendees can create their registration"
  on public.registrations for insert to authenticated
  with check (user_id = (select auth.uid()) and registration_status = 'pending_resume');

-- There is intentionally no attendee UPDATE policy. The completion RPC below
-- is the only attendee-accessible path that changes registration_status, which
-- prevents attendees from changing administrative columns.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('resumes', 'resumes', false, 614400, array['application/pdf'])
on conflict (id) do update
set public = false, file_size_limit = 614400, allowed_mime_types = array['application/pdf'];

drop policy if exists "attendees can upload their resume" on storage.objects;
create policy "attendees can upload their resume"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'resumes' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "attendees can replace their resume" on storage.objects;
create policy "attendees can replace their resume"
  on storage.objects for update to authenticated
  using (bucket_id = 'resumes' and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'resumes' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "attendees can read their resume" on storage.objects;
create policy "attendees can read their resume"
  on storage.objects for select to authenticated
  using (bucket_id = 'resumes' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "attendees can delete their resume" on storage.objects;
create policy "attendees can delete their resume"
  on storage.objects for delete to authenticated
  using (bucket_id = 'resumes' and (storage.foldername(name))[1] = (select auth.uid())::text);

create or replace function public.complete_registration()
returns void
language plpgsql
security definer
set search_path = public, storage
as $$
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  if not exists (
    select 1
    from storage.objects
    where bucket_id = 'resumes'
      and name = (auth.uid())::text || '/resume.pdf'
  ) then
    raise exception 'Resume is required';
  end if;

  update public.registrations
  set registration_status = 'complete'
  where user_id = auth.uid();

  if not found then
    raise exception 'Registration does not exist';
  end if;
end;
$$;

revoke all on function public.complete_registration() from public;
grant execute on function public.complete_registration() to authenticated;
