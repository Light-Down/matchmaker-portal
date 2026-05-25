create extension if not exists pgcrypto;

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  email text not null unique,
  full_name text not null,
  package_name text not null default 'Match-Magnet',
  status text not null default 'invited' check (status in ('invited', 'active', 'paused', 'completed')),
  current_step integer not null default 2 check (current_step between 1 and 5),
  next_action text not null default 'Onboarding beantworten',
  next_appointment text not null default 'Vorgespräch noch nicht geplant',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.onboarding_answers (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  question_key text not null,
  answer text not null default '',
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, question_key)
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  kind text not null check (kind in ('consultation', 'shooting')),
  status text not null default 'none' check (status in ('none', 'requested', 'scheduled', 'completed')),
  scheduled_at timestamptz,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, kind)
);

create table if not exists public.portal_events (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.simulator_profiles (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null unique references public.clients(id) on delete cascade,
  display_name text not null,
  age integer not null check (age between 18 and 99),
  bio text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.simulator_sessions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  character_id text not null,
  status text not null default 'active' check (status in ('active', 'completed', 'ghosted')),
  outcome text check (outcome in ('date', 'ghosted')),
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, character_id)
);

create table if not exists public.simulator_messages (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  session_id uuid not null references public.simulator_sessions(id) on delete cascade,
  sender text not null check (sender in ('user', 'character')),
  body text not null,
  coaching jsonb,
  sort_index integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.coach_memories (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  memory_key text not null,
  content text not null,
  source text not null default 'coach',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, memory_key)
);

