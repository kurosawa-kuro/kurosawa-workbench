import { createClient } from '@supabase/supabase-js'
import { consumeAiLimit } from './aiLimit'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// AI 案件相談
export async function consultEngineer(inquiry) {
  if (!supabase) throw new Error('Supabase client is not configured')
  consumeAiLimit()
  const { data, error } = await supabase.functions.invoke('consult-engineer', {
    body: inquiry,
  })
  if (error) throw error
  return data
}
