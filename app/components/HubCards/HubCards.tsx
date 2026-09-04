
'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './HubCards.module.css'
import { SITE_CONFIG } from '@/app/constants/links'

export function HubCards() {
  const [shareMessage, setShareMessage] = useState<string | null>(null)

  const getSiteUrl = () => {
    if (typeof window === 'undefined') return ''

    return window.location.origin
  }

  const getMenuUrl = () => {
    if (typeof window === 'undefined') return ''

    return `${window.location.origin}/cardapio`
  }

  const copyToClipboard = async (url: string) => {
    if (!url) return false

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        return true
      }

      const input = document.createElement('input')

      input.value = url
      input.setAttribute('readonly', '')
      input.style.position = 'fixed'
      input.style.opacity = '0'

      document.body.appendChild(input)

      input.select()

      const copied = document.execCommand('copy')

      document.body.removeChild(input)

      return copied
    } catch {
      return false
    }
  }

  const showMessage = (message: string) => {
    setShareMessage(message)

    window.setTimeout(() => {
      setShareMessage(null)
    }, 2200)
  }

  const handleShareMenu = async () => {
    const url = getMenuUrl()

    if (!url) return

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Geek Wizards Café',
          text: 'Confira o cardápio mágico da Geek Wizards Café ✨',
          url,
        })

        return
      }

      const copied = await copyToClipboard(url)

      if (copied) {
        showMessage('Cardápio copiado')
      }
    } catch {
      // Compartilhamento cancelado pelo usuário.
    }
  }

  const handleInvite = async () => {
    const url = getSiteUrl()

    if (!url) return

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Geek Wizards Café',
          text: 'Vem conhecer a Geek Wizards Café comigo ✨',
          url,
        })

        return
      }

      const copied = await copyToClipboard(url)

      if (copied) {
        showMessage('Convite copiado')
      }
    } catch {
      // Compartilhamento cancelado pelo usuário.
    }
  }

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
        className={styles.arcaneGlowSecondary}
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

          <article
            className={`${styles.cardItem} ${styles.cardRpg}`}
          >
            <div className={styles.cardImage}>

              <Image
                src="/images/mesas-rpg.jpg"
                alt="Mesa de RPG e jogos de tabuleiro na Geek Wizards Café"
                width={500}
                height={500}
                sizes="
                  (max-width: 639px) 100vw,
                  (max-width: 899px) 50vw,
                  550px
                "
              />

              <div
                className={styles.imageOverlay}
                aria-hidden="true"
              />

              <div
                className={styles.imageBorder}
                aria-hidden="true"
              />

              <div className={styles.cardTopInfo}>
                <span className={styles.cardIndex}>
                  01
                </span>

                <span
                  className={styles.cardMark}
                  aria-hidden="true"
                >
                  ✦
                </span>
              </div>

              <div className={styles.imageCaption}>
                <span>
                  Aventura
                </span>

                <i aria-hidden="true" />
                
                <span>
                  Estratégia
                </span>
              </div>

            </div>

            <div className={styles.cardContent}>

              <div className={styles.cardEyebrowRow}>
                <span className={styles.cardEyebrow}>
                  Aventura & Estratégia
                </span>

                <span
                  className={styles.cardEyebrowLine}
                  aria-hidden="true"
                />
              </div>

              <h3 className={styles.cardTitle}>
                Mesas de RPG
                <span>& Jogos</span>
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
                <span>
                  Reservar Mesa
                </span>

                <span
                  className={styles.cardLinkArrow}
                  aria-hidden="true"
                >
                  →
                </span>
              </a>

            </div>
          </article>

          {/* =================================================
              CARDÁPIO
              ================================================= */}

          <article
            className={`${styles.cardItem} ${styles.cardMenu}`}
          >
            <div className={styles.cardImage}>

              <Image
                src="/images/cardapio-geek.jpg"
                alt="Cafés, poções e doces temáticos da Geek Wizards Café"
                width={500}
                height={500}
                sizes="
                  (max-width: 639px) 100vw,
                  (max-width: 899px) 50vw,
                  550px
                "
              />

              <div
                className={styles.imageOverlay}
                aria-hidden="true"
              />

              <div
                className={styles.imageBorder}
                aria-hidden="true"
              />

              <div className={styles.cardTopInfo}>
                <span className={styles.cardIndex}>
                  02
                </span>

                <span
                  className={styles.cardMark}
                  aria-hidden="true"
                >
                  ✧
                </span>
              </div>

              <div className={styles.imageCaption}>
                <span>
                  Poções
                </span>

                <i aria-hidden="true" />

                <span>
                  Sabores
                </span>
              </div>

            </div>

            <div className={styles.cardContent}>

              <div className={styles.cardEyebrowRow}>
                <span className={styles.cardEyebrow}>
                  Poções & Sabores
                </span>

                <span
                  className={styles.cardEyebrowLine}
                  aria-hidden="true"
                />
              </div>

              <h3 className={styles.cardTitle}>
                Menu Mágico
                <span>& Delivery</span>
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
                <span>
                  Ver Cardápio
                </span>

                <span
                  className={styles.cardLinkArrow}
                  aria-hidden="true"
                >
                  →
                </span>
              </a>

            </div>
          </article>

        </div>

        {/* ===================================================
            AÇÕES
            =================================================== */}

        <div className={styles.actionArea}>

          <div className={styles.actionHeader}>
            <span className={styles.actionHeaderLine} />

            <span>
              Compartilhe a experiência
            </span>

            <span className={styles.actionHeaderLine} />
          </div>

          <div className={styles.quickActions}>

            {/* COMPARTILHAR CARDÁPIO */}

            <button
              type="button"
              className={styles.quickAction}
              onClick={handleShareMenu}
              aria-label="Compartilhar o cardápio da Geek Wizards Café"
            >
              <span className={styles.quickActionNumber}>
                01
              </span>

              <span className={styles.quickActionContent}>
                <span className={styles.quickActionLabel}>
                  Compartilhar
                </span>

                <span className={styles.quickActionTitle}>
                  Cardápio
                </span>
              </span>

              <span
                className={styles.quickActionArrow}
                aria-hidden="true"
              >
                ↗
              </span>
            </button>

            {/* CONVIDAR */}

            <button
              type="button"
              className={styles.quickAction}
              onClick={handleInvite}
              aria-label="Convidar alguém para conhecer a Geek Wizards Café"
            >
              <span className={styles.quickActionNumber}>
                02
              </span>

              <span className={styles.quickActionContent}>
                <span className={styles.quickActionLabel}>
                  Convide
                </span>

                <span className={styles.quickActionTitle}>
                  Alguém
                </span>
              </span>

              <span
                className={styles.quickActionArrow}
                aria-hidden="true"
              >
                →
              </span>
            </button>

            {/* INSTAGRAM */}

            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quickAction}
              aria-label="Abrir o Instagram da Geek Wizards Café"
            >
              <span className={styles.quickActionNumber}>
                03
              </span>

              <span className={styles.quickActionContent}>
                <span className={styles.quickActionLabel}>
                  Siga no
                </span>

                <span className={styles.quickActionTitle}>
                  Instagram
                </span>
              </span>

              <span
                className={styles.quickActionArrow}
                aria-hidden="true"
              >
                ↗
              </span>
            </a>

          </div>

          {shareMessage && (
            <div
              className={styles.shareToast}
              role="status"
              aria-live="polite"
            >
              <span aria-hidden="true">✦</span>

              {shareMessage}
            </div>
          )}

        </div>

      </div>
    </section>
  )
}
