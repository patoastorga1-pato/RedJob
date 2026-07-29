-- Optional: assign an admin user manually.
-- 1. Create the user from the RedJob app or Supabase Auth.
-- 2. Copy the user's UUID from Supabase Auth > Users.
-- 3. Replace the UUID below and run this statement in Supabase SQL Editor.

insert into public.user_roles (user_id, role)
values ('00000000-0000-0000-0000-000000000000', 'admin')
on conflict (user_id, role) do nothing;
