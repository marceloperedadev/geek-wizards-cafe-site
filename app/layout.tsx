
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { SITE_CONFIG } from '@/app/constants/links'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// =========================================================
// SITE
// =========================================================

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://geek-wizards-cafe.vercel.app'
const SITE_NAME = SITE_CONFIG.brandName

const SITE_DESCRIPTION =
  'Geek Wizards Café: uma cafeteria temática em Taubaté para viver cafés especiais, cultura geek, jogos, RPG, eventos e encontros memoráveis.'

// =========================================================
// VIEWPORT — PWA
// =========================================================

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#050506',
}

// =========================================================
// METADATA
// =========================================================

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Geek Wizards Café | Uma experiência além do café',
    template: '%s | Geek Wizards Café',
  },

  description: SITE_DESCRIPTION,

  applicationName: SITE_NAME,

  keywords: [
    'Geek Wizards Café',
    'cafeteria geek Taubaté',
    'cafeteria temática Taubaté',
    'café geek Taubaté',
    'RPG Taubaté',
    'mesas de RPG Taubaté',
    'jogos de tabuleiro Taubaté',
    'board games Taubaté',
    'cafeteria temática',
    'loja geek Taubaté',
    'cafés temáticos',
    'doces temáticos',
    'delivery Taubaté',
  ],

  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: '/',
  },

  // =======================================================
  // OPEN GRAPH
  // =======================================================

  openGraph: {
    title: 'Geek Wizards Café | Uma experiência além do café',

    description:
      'Conheça uma cafeteria temática em Taubaté feita para cafés especiais, jogos, RPG, eventos e encontros fora do comum.',

    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',

    images: [
      {
        url: '/images/geek-wizard.jpg',
        width: 1200,
        height: 630,
        alt: 'Geek Wizards Café',
      },
    ],
  },

  // =======================================================
  // TWITTER
  // =======================================================

  twitter: {
    card: 'summary_large_image',

    title: 'Geek Wizards Café | Uma experiência além do café',

    description:
      'Conheça uma cafeteria temática em Taubaté feita para cafés especiais, jogos, RPG, eventos e encontros fora do comum.',

    images: ['/images/geek-wizard.jpg'],
  },

  // =======================================================
  // ROBOTS
  // =======================================================

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

  // =======================================================
  // ÍCONES / PWA
  // =======================================================

  icons: {
    icon: [
      {
        url: '/icons/favicon.png',
        type: 'image/png',
      },
    ],

    apple: [
      {
        url: '/icons/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  },

  manifest: '/manifest.webmanifest',

  // =======================================================
  // APPLE WEB APP
  // =======================================================

  appleWebApp: {
    capable: true,
    title: 'Geek Wizards',
    statusBarStyle: 'black-translucent',
  },
}

// =========================================================
// ROOT LAYOUT
// =========================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // =======================================================
  // STRUCTURED DATA — GOOGLE / SCHEMA.ORG
  // =======================================================

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',

    name: SITE_NAME,

    description: SITE_DESCRIPTION,

    url: SITE_URL,

    image: `${SITE_URL}/images/geek-wizard.jpg`,

    address: {
      '@type': 'PostalAddress',

      streetAddress: 'Rua Silva Jardim, 97',

      addressLocality: 'Taubaté',

      addressRegion: 'SP',

      addressCountry: 'BR',
    },

    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
    ],

    servesCuisine: [
      'Café',
      'Doces',
      'Lanches',
    ],

    priceRange: '$$',

  }

  return (
    <html
      lang="pt-BR"
      className="scroll-smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
