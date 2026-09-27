import { NextResponse } from 'next/server'
import { isSameOriginRequest } from '@/lib/admin-auth'
import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase/server'

export const runtime = 'nodejs'

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  })
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return json({ error: 'Solicitação inválida.' }, 403)
  if (!isSupabaseConfigured()) return json({ error: 'O painel ainda não foi configurado.' }, 503)

  try {
    if (Number(request.headers.get('content-length') ?? 0) > 4096) {
      return json({ error: 'Solicitação inválida.' }, 413)
    }
    const body = await request.json() as { email?: unknown; password?: unknown }
    if (
      typeof body.email !== 'string' || body.email.length > 320 || !/^\S+@\S+\.\S+$/.test(body.email) ||
      typeof body.password !== 'string' || body.password.length > 256
    ) return json({ error: 'Informe um e-mail e uma senha válidos.' }, 400)

    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email.trim(),
      password: body.password,
    })
    if (error || !data.user) return json({ error: 'E-mail ou senha incorretos.' }, 401)
    if (data.user.app_metadata?.role !== 'admin') {
      await supabase.auth.signOut()
      return json({ error: 'Esta conta não tem acesso ao painel.' }, 403)
    }
    return json({ ok: true })
  } catch {
    return json({ error: 'Não foi possível entrar. Tente novamente.' }, 400)
  }
}

export async function DELETE(request: Request) {
  if (!isSameOriginRequest(request)) return json({ error: 'Solicitação inválida.' }, 403)
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient()
      await supabase.auth.signOut()
    } catch {
      return json({ error: 'Não foi possível sair. Tente novamente.' }, 500)
    }
  }
  return json({ ok: true })
}
