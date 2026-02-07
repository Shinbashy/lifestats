import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const { month, day, year, gender, location } = data;
    
    // Calculate age for storage
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    const { error } = await supabase
      .from('lifestats_submissions')
      .insert({
        birth_month: month,
        birth_day: day,
        birth_year: year,
        gender,
        location,
        age,
        user_agent: req.headers.get('user-agent') || null,
        ip_address: req.headers.get('x-forwarded-for')?.split(',')[0] || 
                   req.headers.get('x-real-ip') || 
                   null,
      });
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Log submission error:', error);
    return NextResponse.json({ error: 'Failed to log submission' }, { status: 500 });
  }
}
