import { NextResponse } from 'next/server'
import { isAdminAuthenticated, isSameOriginRequest } from '@/lib/admin-auth'
import { getCategories, updateCategory } from '@/lib/catalog'

export const runtime = 'nodejs'

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function PATCH(
  request: Request,
  context: RouteContext<'/api/admin/categories/[id]'>,
) {
  if (!isSameOriginRequest(request)) return json({ error: 'Solicitação inválida.' }, 403)
  if (!(await isAdminAuthenticated())) return json({ error: 'Não autorizado.' }, 401)
  const { id } = await context.params

  let body: Record<string, unknown>
  try {
    if (Number(request.headers.get('content-length') ?? 0) > 4096) return json({ error: 'Solicitação inválida.' }, 413)
    body = await request.json() as Record<string, unknown>
  } catch {
    return json({ error: 'Confira os dados da categoria.' }, 400)
  }
  if (
    Object.keys(body).some((key) => !['name', 'active', 'sortOrder'].includes(key)) ||
    Object.keys(body).length === 0 ||
    (body.name !== undefined && (typeof body.name !== 'string' || !body.name.trim() || body.name.trim().length > 50)) ||
    (body.active !== undefined && typeof body.active !== 'boolean') ||
    (body.sortOrder !== undefined && (!Number.isInteger(body.sortOrder) || Number(body.sortOrder) < 0 || Number(body.sortOrder) > 9999))
  ) return json({ error: 'Confira os dados da categoria.' }, 400)

  try {
    const categories = await getCategories()
    const current = categories.find((item) => item.id === id)
    if (!current) return json({ error: 'Categoria não encontrada.' }, 404)
    const name = typeof body.name === 'string' ? body.name.trim() : current.name
    if (categories.some((item) => item.id !== id && item.name.toLocaleLowerCase('pt-BR') === name.toLocaleLowerCase('pt-BR'))) {
      return json({ error: 'Essa categoria já existe.' }, 400)
    }

    const category = await updateCategory(id, {
      name,
      ...(typeof body.active === 'boolean' ? { active: body.active } : {}),
      ...(typeof body.sortOrder === 'number' ? { sortOrder: body.sortOrder } : {}),
    })
    if (!category) return json({ error: 'Categoria não encontrada.' }, 404)
    return json({ category })
  } catch {
    return json({ error: 'Não foi possível salvar. Tente novamente.' }, 500)
  }
}
