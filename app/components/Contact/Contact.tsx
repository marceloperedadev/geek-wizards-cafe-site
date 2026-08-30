'use client'

import { ArrowUpRight } from 'lucide-react'
import { Config } from '@/app/constants/config'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <section id="contato" className={styles.contactCta}>
      {/* Grid de fundo sutil para remeter a planejamento/arquitetura */}
      <div className={styles.gridOverlay} />

      <p className={styles.dentalEyebrow}>
        <span /> Agendamento Exclusivo
      </p>

      <h2>
        Pronto para transformar<br />
        <em>o seu sorriso?</em>
      </h2>

      <p>
        Agende uma avaliação inicial. Analisaremos a anatomia do seu sorriso com planejamento digital e total previsibilidade.
      </p>

      <a 
        href={Config.WHATSAPP_URL} 
        target="_blank" 
        rel="noreferrer" 
        className={styles.dentalButtonLight}
      >
        Solicitar consulta em Taubaté <ArrowUpRight size={18} />
      </a>
    </section>
  )
}