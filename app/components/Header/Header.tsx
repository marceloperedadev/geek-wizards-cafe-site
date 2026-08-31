'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Config } from '@/app/constants/config'
import styles from './Header.module.css'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)

  /* =====================================================
     CONTROLE DO HEADER AO ROLAR
     ===================================================== */

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      /* =================================================
         TOPO DA PÁGINA
         ================================================= */

      if (currentScrollY <= 20) {
        setHeaderVisible(true)
        lastScrollY = currentScrollY
        return
      }

      /* =================================================
         ROLANDO PARA BAIXO
         ================================================= */

      if (currentScrollY > lastScrollY) {
        setHeaderVisible(false)
        setMenuOpen(false)
      }

      /* =================================================
         ROLANDO PARA CIMA
         ================================================= */

      if (currentScrollY < lastScrollY) {
        setHeaderVisible(true)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      )
    }
  }, [])


  /* =====================================================
     LOGO
     ===================================================== */

  const handleLogoClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault()

    setMenuOpen(false)
    setHeaderVisible(true)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }


  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <header
      className={`${styles.dentalHeader} ${
        headerVisible
          ? styles.headerVisible
          : styles.headerHidden
      }`}
    >

      {/* =================================================
          MARCA
          ================================================= */}

      <a
        href="#inicio"
        onClick={handleLogoClick}
        className={styles.dentalBrand}
        aria-label="Ir para o início"
      >

        <span className={styles.brandText}>

          <strong>
            {Config.DOCTOR_NAME || 'Dra. Bárbara Glayris'}
          </strong>

          <small>
            Cirurgiã-Dentista
          </small>

        </span>

      </a>


      {/* =================================================
          NAVEGAÇÃO
          ================================================= */}

      <nav
        className={`${styles.dentalNav} ${
          menuOpen
            ? styles.open
            : ''
        }`}
        aria-label="Navegação principal"
      >

        <a
          href="#especialidades"
          onClick={() => setMenuOpen(false)}
        >
          Especialidades
        </a>

        <a
          href="#sobre"
          onClick={() => setMenuOpen(false)}
        >
          Sobre
        </a>

        <a
          href="#experiencia"
          onClick={() => setMenuOpen(false)}
        >
          Protocolo
        </a>

        <a
          href="#contato"
          onClick={() => setMenuOpen(false)}
        >
          Contato
        </a>

      </nav>


      {/* =================================================
          CTA DESKTOP
          ================================================= */}

      <a
        href={Config.WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className={styles.headerCta}
        aria-label="Agendar consulta pelo WhatsApp"
      >

        <span>
          Agendar Consulta
        </span>

        <ArrowUpRight
          size={15}
          aria-hidden="true"
        />

      </a>


      {/* =================================================
          MENU MOBILE
          ================================================= */}

      <button
        type="button"
        className={styles.menuToggle}
        aria-label={
          menuOpen
            ? 'Fechar menu'
            : 'Abrir menu'
        }
        aria-expanded={menuOpen}
        onClick={() =>
          setMenuOpen((prev) => !prev)
        }
      >

        {menuOpen ? (

          <X
            size={20}
            aria-hidden="true"
          />

        ) : (

          <Menu
            size={20}
            aria-hidden="true"
          />

        )}

      </button>

    </header>
  )
}