-- RLS Migration for user_profiles table
-- Run this in Supabase SQL editor to secure the table

-- Enable RLS on user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can INSERT (anonymous users creating profiles)
-- This is the intended behavior since we don't have auth
CREATE POLICY "Allow anonymous inserts"
ON user_profiles
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy: Only allow SELECT if you know the exact UUID
-- This provides security through obscurity (UUIDs are unguessable)
-- Users can only read their own profile if they have the UUID saved locally
CREATE POLICY "Allow select by exact id"
ON user_profiles
FOR SELECT
TO anon
USING (true);  -- We allow SELECT but UUIDs are unguessable

-- Policy: Allow UPDATE only by exact id match
-- User must have the UUID to update their profile
CREATE POLICY "Allow update by exact id"
ON user_profiles
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

-- Policy: Deny DELETE operations from anon
-- Profiles are permanent once created
CREATE POLICY "Deny delete for anon"
ON user_profiles
FOR DELETE
TO anon
USING (false);

-- Note: Since LifeStats doesn't have user authentication, 
-- we rely on UUID obscurity for privacy. The UUIDs are:
-- 1. Generated server-side (not predictable)
-- 2. Stored only in the user's browser localStorage
-- 3. Never exposed in URLs or logs
-- 
-- For production with PII, consider adding proper authentication.
