import type { Metadata } from 'next'
import { connection } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { isSupabaseConfigured } from '@/lib/supabase/server'
import { getCatalog } from '@/lib/catalog'
import { AdminCatalog, type CatalogResponse } from './AdminCatalog'

export const metadata: Metadata = {
  title: 'Administração do cardápio',
  robots: { index: false, follow: false, noarchive: true },
}

export default async function AdminCatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  await connection()
  const params = await searchParams
  const recoveryMode = params.recovery === '1'
  const recoveryError = params['recovery-error'] === '1'
  const [authenticated, configured] = await Promise.all([
    isAdminAuthenticated(),
    Promise.resolve(isSupabaseConfigured()),
  ])
  const catalog = authenticated && !recoveryMode
    ? await getCatalog()
    : { categories: [], products: [] }

  return <AdminCatalog
    initiallyAuthenticated={authenticated}
    configured={configured}
    initialCatalog={catalog as CatalogResponse}
    recoveryMode={recoveryMode}
    recoveryError={recoveryError}
  />
}
