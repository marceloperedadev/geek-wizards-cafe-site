'use client'

import styles from './Experience.module.css'

export function Experience() {
  return (
    <section id="experiencia" className={styles.experience}>
      <div className={styles.dentalEyebrow}>
        <span aria-hidden="true" /> Protocolo Clínico
      </div>

      <h2>
        Metodologia pautada em<br />
        <em>precisão e previsibilidade.</em>
      </h2>

      <ol className={styles.experienceList}>
        <li>
          <b>01</b>
          <div>
            <strong>Mapeamento Digital 3D</strong>
            <small>Escaneamento intraoral de alta definição para diagnóstico funcional e anatômico exato.</small>
          </div>
        </li>

        <li>
          <b>02</b>
          <div>
            <strong>Planejamento Guiado</strong>
            <small>Simulação computadorizada da arquitetura do sorriso antes de qualquer procedimento.</small>
          </div>
        </li>

        <li>
          <b>03</b>
          <div>
            <strong>Execução de Alta Performance</strong>
            <small>Procedimentos minimamente invasivos com foco em durabilidade e estética natural.</small>
          </div>
        </li>
      </ol>
    </section>
  )
}