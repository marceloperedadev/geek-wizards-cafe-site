
'use client'

import { Camera } from 'lucide-react'
import { Config } from '@/app/constants/config'
import styles from './Footer.module.css'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.dentalFooter}>

      {/* =====================================================
          BRAND / LOGO
          ===================================================== */}

      <a
        href="#inicio"
        className={styles.dentalBrand}
        aria-label="Voltar ao início"
      >
        <span className={styles.brandSymbol}>
          <img
            src="/images/logo-dentista.png"
            alt={Config.DOCTOR_NAME || 'Dra. Bárbara Glayris'}
          />
        </span>

        <div>
          <strong>
            {Config.DOCTOR_NAME || 'Dra. Bárbara Glayris'}
          </strong>

          <small>
            Cirurgiã-Dentista | Taubaté
          </small>
        </div>
      </a>

      {/* =====================================================
          COPYRIGHT
          ===================================================== */}

      <p className={styles.copyright}>
        © {currentYear}{' '}
        {Config.DOCTOR_NAME || 'Dra. Bárbara Glayris'}.
        Todos os direitos reservados.

        <span>
          {Config.CRO_CODE || 'Cirurgiã-Dentista'}
        </span>
      </p>

      {/* =====================================================
          INSTAGRAM
          ===================================================== */}

      <a
        href={Config.INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className={styles.instagramLink}
        aria-label="Perfil do Instagram da Dra. Bárbara Glayris"
      >
        <Camera
          size={16}
          aria-hidden="true"
        />

        <span>
          @dra.barbaraglayris
        </span>
      </a>

    </footer>
  )
}
