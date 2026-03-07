-- TRH Medical Organisation Database Schema
-- Run this in Supabase SQL Editor

-- 1. PROFILES (Extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  phone_number text,
  role text check (role in ('admin', 'medical_staff', 'workforce', 'member')) default 'member',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. VOLUNTEERS
create table public.volunteers (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  profession text not null, -- Doctor, Nurse, Paramedic, etc.
  license_number text,
  specialization text,
  years_experience integer,
  credential_url text, -- Link to storage bucket
  emergency_contact text,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. EVENTS (Service Deployment)
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  date timestamp with time zone not null,
  service_type text, -- Sunday Service, Midweek, Concert
  required_staff_count integer default 5,
  status text default 'upcoming'
);

-- 4. INCIDENTS (Medical Reports)
create table public.incidents (
  id uuid default uuid_generate_v4() primary key,
  date timestamp with time zone default now(),
  event_id uuid references public.events(id),
  location text not null, -- e.g., "Gallery Left Wing"
  patient_category text check (patient_category in ('member', 'visitor', 'workforce')),
  symptoms text,
  intervention text,
  medication_administered text,
  escalation_required boolean default false,
  hospital_referral text, -- Name of hospital if referred
  reported_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. HEALTH CHECKS (Workforce)
create table public.health_checks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  type text check (type in ('bp', 'sugar', 'consultation')),
  scheduled_at timestamp with time zone not null,
  status text check (status in ('booked', 'completed', 'cancelled')) default 'booked',
  notes text
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.volunteers enable row level security;
alter table public.incidents enable row level security;
alter table public.health_checks enable row level security;

-- Policies (Examples)
-- Public profiles are viewable by everyone (or just authenticated)
create policy "Public profiles are viewable by everyone" on profiles for select using (true);

-- Medical staff can view all incidents
create policy "Medical staff view incidents" on incidents for select 
using (exists (select 1 from profiles where id = auth.uid() and role = 'medical_staff'));
