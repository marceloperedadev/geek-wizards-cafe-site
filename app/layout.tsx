import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dra. Bárbara Glayris | Cirurgiã-Dentista em Taubaté',
  description: 'Atendimento odontológico especializado em Taubaté. Reabilitação oral, lâminas de porcelana, implantes e odontologia estética com planejamento 3D.',
  keywords: [
    'dentista taubaté',
    'implantes taubaté',
    'facetas de porcelana taubaté',
    'reabilitação oral taubaté',
    'dra barbara glayris',
    'odontologia estética'
  ],
  authors: [{ name: 'Dra. Bárbara Glayris' }],
  openGraph: {
    title: 'Dra. Bárbara Glayris | Cirurgiã-Dentista em Taubaté',
    description: 'Reabilitação oral, lâminas de porcelana e odontologia estética com planejamento digital 3D em Taubaté.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}