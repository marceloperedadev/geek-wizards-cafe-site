import { NextResponse } from 'next/server'
import { isAdminAuthenticated, isSameOriginRequest } from '@/lib/admin-auth'
import { createProduct, getCatalog, getCategories } from '@/lib/catalog'
import { isValidImageUrl } from '@/lib/catalog-validation'

export const runtime = 'nodejs'

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

async function readBody(request: Request) {
  const length = Number(request.headers.get('content-length') ?? 0)
  if (length > 32_768) return null
  try {
    return await request.json() as Record<string, unknown>
  } catch {
    return null
  }
}

function validFields(body: Record<string, unknown>) {
  return (
    typeof body.name === 'string' && body.name.trim().length > 0 && body.name.trim().length <= 100 &&
    typeof body.description === 'string' && body.description.trim().length > 0 && body.description.trim().length <= 400 &&
    Number.isSafeInteger(body.priceCents) && Number(body.priceCents) > 0 && Number(body.priceCents) <= 100_000_000 &&
    typeof body.categoryId === 'string' && body.categoryId.length <= 80 &&
    isValidImageUrl(body.imageUrl) &&
    typeof body.active === 'boolean' &&
    Number.isInteger(body.sortOrder) && Number(body.sortOrder) >= 0 && Number(body.sortOrder) <= 9999
  )
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return json({ error: 'Não autorizado.' }, 401)
  try {
    const catalog = await getCatalog()
    return json({
      categories: catalog.categories.sort((a, b) => a.sortOrder - b.sortOrder),
      products: catalog.products.sort((a, b) => a.sortOrder - b.sortOrder),
    })
  } catch {
    return json({ error: 'Não foi possível carregar o cardápio.' }, 500)
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return json({ error: 'Solicitação inválida.' }, 403)
  if (!(await isAdminAuthenticated())) return json({ error: 'Não autorizado.' }, 401)
  const body = await readBody(request)
  if (!body || !validFields(body)) return json({ error: 'Confira os campos do produto.' }, 400)
  const name = (body.name as string).trim()
  const description = (body.description as string).trim()

  try {
    const categories = await getCategories()
    if (!categories.some((category) => category.id === body.categoryId && category.active)) {
      return json({ error: 'Escolha uma categoria ativa.' }, 400)
    }
    const product = await createProduct({
      name,
      description,
      priceCents: Number(body.priceCents),
      categoryId: body.categoryId as string,
      imageUrl: body.imageUrl ? String(body.imageUrl).trim() : null,
      symbol: '✦',
      active: body.active as boolean,
      featured: false,
      sortOrder: Number(body.sortOrder),
    })
    return json({ product }, 201)
  } catch {
    return json({
      error: 'Não foi possível salvar. Tente novamente.',
    }, 500)
  }
}
