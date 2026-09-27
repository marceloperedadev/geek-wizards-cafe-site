import 'server-only'

import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase/server'

export async function isAdminAuthenticated() {
  if (!isSupabaseConfigured()) return false
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.auth.getUser()
    return !error && data.user?.app_metadata?.role === 'admin'
  } catch {
    return false
  }
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return false
  try {
    return new URL(origin).origin === new URL(request.url).origin
  } catch {
    return false
  }
}
