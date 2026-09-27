import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Cardapio } from '@/app/components/Cardapio/Cardapio'
import { SITE_CONFIG } from '@/app/constants/links'

export const metadata: Metadata = {
  title: 'Cardápio Mágico',
  description:
    'Cardápio completo da Geek Wizards Café: cafés especiais, poções, doces, salgados e combos temáticos em Taubaté.',
  alternates: {
    canonical: '/cardapio',
  },
}

export default function CardapioPage() {
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

        <a
          href={SITE_CONFIG.whatsapp.menu}
          target="_blank"
          rel="noopener noreferrer"
          className="pageBarCta"
        >
          Falar com a equipe
        </a>
      </div>

      <div id="cardapio-conteudo">
        <Cardapio />
      </div>
    </>
  )
}
