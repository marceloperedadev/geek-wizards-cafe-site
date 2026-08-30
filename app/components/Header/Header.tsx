'use client'

import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Config } from '@/app/constants/config'
import styles from './Header.module.css'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMenuOpen(false)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <header className={styles.dentalHeader}>
      <a 
        href="#inicio" 
        onClick={handleLogoClick} 
        className={styles.dentalBrand} 
        aria-label="Dra. Bárbara Glayris início"
      >
        <span className={styles.brandSymbol}>B</span>
        <span>
          <strong>{Config.DOCTOR_NAME || 'Dra. Bárbara Glayris'}</strong>
          <small>Cirurgiã-Dentista | Taubaté</small>
        </span>
      </a>

      <nav className={`${styles.dentalNav} ${menuOpen ? styles.open : ''}`} aria-label="Navegação principal">
        <a href="#especialidades" onClick={() => setMenuOpen(false)}>Especialidades</a>
        <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
        <a href="#experiencia" onClick={() => setMenuOpen(false)}>Protocolo</a>
        <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
      </nav>

      <a href={Config.WHATSAPP_URL} target="_blank" rel="noreferrer" className={styles.headerCta}>
        Agendar Consulta <ArrowUpRight size={15} />
      </a>

      <button 
        type="button"
        className={styles.menuToggle} 
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  )
}