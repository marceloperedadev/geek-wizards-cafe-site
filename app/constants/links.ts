const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')
const WHATSAPP_VALID =
  /^55\d{10,11}$/.test(WHATSAPP_NUMBER) &&
  !/^(\d)\1+$/.test(WHATSAPP_NUMBER.slice(4))

const whatsappUrl = (message: string): string =>
  WHATSAPP_VALID
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : ''

export const WHATSAPP_CONFIG = {
  configured: WHATSAPP_VALID,
  createUrl: whatsappUrl,
} as const

export const SITE_CONFIG = {
  // =========================================================
  // ESTABELECIMENTO
  // =========================================================

  brandName: 'Geek Wizards Café',

  role:
    'Cafeteria Temática & Loja Geek | Jogos de Tabuleiro, RPG e Cafés Mágicos',

  location:
    'Rua Silva Jardim, 97 — Jardim das Nações, Taubaté - SP',

  // Versão curta usada no rodapé
  locationShort:
    'Rua Silva Jardim, 97 — Jd. das Nações, Taubaté - SP',

  hours: 'Ter a dom · 14h às 22h',

  // =========================================================
  // WHATSAPP
  // =========================================================

  whatsapp: {
    // Atendimento geral. URLs ficam vazias até configurar o número real.
    general: whatsappUrl('Olá! Gostaria de saber mais sobre a Geek Wizards Café.'),

    // Reservas de RPG e jogos
    reservations: whatsappUrl('Olá! Quero reservar uma mesa de RPG ou jogos!'),

    // Cardápio e pedidos
    menu: whatsappUrl('Olá! Gostaria de consultar o cardápio da Geek Wizards Café.'),
    order: whatsappUrl('Olá! Gostaria de fazer um pedido da Geek Wizards Café.'),
  },

  // =========================================================
  // REDES SOCIAIS E LOCALIZAÇÃO
  // =========================================================

  social: {
    instagram:
      'https://www.instagram.com/geekwizardscafe/',

    facebook:
      'https://www.facebook.com/geekwizardscafe/',

    // Grupo oficial de RPG
    rpgGroup:
      'https://chat.whatsapp.com/L0BD7avJT6jAnv7oQtST4K',

    // Google Maps
    maps:
      'https://maps.google.com/?q=Rua+Silva+Jardim+97+Jardim+das+Nacoes+Taubate',
  },
} as const
