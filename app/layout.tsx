
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// =========================================================
// SITE
// =========================================================

const SITE_URL = 'https://geek-wizards-cafe.vercel.app'
const SITE_NAME = 'Geek Wizards Café'

const SITE_DESCRIPTION =
  'Cafeteria temática e loja geek em Taubaté. Cafés mágicos, doces, jogos de tabuleiro, RPG e experiências para toda a guilda.'

// =========================================================
// VIEWPORT — PWA
// =========================================================

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#050506',
}

// =========================================================
// METADATA
// =========================================================

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Geek Wizards Café | Cafeteria Temática & Loja Geek',
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
    title: 'Geek Wizards Café | Cafeteria Temática & Loja Geek',

    description:
      'Cafés mágicos, doces temáticos, RPG, jogos de tabuleiro e experiências geek em Taubaté.',

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

    title: 'Geek Wizards Café | Cafeteria Temática & Loja Geek',

    description:
      'Cafés mágicos, doces temáticos, RPG, jogos de tabuleiro e experiências geek em Taubaté.',

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
        url: '/icons/favicon.ico',
        type: 'image/x-icon',
      },

      {
        url: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },

      {
        url: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],

    apple: [
      {
        url: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  },

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

    telephone: '+5512999999999',

    address: {
      '@type': 'PostalAddress',

      streetAddress: 'Rua Silva Jardim, 97',

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

    sameAs: [
      'https://www.instagram.com/geekwizardscafe/',
      'https://www.facebook.com/geekwizardscafe/',
    ],

    servesCuisine: [
      'Café',
      'Doces',
      'Lanches',
    ],

    priceRange: '$$',

    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',

        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],

        opens: '10:00',

        closes: '22:00',
      },
    ],
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
