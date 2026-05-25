insert into public.clients (
  email,
  full_name,
  package_name,
  status,
  current_step,
  next_action,
  next_appointment
) values (
  'max.schmidt@example.com',
  'Max Schmidt',
  'Match-Magnet',
  'invited',
  2,
  'Onboarding beantworten',
  'Vorgespräch noch nicht geplant'
) on conflict (email) do update set
  full_name = excluded.full_name,
  package_name = excluded.package_name,
  status = excluded.status,
  current_step = excluded.current_step,
  next_action = excluded.next_action,
  next_appointment = excluded.next_appointment,
  updated_at = now();
