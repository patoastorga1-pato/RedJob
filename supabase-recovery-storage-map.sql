-- RedJob Storage ownership audit.
-- READ ONLY: this file does not modify Auth, Storage or public tables.

select
  users.email,
  coalesce(users.raw_user_meta_data->>'role', 'sin rol') as account_role,
  coalesce(users.raw_user_meta_data->>'full_name', '') as account_name,
  objects.name as stored_file,
  objects.created_at
from storage.objects as objects
join auth.users as users
  on users.id::text = split_part(objects.name, '/', 1)
where objects.bucket_id = 'company-logos'
order by users.email, objects.created_at desc, objects.name;
