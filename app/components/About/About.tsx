'use client'

import Image from 'next/image'
import styles from './About.module.css'

export function About() {
  return (
    <section id="sobre" className={styles.aboutDental}>
      <div className={styles.aboutImage}>
        <Image 
          src="/images/consultorio.jpg" 
          alt="Dra. Bárbara Glayris em seu consultório em Taubaté"
          width={600}
          height={450}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <div className={styles.experienceBadge}>
          <strong>+10</strong>
          <span>Anos de precisão & estética</span>
        </div>
      </div>

      <div className={styles.aboutText}>
        <div className={styles.dentalEyebrow}>
          <span aria-hidden="true" /> Alta Precisão Odontológica
        </div>

        <h2>
          Esculpindo sorrisos.<br />
          <em>Restaurando a sua melhor versão.</em>
        </h2>

        <p>
          A odontologia moderna não é apenas sobre tratar dentes — é sobre a arquitetura do rosto e a harmonia da sua expressão. Trabalho combinando tecnologia digital de ponta e planejamento artesanal.
        </p>

        <p>
          Cada caso é abordado com rigor técnico e foco absoluto na naturalidade. Sem exageros, apenas a melhor versão do seu sorriso resgatada com conforto e previsibilidade.
        </p>

        <div className={styles.signature}>
          Dra. Bárbara Glayris
          <small>Cirurgiã-Dentista | Taubaté - SP</small>
        </div>
      </div>
    </section>
  )
}