'use client'

import Image from 'next/image'
import { ArrowRight, Clock3, MapPin, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/app/constants/links'
import styles from './BioHero.module.css'

export function BioHero() {
  const DATA = {
    name: 'Geek Wizards & Café',
    category: 'Cafeteria Temática & Loja Geek',
    description:
      'Uma taverna contemporânea para provar cafés mágicos, reunir sua guilda e viver Taubaté de um jeito diferente.',
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

      <div className={styles.magicDust} aria-hidden="true">
        <span className={styles.sparkleOne} />
        <span className={styles.sparkleTwo} />
        <span className={styles.sparkleThree} />
        <span className={styles.sparkleFour} />
      </div>

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
            O café onde
            <span> a magia acontece.</span>
          </h1>

          <p className={styles.role}>
            {DATA.description}
          </p>

          <div className={styles.visitMeta}>
            <span><MapPin size={14} aria-hidden="true" /> Taubaté, SP</span>
            <span><Clock3 size={14} aria-hidden="true" /> Ter a dom · 14h às 22h</span>
          </div>

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
              href={DATA.links.locationMaps}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
              aria-label="Abrir a localização da Geek Wizards Café no Google Maps"
            >
              <MapPin size={17} aria-hidden="true" />
              Planejar minha visita
              <ArrowRight size={17} aria-hidden="true" />
            </a>

            <a
              href={SITE_CONFIG.whatsapp.menu}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
              aria-label="Conhecer o cardápio da Geek Wizards Café"
            >
              Conhecer o cardápio
              <ArrowRight size={16} aria-hidden="true" />
            </a>

            <a
              href={SITE_CONFIG.whatsapp.general}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnTertiary}
              aria-label="Falar com a equipe da Geek Wizards Café pelo WhatsApp"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Chamar no WhatsApp
            </a>
          </div>

          {/* ENDEREÇO */}
          <div className={styles.locationCard}>
            <strong><MapPin size={15} aria-hidden="true" /> Ponto de encontro da guilda</strong>
            <span>{DATA.address}</span>
          </div>

          <p className={styles.heroNote}>
            Chegue, escolha sua poção e fique à vontade. A aventura começa na primeira xícara.
          </p>
        </div>
      </div>
    </section>
  )
}
