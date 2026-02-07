-- LifeStats Submissions Tracking Table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/wesbsssmgzjqtjzyutwi/sql

CREATE TABLE IF NOT EXISTS lifestats_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Birthday info
  birth_month INTEGER NOT NULL CHECK (birth_month >= 1 AND birth_month <= 12),
  birth_day INTEGER NOT NULL CHECK (birth_day >= 1 AND birth_day <= 31),
  birth_year INTEGER NOT NULL CHECK (birth_year >= 1900 AND birth_year <= 2100),
  age INTEGER,
  
  -- User selections
  gender TEXT CHECK (gender IN ('male', 'female')),
  location TEXT NOT NULL, -- Country code (us, canada, uk, etc.)
  
  -- Analytics
  ip_address TEXT,
  user_agent TEXT
);

-- Index for querying by date
CREATE INDEX IF NOT EXISTS idx_lifestats_submissions_created_at 
  ON lifestats_submissions(created_at DESC);

-- Index for analyzing demographics
CREATE INDEX IF NOT EXISTS idx_lifestats_submissions_demographics 
  ON lifestats_submissions(gender, location);

-- Enable RLS (Row Level Security) - allow anonymous inserts, no reads
ALTER TABLE lifestats_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (log submissions)
CREATE POLICY "Allow anonymous inserts" 
  ON lifestats_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Policy: Only service role can read (for your analytics)
CREATE POLICY "Service role can read all" 
  ON lifestats_submissions 
  FOR SELECT 
  USING (auth.role() = 'service_role');

COMMENT ON TABLE lifestats_submissions IS 'Logs all LifeStats calculator submissions for analytics';
