'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock3, MapPin } from 'lucide-react'
import { SITE_CONFIG } from '@/app/constants/links'
import styles from './BioHero.module.css'

export function BioHero() {
  const DATA = {
    category: 'Cafeteria temática & loja geek',
    description:
      'Cafés, doces, jogos de tabuleiro e mesas de RPG para compartilhar uma pausa diferente em Taubaté.',
    badges: [
      'Cafés & Doces',
      'Jogos de Tabuleiro',
      'Mesas de RPG',
      'Artigos Geek',
    ],
    address: SITE_CONFIG.location,
  }

  return (
    <section
    className={styles.heroSection}
    id="inicio"
  >
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
            <span><Clock3 size={14} aria-hidden="true" /> {SITE_CONFIG.hours}</span>
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

          {/* ENDEREÇO */}
          <div className={styles.locationCard}>
            <strong><MapPin size={15} aria-hidden="true" /> Ponto de encontro da guilda</strong>
            <span>{DATA.address}</span>
          </div>

          {/* AÇÕES */}
          <div className={styles.actionGroup}>
            <Link
              href="/cardapio"
              className={styles.btnPrimary}
              aria-label="Ver o cardápio da Geek Wizards Café"
            >
              Ver cardápio
              <ArrowRight size={17} aria-hidden="true" />
            </Link>

            <a
              href={SITE_CONFIG.social.maps}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
              aria-label="Encontrar a Geek Wizards Café no Google Maps"
            >
              <MapPin size={17} aria-hidden="true" />
              Conhecer o espaço
            </a>

            {SITE_CONFIG.whatsapp.order && (
              <a
                href={SITE_CONFIG.whatsapp.order}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnTertiary}
                aria-label="Iniciar um pedido pelo WhatsApp"
              >
                Pedir pelo WhatsApp
              </a>
            )}
          </div>

          <p className={styles.heroNote}>
            Chegue, escolha sua poção e fique à vontade. A aventura começa na primeira xícara.
          </p>
        </div>
      </div>

      <a
        href="#experiencias"
        className={styles.scrollCue}
        aria-label="Rolar para as experiências da Geek Wizards Café"
      >
        <span aria-hidden="true">✦</span>
        <em>Descubra a casa</em>
      </a>
    </section>
  )
}
