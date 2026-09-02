'use client'

import Image from 'next/image'
import styles from './HubCards.module.css'
import { SITE_CONFIG } from '@/app/constants/links'

export function HubCards() {
  return (
    <section
      className={styles.hubSection}
      aria-label="Atendimento e mentorias"
    >
      <div className={styles.hubContainer}>

        {/* =====================================================
            ATENDIMENTO
            ===================================================== */}

        <article className={styles.cardItem}>

          <div className={styles.cardImage}>
            <Image
              src="/images/rafael-01.jpg"
              alt="Caso clínico de lentes em resina"
              width={400}
              height={400}
              sizes="(max-width: 420px) 88px, (max-width: 899px) 125px, 125px"
            />
          </div>

          <div className={styles.cardContent}>

            <h2 className={styles.cardTitle}>
              Dúvidas & Agendamentos
            </h2>

            <p className={styles.cardText}>
              Tire suas dúvidas e agende sua avaliação
              de forma rápida e personalizada.
            </p>

            <a
              href={SITE_CONFIG.whatsapp.appointments}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              Agendar consulta →
            </a>

          </div>

        </article>


        {/* =====================================================
            MENTORIAS
            ===================================================== */}

        <article className={styles.cardItem}>

          <div className={styles.cardImage}>
            <Image
              src="/images/rafael-02.jpg"
              alt="Mentoria de lentes em resina"
              width={400}
              height={400}
              sizes="(max-width: 420px) 88px, (max-width: 899px) 125px, 125px"
            />
          </div>

          <div className={styles.cardContent}>

            <h2 className={styles.cardTitle}>
              Mentorias & Cursos
            </h2>

            <p className={styles.cardText}>
              Aprenda a técnica de lentes em resina
              minimalista e eleve seus resultados clínicos.
            </p>

            <a
              href={SITE_CONFIG.whatsapp.courses}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              Conhecer mentorias →
            </a>

          </div>

        </article>

      </div>
    </section>
  )
}