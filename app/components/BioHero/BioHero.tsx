'use client'

import Image from 'next/image'
import styles from './BioHero.module.css'
import { SITE_CONFIG } from '@/app/constants/links'

export function BioHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>

        <div className={styles.imageCard}>
          <Image
            src="/images/rafael-perfil.jpg"
            alt="Dr. Rafael Vieira — Dentista Estético"
            width={400}
            height={470}
            priority
          />
        </div>

        <div className={styles.infoWrapper}>

          <p className={styles.eyebrow}>
            Odontologia Estética
          </p>

          <h1 className={styles.name}>
            {SITE_CONFIG.doctorName}
          </h1>

          <p className={styles.role}>
            {SITE_CONFIG.role}
          </p>

          <div className={styles.actionGroup}>

            <a
              href={SITE_CONFIG.whatsapp.general}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              Agendar consulta
            </a>

            <a
              href={SITE_CONFIG.whatsapp.courses}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              Mentorias & Cursos
            </a>

          </div>

          <p className={styles.location}>
            {SITE_CONFIG.location}
          </p>

        </div>

      </div>
    </section>
  )
}