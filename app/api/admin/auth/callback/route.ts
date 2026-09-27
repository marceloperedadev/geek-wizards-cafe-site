import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

function redirectToAdmin(request: NextRequest, result: 'recovery' | 'recovery-error') {
  return NextResponse.redirect(new URL(`/admin/cardapio?${result}=1`, request.url))
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  if (!code) return redirectToAdmin(request, 'recovery-error')

  try {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) return redirectToAdmin(request, 'recovery-error')

    const { data, error: userError } = await supabase.auth.getUser()
    if (userError || data.user?.app_metadata?.role !== 'admin') {
      await supabase.auth.signOut()
      return redirectToAdmin(request, 'recovery-error')
    }

    const response = redirectToAdmin(request, 'recovery')
    response.cookies.set('admin_password_recovery', '1', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/admin/password',
      maxAge: 15 * 60,
    })
    return response
  } catch {
    return redirectToAdmin(request, 'recovery-error')
  }
}
