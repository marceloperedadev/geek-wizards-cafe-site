'use client'

import styles from './About.module.css'

export function About() {
  return (
    <section id="sobre" className={styles.aboutDental}>
      <div className={styles.aboutImage}>
        <img 
          src="./images/consultorio.jpg" 
          alt="Dra. Bárbara Glayris em seu consultório em Taubaté" 
        />
        {/* Badge flutuante com dado de precisão/experiência */}
        <div className={styles.experienceBadge}>
          <strong>+10</strong>
          <span>Anos de precisão & estética</span>
        </div>
      </div>

      <div className={styles.aboutText}>
        <p className={styles.dentalEyebrow}>
          <span /> Alta Precisão Odontológica
        </p>

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