import 'server-only'

import { createSupabasePublicClient, createSupabaseServerClient } from '@/lib/supabase/server'

export type CatalogCategory = {
  id: string
  name: string
  active: boolean
  sortOrder: number
}

export type CatalogProduct = {
  id: number
  name: string
  description: string
  priceCents: number
  categoryId: string
  imageUrl: string | null
  symbol: string
  active: boolean
  featured: boolean
  sortOrder: number
}

export type Catalog = {
  categories: CatalogCategory[]
  products: CatalogProduct[]
}

type ProductInput = Omit<CatalogProduct, 'id'>
type ProductPatch = Partial<Omit<CatalogProduct, 'id'>>
type CategoryPatch = Partial<Pick<CatalogCategory, 'name' | 'active' | 'sortOrder'>>

function mapCategory(row: Record<string, unknown>): CatalogCategory {
  return {
    id: String(row.id),
    name: String(row.name),
    active: Boolean(row.active),
    sortOrder: Number(row.sort_order),
  }
}

function mapProduct(row: Record<string, unknown>): CatalogProduct {
  return {
    id: Number(row.id),
    name: String(row.name),
    description: String(row.description),
    priceCents: Number(row.price_cents),
    categoryId: String(row.category_id),
    imageUrl: typeof row.image_url === 'string' ? row.image_url : null,
    symbol: String(row.symbol),
    active: Boolean(row.active),
    featured: Boolean(row.featured),
    sortOrder: Number(row.sort_order),
  }
}

function fail(error: { message: string } | null) {
  if (error) throw new Error(error.message)
}

export async function getCatalog(): Promise<Catalog> {
  const supabase = await createSupabaseServerClient()
  const [categoryResult, productResult] = await Promise.all([
    supabase.from('categories').select('id, name, active, sort_order').order('sort_order'),
    supabase.from('products').select('id, name, description, price_cents, category_id, image_url, symbol, active, featured, sort_order').order('sort_order'),
  ])
  fail(categoryResult.error)
  fail(productResult.error)

  return {
    categories: (categoryResult.data ?? []).map(mapCategory),
    products: (productResult.data ?? []).map(mapProduct),
  }
}

export async function getPublicCatalog() {
  const supabase = createSupabasePublicClient()
  const categoryResult = await supabase
    .from('categories')
    .select('id, name, active, sort_order')
    .eq('active', true)
    .order('sort_order')
  fail(categoryResult.error)

  const activeCategories = (categoryResult.data ?? []).map(mapCategory)
  if (!activeCategories.length) return { categories: [], products: [] }

  const productResult = await supabase
    .from('products')
    .select('id, name, description, price_cents, category_id, image_url, symbol, active, featured, sort_order')
    .eq('active', true)
    .in('category_id', activeCategories.map((category) => category.id))
    .order('sort_order')
  fail(productResult.error)

  const categoryById = new Map(activeCategories.map((category) => [category.id, category]))
  return {
    categories: activeCategories.map(({ id, name }) => ({ id, name })),
    products: (productResult.data ?? []).map(mapProduct).flatMap((product) => {
      const category = categoryById.get(product.categoryId)
      return category ? [{
        id: product.id,
        nome: product.name,
        descricao: product.description,
        preco: product.priceCents / 100,
        categoria: category.name,
        imagemUrl: product.imageUrl,
        simbolo: product.symbol,
        destaque: product.featured,
      }] : []
    }),
  }
}

export async function createProduct(product: ProductInput): Promise<CatalogProduct> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('products')
    .insert({
      name: product.name,
      description: product.description,
      price_cents: product.priceCents,
      category_id: product.categoryId,
      image_url: product.imageUrl,
      symbol: product.symbol,
      active: product.active,
      featured: product.featured,
      sort_order: product.sortOrder,
    })
    .select('id, name, description, price_cents, category_id, image_url, symbol, active, featured, sort_order')
    .single()
  fail(error)
  if (!data) throw new Error('Supabase did not return the inserted product')
  return mapProduct(data)
}

export async function getProduct(id: number): Promise<CatalogProduct | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price_cents, category_id, image_url, symbol, active, featured, sort_order')
    .eq('id', id)
    .maybeSingle()
  fail(error)
  return data ? mapProduct(data) : null
}

export async function updateProduct(id: number, patch: ProductPatch): Promise<CatalogProduct | null> {
  const updates: Record<string, unknown> = {}
  if (patch.name !== undefined) updates.name = patch.name
  if (patch.description !== undefined) updates.description = patch.description
  if (patch.priceCents !== undefined) updates.price_cents = patch.priceCents
  if (patch.categoryId !== undefined) updates.category_id = patch.categoryId
  if (patch.imageUrl !== undefined) updates.image_url = patch.imageUrl
  if (patch.symbol !== undefined) updates.symbol = patch.symbol
  if (patch.active !== undefined) updates.active = patch.active
  if (patch.featured !== undefined) updates.featured = patch.featured
  if (patch.sortOrder !== undefined) updates.sort_order = patch.sortOrder

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select('id, name, description, price_cents, category_id, image_url, symbol, active, featured, sort_order')
    .maybeSingle()
  fail(error)
  return data ? mapProduct(data) : null
}

export async function createCategory(category: CatalogCategory & { slug: string }) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('categories')
    .insert({ id: category.id, slug: category.slug, name: category.name, active: category.active, sort_order: category.sortOrder })
    .select('id, name, active, sort_order')
    .single()
  fail(error)
  if (!data) throw new Error('Supabase did not return the inserted category')
  return mapCategory(data)
}

export async function updateCategory(id: string, patch: CategoryPatch): Promise<CatalogCategory | null> {
  const updates: Record<string, unknown> = {}
  if (patch.name !== undefined) updates.name = patch.name
  if (patch.active !== undefined) updates.active = patch.active
  if (patch.sortOrder !== undefined) updates.sort_order = patch.sortOrder

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select('id, name, active, sort_order')
    .maybeSingle()
  fail(error)
  return data ? mapCategory(data) : null
}

export async function getCategories(): Promise<CatalogCategory[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, active, sort_order')
    .order('sort_order')
  fail(error)
  return (data ?? []).map(mapCategory)
}
