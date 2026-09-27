import { NextResponse } from 'next/server'
import { isAdminAuthenticated, isSameOriginRequest } from '@/lib/admin-auth'
import { getCategories, getProduct, updateProduct } from '@/lib/catalog'
import { isValidImageUrl } from '@/lib/catalog-validation'

export const runtime = 'nodejs'

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function PATCH(
  request: Request,
  context: RouteContext<'/api/admin/products/[id]'>,
) {
  if (!isSameOriginRequest(request)) return json({ error: 'Solicitação inválida.' }, 403)
  if (!(await isAdminAuthenticated())) return json({ error: 'Não autorizado.' }, 401)
  const { id: rawId } = await context.params
  const id = Number(rawId)
  if (!Number.isSafeInteger(id) || id <= 0) return json({ error: 'Produto não encontrado.' }, 404)

  let body: Record<string, unknown>
  try {
    if (Number(request.headers.get('content-length') ?? 0) > 32_768) {
      return json({ error: 'Solicitação inválida.' }, 413)
    }
    body = await request.json() as Record<string, unknown>
  } catch {
    return json({ error: 'Confira os campos do produto.' }, 400)
  }

  const allowedKeys = ['name', 'description', 'priceCents', 'categoryId', 'imageUrl', 'active', 'sortOrder']
  if (Object.keys(body).some((key) => !allowedKeys.includes(key)) || Object.keys(body).length === 0) {
    return json({ error: 'Confira os campos do produto.' }, 400)
  }

  try {
    const current = await getProduct(id)
    if (!current) return json({ error: 'Produto não encontrado.' }, 404)
    const categories = await getCategories()
    const merged = {
      name: body.name ?? current.name,
      description: body.description ?? current.description,
      priceCents: body.priceCents ?? current.priceCents,
      categoryId: body.categoryId ?? current.categoryId,
      imageUrl: body.imageUrl === undefined ? current.imageUrl : body.imageUrl,
      active: body.active ?? current.active,
      sortOrder: body.sortOrder ?? current.sortOrder,
    }
    const validated = { ...merged, featured: current.featured }
    if (
      typeof validated.name !== 'string' || !validated.name.trim() || validated.name.length > 100 ||
      typeof validated.description !== 'string' || !validated.description.trim() || validated.description.length > 400 ||
      !Number.isSafeInteger(validated.priceCents) || Number(validated.priceCents) <= 0 || Number(validated.priceCents) > 100_000_000 ||
      typeof validated.categoryId !== 'string' ||
      !(categories.some((category) =>
        category.id === validated.categoryId &&
        (category.active || validated.categoryId === current.categoryId)
      )) ||
      !isValidImageUrl(validated.imageUrl) ||
      typeof validated.active !== 'boolean' ||
      !Number.isInteger(validated.sortOrder) || Number(validated.sortOrder) < 0 || Number(validated.sortOrder) > 9999
    ) throw new Error('INVALID_FIELDS')

    const product = await updateProduct(id, {
      name: validated.name.trim(),
      description: validated.description.trim(),
      priceCents: Number(validated.priceCents),
      categoryId: validated.categoryId,
      imageUrl: typeof validated.imageUrl === 'string' && validated.imageUrl ? validated.imageUrl.trim() : null,
      active: validated.active,
      sortOrder: Number(validated.sortOrder),
    })
    if (!product) return json({ error: 'Produto não encontrado.' }, 404)
    return json({ product })
  } catch (error) {
    const code = error instanceof Error ? error.message : ''
    const invalid = code === 'INVALID_FIELDS'
    return json({
      error: invalid ? 'Confira os campos do produto.' : 'Não foi possível salvar. Tente novamente.',
    }, invalid ? 400 : 500)
  }
}
