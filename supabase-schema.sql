-- User profiles for personalized stats
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic (from initial form)
  birthday DATE NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female')),
  country TEXT DEFAULT 'us',
  
  -- Body metrics
  height_cm NUMERIC,
  weight_kg NUMERIC,
  activity_level TEXT CHECK (activity_level IN ('sedentary', 'moderate', 'active', 'very_active')),
  
  -- Lifestyle
  sleep_hours NUMERIC,
  coffee_per_day INTEGER,
  alcohol_frequency TEXT CHECK (alcohol_frequency IN ('never', 'occasionally', 'weekly', 'daily')),
  smoker_status TEXT CHECK (smoker_status IN ('never', 'former', 'current')),
  
  -- Work
  work_style TEXT CHECK (work_style IN ('office', 'hybrid', 'remote')),
  work_hours_per_week INTEGER,
  commute_minutes INTEGER,
  industry TEXT,
  
  -- Consent (via ToS acceptance)
  accepted_terms BOOLEAN DEFAULT false,
  accepted_terms_at TIMESTAMPTZ,
  
  -- Meta
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Analytics helper (anonymized)
  age_bracket TEXT GENERATED ALWAYS AS (
    CASE 
      WHEN EXTRACT(YEAR FROM AGE(birthday)) < 18 THEN 'under_18'
      WHEN EXTRACT(YEAR FROM AGE(birthday)) < 25 THEN '18_24'
      WHEN EXTRACT(YEAR FROM AGE(birthday)) < 35 THEN '25_34'
      WHEN EXTRACT(YEAR FROM AGE(birthday)) < 45 THEN '35_44'
      WHEN EXTRACT(YEAR FROM AGE(birthday)) < 55 THEN '45_54'
      WHEN EXTRACT(YEAR FROM AGE(birthday)) < 65 THEN '55_64'
      ELSE '65_plus'
    END
  ) STORED
);

-- Index for analytics queries
CREATE INDEX idx_profiles_country ON user_profiles(country);
CREATE INDEX idx_profiles_age_bracket ON user_profiles(age_bracket);
CREATE INDEX idx_profiles_industry ON user_profiles(industry);
CREATE INDEX idx_profiles_created ON user_profiles(created_at);

-- Aggregated stats view (what we'd sell - no PII)
CREATE VIEW anonymized_stats AS
SELECT 
  country,
  age_bracket,
  gender,
  activity_level,
  industry,
  work_style,
  smoker_status,
  alcohol_frequency,
  AVG(height_cm) as avg_height_cm,
  AVG(weight_kg) as avg_weight_kg,
  AVG(sleep_hours) as avg_sleep_hours,
  AVG(coffee_per_day) as avg_coffee,
  AVG(work_hours_per_week) as avg_work_hours,
  AVG(commute_minutes) as avg_commute,
  COUNT(*) as sample_size
FROM user_profiles
WHERE accepted_terms = true
GROUP BY country, age_bracket, gender, activity_level, industry, work_style, smoker_status, alcohol_frequency
HAVING COUNT(*) >= 10;  -- Only show aggregates with 10+ users (privacy)
