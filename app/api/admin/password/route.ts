import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAdminAuthenticated, isSameOriginRequest } from '@/lib/admin-auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  })
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return json({ error: 'Solicitação inválida.' }, 403)

  const cookieStore = await cookies()
  if (cookieStore.get('admin_password_recovery')?.value !== '1') {
    return json({ error: 'Solicitação de recuperação inválida ou expirada.' }, 401)
  }
  if (!(await isAdminAuthenticated())) return json({ error: 'Não autorizado.' }, 401)

  try {
    if (Number(request.headers.get('content-length') ?? 0) > 4096) {
      return json({ error: 'Solicitação inválida.' }, 413)
    }
    const body = await request.json() as { password?: unknown }
    if (typeof body.password !== 'string' || body.password.length < 8 || body.password.length > 256) {
      return json({ error: 'A nova senha deve ter pelo menos 8 caracteres.' }, 400)
    }

    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.updateUser({ password: body.password })
    if (error) return json({ error: 'Não foi possível atualizar a senha.' }, 400)

    await supabase.auth.signOut()
    const response = json({ ok: true })
    response.cookies.set('admin_password_recovery', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/admin/password',
      maxAge: 0,
    })
    return response
  } catch {
    return json({ error: 'Não foi possível atualizar a senha.' }, 400)
  }
}
