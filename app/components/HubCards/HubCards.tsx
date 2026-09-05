'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './HubCards.module.css'
import { SITE_CONFIG } from '@/app/constants/links'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
  }>
}

export function HubCards() {
  const [shareMessage, setShareMessage] = useState<string | null>(null)

  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null)

  const [isStandalone, setIsStandalone] = useState(false)

  /*
   * =========================================================
   * INSTALAÇÃO DO APP
   * =========================================================
   */

  useEffect(() => {
    const checkStandalone = () => {
      const standalone =
        window.matchMedia(
          '(display-mode: standalone)',
        ).matches ||
        (window.navigator as Navigator & {
          standalone?: boolean
        }).standalone === true

      setIsStandalone(standalone)

      return standalone
    }

    // Verifica se já está instalado
    const standalone = checkStandalone()

    if (standalone) {
      return
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()

      setInstallEvent(
        event as BeforeInstallPromptEvent,
      )
    }

    const handleAppInstalled = () => {
      setInstallEvent(null)
      setIsStandalone(true)
    }

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt,
    )

    window.addEventListener(
      'appinstalled',
      handleAppInstalled,
    )

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )

      window.removeEventListener(
        'appinstalled',
        handleAppInstalled,
      )
    }
  }, [])

  const handleInstallApp = async () => {
    if (!installEvent) return

    try {
      await installEvent.prompt()

      const { outcome } =
        await installEvent.userChoice

      if (outcome === 'accepted') {
        setInstallEvent(null)
      }
    } catch {
      // O navegador pode cancelar a solicitação.
    }
  }

  /*
   * =========================================================
   * URL DO SITE
   * =========================================================
   */

  const getSiteUrl = () => {
    if (typeof window === 'undefined') return ''

    return window.location.origin
  }

  const getMenuUrl = () => {
    if (typeof window === 'undefined') return ''

    return `${window.location.origin}/cardapio`
  }

  /*
   * =========================================================
   * COPIAR LINK
   * =========================================================
   */

  const copyToClipboard = async (url: string) => {
    if (!url) return false

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)

        return true
      }

      const input =
        document.createElement('input')

      input.value = url
      input.setAttribute('readonly', '')

      input.style.position = 'fixed'
      input.style.opacity = '0'

      document.body.appendChild(input)

      input.select()

      const copied =
        document.execCommand('copy')

      document.body.removeChild(input)

      return copied
    } catch {
      return false
    }
  }

  /*
   * =========================================================
   * MENSAGEM DE COMPARTILHAMENTO
   * =========================================================
   */

  const showMessage = (message: string) => {
    setShareMessage(message)

    window.setTimeout(() => {
      setShareMessage(null)
    }, 2200)
  }

  /*
   * =========================================================
   * COMPARTILHAR CARDÁPIO
   * =========================================================
   */

  const handleShareMenu = async () => {
    const url = getMenuUrl()

    if (!url) return

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Geek Wizards Café',
          text:
            'Confira o cardápio mágico da Geek Wizards Café ✨',
          url,
        })

        return
      }

      const copied =
        await copyToClipboard(url)

      if (copied) {
        showMessage('Cardápio copiado')
      }
    } catch {
      // Compartilhamento cancelado.
    }
  }

  /*
   * =========================================================
   * CONVIDAR AMIGO
   * =========================================================
   */

  const handleInvite = async () => {
    const url = getSiteUrl()

    if (!url) return

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Geek Wizards Café',
          text:
            'Vem conhecer a Geek Wizards Café comigo ✨',
          url,
        })

        return
      }

      const copied =
        await copyToClipboard(url)

      if (copied) {
        showMessage('Convite copiado')
      }
    } catch {
      // Compartilhamento cancelado.
    }
  }

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <section
      className={styles.hubSection}
      aria-labelledby="hub-title"
    >
      <div
        className={styles.arcaneGlow}
        aria-hidden="true"
      />

      <div className={styles.hubContainer}>
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

        <div className={styles.cardsGrid}>
          {/* =================================================
              CARD 01
              ================================================= */}

          <article className={styles.cardItem}>
            <div className={styles.cardImage}>
              <Image
                src="/images/mesas-rpg.jpg"
                alt="Mesa de RPG e jogos de tabuleiro na Geek Wizards Café"
                width={500}
                height={500}
                sizes="
                  (max-width: 639px) 100vw,
                  (max-width: 899px) 50vw,
                  520px
                "
              />

              <span className={styles.cardNumber}>
                01
              </span>
            </div>

            <div className={styles.cardContent}>
              <p className={styles.cardEyebrow}>
                Aventura & Estratégia
              </p>

              <h3 className={styles.cardTitle}>
                Mesas de RPG
                <span>& Jogos</span>
              </h3>

              <p className={styles.cardText}>
                Garanta sua mesa para campanhas épicas,
                board games e eventos com sua guilda.
              </p>

              <a
                href={
                  SITE_CONFIG.whatsapp.reservations
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
                aria-label="Reservar uma mesa de RPG ou jogos"
              >
                Reservar Mesa

                <span aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </article>

          {/* =================================================
              CARD 02
              ================================================= */}

          <article className={styles.cardItem}>
            <div className={styles.cardImage}>
              <Image
                src="/images/cardapio-geek.jpg"
                alt="Cafés, poções e doces temáticos da Geek Wizards Café"
                width={500}
                height={500}
                sizes="
                  (max-width: 639px) 100vw,
                  (max-width: 899px) 50vw,
                  520px
                "
              />

              <span className={styles.cardNumber}>
                02
              </span>
            </div>

            <div className={styles.cardContent}>
              <p className={styles.cardEyebrow}>
                Poções & Sabores
              </p>

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
                Ver Cardápio

                <span aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </article>
        </div>

        {/* ===================================================
            COMPARTILHE A EXPERIÊNCIA
            =================================================== */}

        <div className={styles.shareSection}>
          <div className={styles.shareHeader}>
            <div>
              <p className={styles.shareEyebrow}>
                Compartilhe a experiência
              </p>

              <h3 className={styles.shareTitle}>
                Chame sua guilda
              </h3>
            </div>

            <span
              className={styles.shareSymbol}
              aria-hidden="true"
            >
              ✦
            </span>
          </div>

          <p className={styles.shareDescription}>
            Gostou da Geek Wizards? Convide seus amigos
            para conhecer, jogar e viver essa experiência
            com você.
          </p>

          <div className={styles.quickActions}>
            {/* =================================================
                COMPARTILHAR CARDÁPIO
                ================================================= */}

            <button
              type="button"
              className={`${styles.quickAction} ${styles.quickActionPrimary}`}
              onClick={handleShareMenu}
              aria-label="Compartilhar o cardápio da Geek Wizards Café"
            >
              <span className={styles.actionIcon}>
                ↗
              </span>

              <span className={styles.actionContent}>
                <strong>
                  Compartilhar Cardápio
                </strong>

                <small>
                  Envie nossas poções e sabores
                </small>
              </span>

              <span
                className={styles.actionArrow}
                aria-hidden="true"
              >
                →
              </span>
            </button>

            {/* =================================================
                CONVIDAR AMIGO
                ================================================= */}

            <button
              type="button"
              className={styles.quickAction}
              onClick={handleInvite}
              aria-label="Convidar alguém para conhecer a Geek Wizards Café"
            >
              <span className={styles.actionIcon}>
                +
              </span>

              <span className={styles.actionContent}>
                <strong>
                  Convidar um Amigo
                </strong>

                <small>
                  Chame sua party para a aventura
                </small>
              </span>

              <span
                className={styles.actionArrow}
                aria-hidden="true"
              >
                →
              </span>
            </button>

            {/* =================================================
                INSTALAR APP
                SÓ APARECE QUANDO O NAVEGADOR
                DISPONIBILIZA A INSTALAÇÃO
                ================================================= */}

            {installEvent && !isStandalone && (
              <button
                type="button"
                className={`${styles.quickAction} ${styles.quickActionInstall}`}
                onClick={handleInstallApp}
                aria-label="Instalar o aplicativo Geek Wizards"
              >
                <span
                  className={styles.actionIcon}
                  aria-hidden="true"
                >
                  ✦
                </span>

                <span
                  className={styles.actionContent}
                >
                  <strong>
                    Instalar App
                  </strong>

                  <small>
                    Leve a Geek Wizards com você
                  </small>
                </span>

                <span
                  className={styles.actionArrow}
                  aria-hidden="true"
                >
                  ↓
                </span>
              </button>
            )}

            {/* =================================================
                INSTAGRAM
                ================================================= */}

            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quickAction}
              aria-label="Abrir o Instagram da Geek Wizards Café"
            >
              <span className={styles.actionIcon}>
                ◎
              </span>

              <span className={styles.actionContent}>
                <strong>
                  Instagram
                </strong>

                <small>
                  Veja novidades e eventos
                </small>
              </span>

              <span
                className={styles.actionArrow}
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </div>

          {/* =================================================
              TOAST
              ================================================= */}

          {shareMessage && (
            <div
              className={styles.shareToast}
              role="status"
              aria-live="polite"
            >
              <span aria-hidden="true">
                ✦
              </span>

              {shareMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}