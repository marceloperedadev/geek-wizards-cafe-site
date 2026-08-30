
'use client'

import { ArrowUpRight } from 'lucide-react'
import { Config } from '@/app/constants/config'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <section id="contato" className={styles.contactCta}>

      {/* =====================================================
          ELEMENTOS DECORATIVOS
          ===================================================== */}

      <div
        className={styles.gridOverlay}
        aria-hidden="true"
      />

      <span
        className={`${styles.ctaShape} ${styles.ctaShapeOne}`}
        aria-hidden="true"
      />

      <span
        className={`${styles.ctaShape} ${styles.ctaShapeTwo}`}
        aria-hidden="true"
      />

      <span
        className={`${styles.ctaShape} ${styles.ctaShapeThree}`}
        aria-hidden="true"
      />


      {/* =====================================================
          EYEBROW
          ===================================================== */}

      <div className={styles.dentalEyebrow}>
        <span aria-hidden="true" />

        Agendamento Exclusivo

        <span aria-hidden="true" />
      </div>


      {/* =====================================================
          TÍTULO
          ===================================================== */}

      <h2>
        Pronto para transformar
        <br />
        <em>o seu sorriso?</em>
      </h2>


      {/* =====================================================
          DESCRIÇÃO
          ===================================================== */}

      <p>
        Agende uma avaliação inicial. Analisaremos a anatomia
        do seu sorriso com planejamento digital e total
        previsibilidade.
      </p>


      {/* =====================================================
          CTA
          ===================================================== */}

      <a
        href={Config.WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className={styles.dentalButtonLight}
        aria-label="Solicitar consulta em Taubaté via WhatsApp"
      >
        <span>
          Solicitar consulta em Taubaté
        </span>

        <ArrowUpRight
          size={18}
          strokeWidth={2}
          aria-hidden="true"
        />
      </a>

    </section>
  )
}
