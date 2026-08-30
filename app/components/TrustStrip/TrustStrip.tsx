'use client'

import { Star } from 'lucide-react'
import styles from './TrustStrip.module.css'

export function TrustStrip() {
  return (
    <section className={styles.trustStrip}>
      <div>
        <strong>
          +8 <small>Anos</small>
        </strong>
        <span>Experiência Clínica</span>
      </div>
      <div>
        <strong>
          +2.000
        </strong>
        <span>Sorrisos Transformados</span>
      </div>
      <div>
        <strong>
          4.9 <Star size={16} fill="currentColor" color="#c5a059" aria-hidden="true" />
        </strong>
        <span>Avaliação dos Pacientes</span>
      </div>
      <div>
        <strong>
          100<small>%</small>
        </strong>
        <span>Planejamento Digital 3D</span>
      </div>
    </section>
  )
}