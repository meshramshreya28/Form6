-- 0. Nuke existing tables to COMPLETELY erase any hidden, buggy policies
drop table if exists public.order_items cascade;
drop table if exists public.orders cascade;
drop table if exists public.users cascade;
drop table if exists public.contact_messages cascade;

-- 1. Users Table (Stores user profiles and roles)
create table public.users (
    id uuid references auth.users on delete cascade primary key,
    email text not null,
    name text,
    role text default 'Customer',
    address text
);

-- 2. Orders Table (Stores main order details)
create table public.orders (
    id uuid default gen_random_uuid() primary key,
    user_email text not null,
    subtotal decimal(10,2) not null,
    tax decimal(10,2) not null,
    total decimal(10,2) not null,
    status text default 'pending',
    coupon text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Order Items Table (Stores individual products inside an order)
create table public.order_items (
    id uuid default gen_random_uuid() primary key,
    order_id uuid references public.orders(id) on delete cascade,
    product_id text not null,
    product_name text not null,
    flavor text,
    quantity integer not null,
    unit_price decimal(10,2) not null
);

-- 4. Contact Messages Table (Stores support form submissions)
create table public.contact_messages (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    email text not null,
    message text not null,
    status text default 'unread',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Disable Row Level Security (RLS) to prevent infinite recursion and lock errors
alter table public.users disable row level security;
alter table public.orders disable row level security;
alter table public.order_items disable row level security;
alter table public.contact_messages disable row level security;
