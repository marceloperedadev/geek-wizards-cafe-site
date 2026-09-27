import { NextResponse } from 'next/server'
import { isAdminAuthenticated, isSameOriginRequest } from '@/lib/admin-auth'
import { createCategory, getCategories } from '@/lib/catalog'

export const runtime = 'nodejs'

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return json({ error: 'Solicitação inválida.' }, 403)
  if (!(await isAdminAuthenticated())) return json({ error: 'Não autorizado.' }, 401)

  let body: Record<string, unknown>
  try {
    if (Number(request.headers.get('content-length') ?? 0) > 4096) return json({ error: 'Solicitação inválida.' }, 413)
    body = await request.json() as Record<string, unknown>
  } catch {
    return json({ error: 'Informe o nome da categoria.' }, 400)
  }
  if (typeof body.name !== 'string' || !body.name.trim() || body.name.trim().length > 50) {
    return json({ error: 'Informe um nome de até 50 caracteres.' }, 400)
  }

  try {
    const categories = await getCategories()
    const name = body.name.trim()
    if (categories.some((item) => item.name.toLocaleLowerCase('pt-BR') === name.toLocaleLowerCase('pt-BR'))) {
      return json({ error: 'Essa categoria já existe.' }, 400)
    }

    const baseSlug = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'categoria'
    let id = baseSlug
    let suffix = 2
    while (categories.some((item) => item.id === id)) id = `${baseSlug}-${suffix++}`

    const category = await createCategory({
      id,
      slug: id,
      name,
      active: true,
      sortOrder: Math.max(-1, ...categories.map((item) => item.sortOrder)) + 1,
    })
    return json({ category }, 201)
  } catch {
    return json({ error: 'Não foi possível salvar. Tente novamente.' }, 500)
  }
}
