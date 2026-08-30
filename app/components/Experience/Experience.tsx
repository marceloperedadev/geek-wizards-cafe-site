'use client'

import styles from './Experience.module.css'

export function Experience() {
  return (
    <section id="experiencia" className={styles.experience}>
      <p className={styles.dentalEyebrow}>
        <span /> Protocolo Clínico
      </p>

      <h2>
        Metodologia pautada em<br />
        <em>precisão e previsibilidade.</em>
      </h2>

      <ol className={styles.experienceList}>
        <li>
          <b>01</b>
          <span>
            <strong>Mapeamento Digital 3D</strong>
            <small>Escaneamento intraoral de alta definição para diagnóstico funcional e anatômico exato.</small>
          </span>
        </li>

        <li>
          <b>02</b>
          <span>
            <strong>Planejamento Guiado</strong>
            <small>Simulação computadorizada da arquitetura do sorriso antes de qualquer procedimento.</small>
          </span>
        </li>

        <li>
          <b>03</b>
          <span>
            <strong>Execução de Alta Performance</strong>
            <small>Procedimentos minimamente invasivos com foco em durabilidade e estética natural.</small>
          </span>
        </li>
      </ol>
    </section>
  )
}