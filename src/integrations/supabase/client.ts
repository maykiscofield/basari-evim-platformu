import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Değişkenleri alırken tırnaklardan veya boşluklardan arındıralım
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// Eğer değerler yoksa boş string yerine uyarı verelim
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Vercel'den anahtarlar çekilemedi!");
}

export const supabase = createClient<Database>(
  supabaseUrl || "", 
  supabaseAnonKey || ""
)