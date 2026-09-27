import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Cardapio } from '@/app/components/Cardapio/Cardapio'
import { SITE_CONFIG } from '@/app/constants/links'
import { connection } from 'next/server'
import { getPublicCatalog } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Cardápio Mágico',
  description:
    'Cardápio completo da Geek Wizards Café: cafés especiais, poções, doces, salgados e combos temáticos em Taubaté.',
  alternates: {
    canonical: '/cardapio',
  },
}

export default async function CardapioPage() {
  await connection()
  const catalog = await getPublicCatalog()

  return (
    <>
      <a href="#cardapio-conteudo" className="skipLink">
        Pular para o cardápio
      </a>

      <div className="pageBar">
        <Link
          href="/"
          className="pageBarLink"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
          />
          Voltar para a home
        </Link>

        {SITE_CONFIG.whatsapp.menu ? (
          <a
            href={SITE_CONFIG.whatsapp.menu}
            target="_blank"
            rel="noopener noreferrer"
            className="pageBarCta"
          >
            Falar com a equipe
          </a>
        ) : (
          <Link href="/#visite" className="pageBarCta">
            Informações para visita
          </Link>
        )}
      </div>

      <div id="cardapio-conteudo">
        <Cardapio
          initialProducts={catalog.products}
          initialCategories={catalog.categories.map((category) => category.name)}
        />
      </div>
    </>
  )
}
