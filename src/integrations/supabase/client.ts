import { createClient } from '@supabase/supabase-js';

// .env değişkenlerini temizle
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Dikkat: Supabase anahtarları eksik. Vercel ayarlarını kontrol et!");
}

// 'any' kullanımı Database tipi henüz oluşturulmamışsa hataları durdurur
export const supabase = createClient<any>(
  supabaseUrl || "", 
  supabaseAnonKey || ""
);