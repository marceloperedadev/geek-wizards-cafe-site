'use client'

import Image from 'next/image'
import styles from './BioHero.module.css'

export function BioHero() {
  const DATA = {
    name: 'Geek Wizards & Café',
    category: 'Cafeteria Temática & Loja Geek',
    description:
      'Seu mundo mágico é aqui. Cafés temáticos, jogos, RPG e cultura geek em um só lugar.',
    badges: [
      'Cafés & Doces',
      'Jogos de Tabuleiro',
      'Mesas de RPG',
      'Artigos Geek',
    ],
    address:
      'Rua Silva Jardim, 97 — Jardim das Nações, Taubaté - SP',
    links: {
      rpgGroup:
        'https://chat.whatsapp.com/L0BD7avJT6jAnv7oQtST4K',
      facebook:
        'https://www.facebook.com/geekwizardscafe',
      locationMaps:
        'https://maps.google.com/?q=Rua+Silva+Jardim+97+Jardim+das+Nacoes+Taubate',
    },
  }

  return (
    <section className={styles.heroSection}>
      {/* PERSONAGEM — ATMOSFERA DE FUNDO */}
      <div className={styles.characterBackground}>
        <Image
          src="/images/geek-wizards-personagem.png"
          alt=""
          fill
          priority
          sizes="(max-width: 899px) 90vw, 650px"
        />
      </div>

      {/* BRILHO AMBIENTE */}
      <div
        className={styles.magicGlow}
        aria-hidden="true"
      />

      {/* CONTEÚDO PRINCIPAL */}
      <div className={styles.heroContainer}>
        {/* LOGO */}
        <div className={styles.imageCard}>
          <Image
            src="/images/geek-wizard.jpg" /* Certifique-se de usar o nome exato da imagem em public/images */
            alt="Geek Wizards & Café"
            width={320}
            height={320}
            priority
            quality={95}
          />
        </div>

        {/* INFORMAÇÕES */}
        <div className={styles.infoWrapper}>
          <p className={styles.eyebrow}>
            {DATA.category}
          </p>

          <h1 className={styles.name}>
            {DATA.name}
          </h1>

          <p className={styles.role}>
            {DATA.description}
          </p>

          {/* DIFERENCIAIS */}
          <div
            className={styles.bioBadgeList}
            aria-label="Experiências da Geek Wizards Café"
          >
            {DATA.badges.map((badge) => (
              <span
                key={badge}
                className={styles.badge}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* AÇÕES */}
          <div className={styles.actionGroup}>
            <a
              href={DATA.links.rpgGroup}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
              aria-label="Entrar no grupo de RPG da Geek Wizards no WhatsApp"
            >
              Grupo de RPG no WhatsApp
            </a>

            <a
              href={DATA.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
              aria-label="Acessar o Facebook oficial da Geek Wizards Café"
            >
              Facebook Oficial
            </a>

            <a
              href={DATA.links.locationMaps}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnTertiary}
              aria-label="Abrir localização da Geek Wizards Café no Google Maps"
            >
              Como Chegar
            </a>
          </div>

          {/* ENDEREÇO */}
          <div className={styles.locationCard}>
            <strong>Ponto de Encontro</strong>
            {DATA.address}
          </div>
        </div>
      </div>
    </section>
  )
}