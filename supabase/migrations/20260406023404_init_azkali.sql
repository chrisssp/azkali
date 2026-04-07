create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  tokens_discipline integer default 0,
  current_level integer default 1,
  updated_at timestamp with time zone default now()
);

create table impulse_freezer (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  item_name text not null,
  amount numeric(10,2) not null,
  impulsivity_score integer,
  frozen_until timestamp with time zone default (now() + interval '24 hours'),
  status text check (status in ('frozen', 'saved', 'spent')) default 'frozen',
  created_at timestamp with time zone default now()
);

create table social_vaults (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  target_amount numeric(10,2) not null,
  current_amount numeric(10,2) default 0,
  created_by uuid references auth.users,
  created_at timestamp with time zone default now()
);