'use client'

import Image from 'next/image'
import styles from './HubCards.module.css'
import { SITE_CONFIG } from '@/app/constants/links'

export function HubCards() {
  return (
    <section
      className={styles.hubSection}
      aria-labelledby="hub-title"
    >
      {/* =====================================================
          ATMOSFERA
          ===================================================== */}

      <div
        className={styles.arcaneGlow}
        aria-hidden="true"
      />

      <div
        className={styles.arcaneLine}
        aria-hidden="true"
      />

      {/* =====================================================
          CONTAINER
          ===================================================== */}

      <div className={styles.hubContainer}>

        {/* ===================================================
            CABEÇALHO
            =================================================== */}

        <header className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>
            Experiências Geek Wizards
          </p>

          <h2
            id="hub-title"
            className={styles.sectionTitle}
          >
            Escolha sua aventura
          </h2>

          <p className={styles.sectionDescription}>
            Reúna sua guilda, reserve sua mesa ou descubra
            as poções e sabores da Geek Wizards Café.
          </p>
        </header>

        {/* ===================================================
            CARDS
            =================================================== */}

        <div className={styles.cardsGrid}>

          {/* =================================================
              RPG
              ================================================= */}

          <article className={styles.cardItem}>

            <div className={styles.cardImage}>
              <Image
                src="/images/mesas-rpg.jpg"
                alt="Mesa de RPG e jogos de tabuleiro na Geek Wizards Café"
                width={500}
                height={500}
                sizes="
                  (max-width: 420px) 100px,
                  (max-width: 639px) 125px,
                  (max-width: 899px) 150px,
                  165px
                "
              />
            </div>

            <div className={styles.cardContent}>

              <p className={styles.cardEyebrow}>
                Aventura & Estratégia
              </p>

              <h3 className={styles.cardTitle}>
                Mesas de RPG & Jogos
              </h3>

              <p className={styles.cardText}>
                Garanta sua mesa para campanhas épicas,
                board games e eventos com sua guilda.
              </p>

              <a
                href={SITE_CONFIG.whatsapp.reservations}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
                aria-label="Reservar uma mesa de RPG ou jogos"
              >
                Reservar Mesa
                <span aria-hidden="true">→</span>
              </a>

            </div>

          </article>

          {/* =================================================
              CARDÁPIO
              ================================================= */}

          <article className={styles.cardItem}>

            <div className={styles.cardImage}>
              <Image
                src="/images/cardapio-geek.jpg"
                alt="Cafés, poções e doces temáticos da Geek Wizards Café"
                width={500}
                height={500}
                sizes="
                  (max-width: 420px) 100px,
                  (max-width: 639px) 125px,
                  (max-width: 899px) 150px,
                  165px
                "
              />
            </div>

            <div className={styles.cardContent}>

              <p className={styles.cardEyebrow}>
                Poções & Sabores
              </p>

              <h3 className={styles.cardTitle}>
                Menu Mágico & Delivery
              </h3>

              <p className={styles.cardText}>
                Explore nossas poções artesanais,
                cafés especiais e doces temáticos.
              </p>

              <a
                href={SITE_CONFIG.whatsapp.menu}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
                aria-label="Ver o cardápio da Geek Wizards Café"
              >
                Ver Cardápio
                <span aria-hidden="true">→</span>
              </a>

            </div>

          </article>

        </div>

      </div>
    </section>
  )
}