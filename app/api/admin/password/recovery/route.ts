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
    const body = await request.json() as { email?: unknown }
    if (typeof body.email !== 'string' || body.email.length > 320 || !/^\S+@\S+\.\S+$/.test(body.email)) {
      return json({ error: 'Informe um e-mail válido.' }, 400)
    }

    const supabase = await createSupabaseServerClient()
    await supabase.auth.resetPasswordForEmail(body.email.trim(), {
      redirectTo: new URL('/api/admin/auth/callback', request.url).toString(),
    })

    // A mesma resposta é usada para endereços existentes e inexistentes.
    return json({ ok: true })
  } catch {
    return json({ error: 'Não foi possível solicitar a recuperação agora.' }, 503)
  }
}
