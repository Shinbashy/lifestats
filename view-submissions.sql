-- View all LifeStats submissions
-- Run this in Supabase SQL Editor to see who's using the calculator

SELECT 
  created_at,
  birth_year,
  birth_month,
  birth_day,
  age,
  gender,
  location,
  ip_address,
  SUBSTRING(user_agent, 1, 100) as user_agent_preview
FROM lifestats_submissions
ORDER BY created_at DESC
LIMIT 100;

-- Summary by country
SELECT 
  location,
  COUNT(*) as submissions,
  ROUND(AVG(age)) as avg_age,
  COUNT(CASE WHEN gender = 'male' THEN 1 END) as male,
  COUNT(CASE WHEN gender = 'female' THEN 1 END) as female
FROM lifestats_submissions
GROUP BY location
ORDER BY submissions DESC;

-- Submissions per day
SELECT 
  DATE(created_at) as date,
  COUNT(*) as submissions
FROM lifestats_submissions
GROUP BY DATE(created_at)
ORDER BY date DESC
LIMIT 30;
