'use client'

import { Camera } from 'lucide-react'
import { Config } from '@/app/constants/config'
import styles from './Footer.module.css'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.dentalFooter}>
      <a href="#inicio" className={styles.dentalBrand}>
        <span className={styles.brandSymbol}>B</span>
        <span>
          <strong>{Config.DOCTOR_NAME || 'Dra. Bárbara Glayris'}</strong>
          <small>Cirurgiã-Dentista | Taubaté</small>
        </span>
      </a>

      <p className={styles.copyright}>
        © {currentYear} {Config.DOCTOR_NAME || 'Dra. Bárbara Glayris'}. Todos os direitos reservados.
        <span>{Config.CRO_CODE || 'Cirurgiã-Dentista'}</span>
      </p>

      <a 
        href={Config.INSTAGRAM_URL} 
        target="_blank" 
        rel="noreferrer" 
        className={styles.instagramLink}
      >
        <Camera size={16} />
        <span>@dra.barbaraglayris</span>
      </a>
    </footer>
  )
}