create table if not exists public.coach_reports (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null unique references public.clients(id) on delete cascade,
  report jsonb not null,
  source_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clients_auth_user_idx on public.clients(auth_user_id);
create index if not exists onboarding_answers_client_idx on public.onboarding_answers(client_id);
create index if not exists appointments_client_kind_idx on public.appointments(client_id, kind);
create index if not exists portal_events_client_idx on public.portal_events(client_id, created_at desc);
create index if not exists simulator_sessions_client_idx on public.simulator_sessions(client_id);
create index if not exists simulator_messages_session_idx on public.simulator_messages(session_id);
create index if not exists simulator_messages_client_session_idx on public.simulator_messages(client_id, session_id, sort_index);
create index if not exists coach_memories_client_idx on public.coach_memories(client_id);

drop trigger if exists clients_updated_at on public.clients;
create trigger clients_updated_at before update on public.clients
for each row execute function public.handle_updated_at();

drop trigger if exists onboarding_answers_updated_at on public.onboarding_answers;
create trigger onboarding_answers_updated_at before update on public.onboarding_answers
for each row execute function public.handle_updated_at();

drop trigger if exists appointments_updated_at on public.appointments;
create trigger appointments_updated_at before update on public.appointments
for each row execute function public.handle_updated_at();

drop trigger if exists simulator_profiles_updated_at on public.simulator_profiles;
create trigger simulator_profiles_updated_at before update on public.simulator_profiles
for each row execute function public.handle_updated_at();

drop trigger if exists simulator_sessions_updated_at on public.simulator_sessions;
create trigger simulator_sessions_updated_at before update on public.simulator_sessions
for each row execute function public.handle_updated_at();

drop trigger if exists coach_memories_updated_at on public.coach_memories;
create trigger coach_memories_updated_at before update on public.coach_memories
for each row execute function public.handle_updated_at();

drop trigger if exists coach_reports_updated_at on public.coach_reports;
create trigger coach_reports_updated_at before update on public.coach_reports
for each row execute function public.handle_updated_at();

revoke all on all tables in schema public from anon;
grant select on public.clients to authenticated;
grant select, insert, update on public.onboarding_answers to authenticated;
grant select on public.appointments to authenticated;
grant select, insert on public.portal_events to authenticated;
grant select, insert, update on public.simulator_profiles to authenticated;
grant select, insert, update, delete on public.simulator_sessions to authenticated;
grant select, insert, update on public.simulator_messages to authenticated;
grant select, insert, update on public.coach_memories to authenticated;
grant select, insert, update on public.coach_reports to authenticated;
grant select, insert, update, delete on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to authenticated, service_role;

alter table public.clients enable row level security;
alter table public.onboarding_answers enable row level security;
alter table public.appointments enable row level security;
alter table public.portal_events enable row level security;
alter table public.simulator_profiles enable row level security;
alter table public.simulator_sessions enable row level security;
alter table public.simulator_messages enable row level security;
alter table public.coach_memories enable row level security;
alter table public.coach_reports enable row level security;

drop policy if exists "clients_select_own" on public.clients;
create policy "clients_select_own"
on public.clients for select
to authenticated
using ((select auth.uid()) = auth_user_id);

drop policy if exists "onboarding_select_own" on public.onboarding_answers;
create policy "onboarding_select_own"
on public.onboarding_answers for select
to authenticated
using (exists (
  select 1 from public.clients
  where clients.id = onboarding_answers.client_id
    and clients.auth_user_id = (select auth.uid())
));

drop policy if exists "onboarding_insert_own" on public.onboarding_answers;
create policy "onboarding_insert_own"
on public.onboarding_answers for insert
to authenticated
with check (exists (
  select 1 from public.clients
  where clients.id = onboarding_answers.client_id
    and clients.auth_user_id = (select auth.uid())
));

drop policy if exists "onboarding_update_own" on public.onboarding_answers;
create policy "onboarding_update_own"
on public.onboarding_answers for update
to authenticated
using (exists (
  select 1 from public.clients
  where clients.id = onboarding_answers.client_id
    and clients.auth_user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.clients
  where clients.id = onboarding_answers.client_id
    and clients.auth_user_id = (select auth.uid())
));

drop policy if exists "appointments_select_own" on public.appointments;
create policy "appointments_select_own"
on public.appointments for select
to authenticated
using (exists (
  select 1 from public.clients
  where clients.id = appointments.client_id
    and clients.auth_user_id = (select auth.uid())
));

drop policy if exists "portal_events_select_own" on public.portal_events;
create policy "portal_events_select_own"
on public.portal_events for select
to authenticated
using (exists (
  select 1 from public.clients
  where clients.id = portal_events.client_id
    and clients.auth_user_id = (select auth.uid())
));

drop policy if exists "portal_events_insert_own" on public.portal_events;
create policy "portal_events_insert_own"
on public.portal_events for insert
to authenticated
with check (exists (
  select 1 from public.clients
  where clients.id = portal_events.client_id
    and clients.auth_user_id = (select auth.uid())
));

drop policy if exists "simulator_profiles_own" on public.simulator_profiles;
create policy "simulator_profiles_own"
on public.simulator_profiles
to authenticated
using (exists (
  select 1 from public.clients
  where clients.id = simulator_profiles.client_id
    and clients.auth_user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.clients
  where clients.id = simulator_profiles.client_id
    and clients.auth_user_id = (select auth.uid())
));

drop policy if exists "simulator_sessions_own" on public.simulator_sessions;
create policy "simulator_sessions_own"
on public.simulator_sessions
to authenticated
using (exists (
  select 1 from public.clients
  where clients.id = simulator_sessions.client_id
    and clients.auth_user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.clients
  where clients.id = simulator_sessions.client_id
    and clients.auth_user_id = (select auth.uid())
));

drop policy if exists "simulator_messages_own" on public.simulator_messages;
create policy "simulator_messages_own"
on public.simulator_messages
to authenticated
using (exists (
  select 1 from public.clients
  where clients.id = simulator_messages.client_id
    and clients.auth_user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.clients
  where clients.id = simulator_messages.client_id
    and clients.auth_user_id = (select auth.uid())
));

drop policy if exists "coach_memories_own" on public.coach_memories;
create policy "coach_memories_own"
on public.coach_memories
to authenticated
using (exists (
  select 1 from public.clients
  where clients.id = coach_memories.client_id
    and clients.auth_user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.clients
  where clients.id = coach_memories.client_id
    and clients.auth_user_id = (select auth.uid())
));

drop policy if exists "coach_reports_own" on public.coach_reports;
create policy "coach_reports_own"
on public.coach_reports
to authenticated
using (exists (
  select 1 from public.clients
  where clients.id = coach_reports.client_id
    and clients.auth_user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.clients
  where clients.id = coach_reports.client_id
    and clients.auth_user_id = (select auth.uid())
));
