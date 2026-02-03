import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our user_profiles table
export interface UserProfile {
  id?: string;
  birthday: string; // ISO date
  gender?: 'male' | 'female';
  country?: string;
  height_cm?: number;
  weight_kg?: number;
  activity_level?: 'sedentary' | 'moderate' | 'active' | 'very_active';
  sleep_hours?: number;
  coffee_per_day?: number;
  alcohol_frequency?: 'never' | 'occasionally' | 'weekly' | 'daily';
  smoker_status?: 'never' | 'former' | 'current';
  work_style?: 'office' | 'hybrid' | 'remote';
  work_hours_per_week?: number;
  commute_minutes?: number;
  industry?: string;
  accepted_terms?: boolean;
  accepted_terms_at?: string;
  created_at?: string;
  updated_at?: string;
}

// Save profile and return the ID
export async function saveProfile(profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>): Promise<string | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      ...profile,
      accepted_terms: true,
      accepted_terms_at: new Date().toISOString(),
    })
    .select('id')
    .single();
  
  if (error) {
    console.error('Error saving profile:', error);
    return null;
  }
  
  return data?.id || null;
}

// Update existing profile
export async function updateProfile(id: string, profile: Partial<UserProfile>): Promise<boolean> {
  const { error } = await supabase
    .from('user_profiles')
    .update({
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);
  
  if (error) {
    console.error('Error updating profile:', error);
    return false;
  }
  
  return true;
}

// Load profile by ID
export async function loadProfile(id: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error loading profile:', error);
    return null;
  }
  
  return data;
}
