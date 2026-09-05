import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Geek Wizards & Café',
    short_name: 'Geek Wizards',
    description:
      'Cafeteria temática, RPG, jogos e cultura geek em um só lugar.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050506',
    theme_color: '#050506',
    orientation: 'portrait-primary',

    icons: [
      {
        src: '/icons/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/favicon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}