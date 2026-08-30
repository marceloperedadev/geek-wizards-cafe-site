'use client'

import { ShieldCheck, Award } from 'lucide-react'
import styles from './Testimonial.module.css'

export function Testimonial() {
  return (
    <section className={styles.testimonial}>
      {/* Coluna Esquerda: Manifesto / Filosofia */}
      <div className={styles.testimonialQuoteWrapper}>
        <div className={styles.eyebrow}>
          <ShieldCheck size={16} aria-hidden="true" />
          Filosofia de Atendimento
        </div>
        
        <blockquote>
          Nossa prioridade na reabilitação oral é devolver não apenas a estética, mas a <mark>função, o conforto e a confiança</mark> através de um planejamento cirúrgico guiado, preciso e humanizado.
        </blockquote>

        <div className={styles.signatureDetails}>
          <p>Tratamentos personalizados com previsibilidade digital e foco total na experiência do paciente em Taubaté.</p>
        </div>
      </div>

      {/* Coluna Direita: Cartão do Profissional */}
      <div className={styles.testimonialAuthorCard}>
        <div className={styles.testimonialAuthor}>
          <span className={styles.avatar}>BG</span>
          <div className={styles.authorMeta}>
            <strong>Dra. Bárbara Glayris</strong>
            <small>Cirurgiã-Dentista | Taubaté - SP</small>
          </div>
        </div>

        <div className={styles.verifiedBadge}>
          <Award size={14} aria-hidden="true" />
          Compromisso com a Excelência
        </div>
      </div>
    </section>
  )
}