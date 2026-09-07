import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://hjzvhmrkkdhwkahprxew.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqenZobXJra2Rod2thaHByeGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MzU0NDIsImV4cCI6MjEwNDMxMTQ0Mn0.AoqaFkFCXE_Mrz3UCiLIuEQ0ZxqcDibv8qx0USxoogk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true },
});
