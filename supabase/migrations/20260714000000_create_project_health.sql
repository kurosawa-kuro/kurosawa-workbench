create table if not exists public.project_health (
  id smallint primary key,
  created_at timestamptz not null default now(),
  constraint project_health_singleton check (id = 1)
);

comment on table public.project_health is
  'Singleton row read by the shared Cloudflare keep-alive Worker to generate lightweight database activity.';

alter table public.project_health enable row level security;

revoke all on table public.project_health from public, anon, authenticated;
grant select on table public.project_health to anon;

drop policy if exists "anon can read project health" on public.project_health;
create policy "anon can read project health"
  on public.project_health
  for select
  to anon
  using (id = 1);

insert into public.project_health (id)
values (1)
on conflict (id) do nothing;
