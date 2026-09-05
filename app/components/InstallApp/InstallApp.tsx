'use client'

import { useEffect, useState } from 'react'
import styles from './InstallApp.module.css'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
  }>
}

export function InstallApp() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null)

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()

      setInstallEvent(event as BeforeInstallPromptEvent)

      // Pequeno atraso para a mensagem não aparecer imediatamente
      setTimeout(() => {
        setVisible(true)
      }, 1800)
    }

    const handleAppInstalled = () => {
      setVisible(false)
      setInstallEvent(null)
    }

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & {
        standalone?: boolean
      }).standalone === true

    if (isStandalone) {
      setVisible(false)
      return
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

  async function instalarApp() {
    if (!installEvent) return

    await installEvent.prompt()

    const { outcome } =
      await installEvent.userChoice

    if (outcome === 'accepted') {
      setVisible(false)
    }

    setInstallEvent(null)
  }

  function fechar() {
    setVisible(false)
  }

  if (!visible || !installEvent) {
    return null
  }

  return (
    <aside
      className={styles.installCard}
      aria-label="Instalar Geek Wizards"
    >
      <div className={styles.glow} />

      <button
        type="button"
        className={styles.close}
        onClick={fechar}
        aria-label="Fechar"
      >
        ×
      </button>

      <div className={styles.header}>
        <div className={styles.symbol}>
          ✦
        </div>

        <div>
          <span className={styles.eyebrow}>
            CONVITE DA GUILDA
          </span>

          <h2>
            Leve a Geek Wizards
            <br />
            com você.
          </h2>
        </div>
      </div>

      <p className={styles.description}>
        Instale nosso app e tenha acesso rápido ao
        cardápio, eventos, RPG e novidades.
      </p>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.install}
          onClick={instalarApp}
        >
          <span>✦</span>
          INSTALAR APP
        </button>

        <button
          type="button"
          className={styles.later}
          onClick={fechar}
        >
          Agora não
        </button>
      </div>
    </aside>
  )
}