import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// URL temporária ou final do projeto do Dr. Rafael
const SITE_URL = 'https://site-dr-rafael-vieira.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Dr. Pedro Henrique | Estética do Sorriso & Harmonização Facial',
    template: '%s | Dr. Pedro Henrique',
  },
  description:
    'Especialista em Lentes em Resina Minimalista, Harmonização Facial e Mentorias Técnicas para Cirurgiões-Dentistas em Taubaté.',
  keywords: [
    'dr rafael vieira',
    'dentista taubaté',
    'lentes em resina taubaté',
    'resina minimalista',
    'harmonização facial taubaté',
    'mentoria resina minimalista',
    'curso lentes em resina',
    'estética do sorriso taubaté',
  ],
  authors: [{ name: 'Dr. Rafael Vieira' }],
  creator: 'Dr. Rafael Vieira',
  publisher: 'Dr. Rafael Vieira',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dr. Rafael Vieira | Estética do Sorriso & Harmonização Facial',
    description:
      'Lentes em Resina Minimalista, Harmonização Facial e Cursos para Dentistas.',
    url: SITE_URL,
    siteName: 'Dr. Rafael Vieira',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/rafael-perfil.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dr. Rafael Vieira - Estética do Sorriso',
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: 'Dr. Rafael Vieira - Estética do Sorriso & Harmonização',
    image: `${SITE_URL}/images/rafael-perfil.jpg`,
    '@id': SITE_URL,
    url: SITE_URL,
    telephone: '+5512999999999', // Ajuste para o WhatsApp real dele
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Atendimento em Taubaté',
      addressLocality: 'Taubaté',
      addressRegion: 'SP',
      postalCode: '12000-000',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -23.0264,
      longitude: -45.5552,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    priceRange: '$$$',
    medicalSpecialty: 'Dentistry',
  }

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}