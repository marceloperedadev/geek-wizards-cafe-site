import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// Substitua pela URL final do site
const SITE_URL = 'https://www.drabarbaraglayris.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Dra. Bárbara Glayris | Cirurgiã-Dentista em Taubaté',
    template: '%s | Dra. Bárbara Glayris',
  },
  description:
    'Atendimento odontológico especializado em Taubaté. Reabilitação oral, lâminas de porcelana, implantes e odontologia estética com planejamento 3D.',
  keywords: [
    'dentista taubaté',
    'implantes taubaté',
    'facetas de porcelana taubaté',
    'lâminas de porcelana taubaté',
    'reabilitação oral taubaté',
    'dra barbara glayris',
    'odontologia estética taubaté',
    'clinica odontologica taubaté',
  ],
  authors: [{ name: 'Dra. Bárbara Glayris' }],
  creator: 'Dra. Bárbara Glayris',
  publisher: 'Dra. Bárbara Glayris',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dra. Bárbara Glayris | Cirurgiã-Dentista em Taubaté',
    description:
      'Reabilitação oral, lâminas de porcelana e odontologia estética com planejamento digital 3D em Taubaté.',
    url: SITE_URL,
    siteName: 'Dra. Bárbara Glayris - Odontologia',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Crie uma imagem atraente de 1200x630px na pasta /public
        width: 1200,
        height: 630,
        alt: 'Consultório Dra. Bárbara Glayris em Taubaté',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Schema.org para negócios locais (Dentist/MedicalBusiness)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: 'Dra. Bárbara Glayris - Cirurgiã-Dentista',
    image: `${SITE_URL}/og-image.jpg`,
    '@id': SITE_URL,
    url: SITE_URL,
    telephone: '+5512997093459', // Atualize para o telefone/WhatsApp correto
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Seu Endereço Aqui, Número', // Atualize o endereço
      addressLocality: 'Taubaté',
      addressRegion: 'SP',
      postalCode: '12000-000', // Atualize o CEP
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -23.0264, // Atualize com as coordenadas exatas do Google Maps
      longitude: -45.5552,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    priceRange: '$$',
    medicalSpecialty: 'Dentistry',
  }

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Injeção dos dados estruturados do Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}