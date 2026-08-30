'use client'

import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react'
import { Config } from '@/app/constants/config'
import styles from './Location.module.css'

export function Location() {
  return (
    <section id="localizacao" className={styles.locationSection}>
      <div className={styles.locationContainer}>
        <div className={styles.locationInfo}>
          <p className={styles.dentalEyebrow}>
            <span /> ATENDIMENTO EM TAUBATÉ
          </p>
          <h2>Nosso Consultório</h2>
          
          <ul className={styles.infoList}>
            <li>
              <MapPin size={20} />
              <div>
                <strong>Endereço</strong>
                <p>Taubaté - SP (Atendimento com agendamento prévio)</p>
              </div>
            </li>
            <li>
              <Phone size={20} />
              <div>
                <strong>Contato / WhatsApp</strong>
                <p>(12) 99709-3459</p>
              </div>
            </li>
            <li>
              <Clock size={20} />
              <div>
                <strong>Horário de Atendimento</strong>
                <p>Segunda a Sexta: 08h às 18h</p>
              </div>
            </li>
          </ul>

          <a 
            href={Config.WHATSAPP_URL} 
            target="_blank" 
            rel="noreferrer" 
            className={styles.locationCta}
          >
            Agendar Visita <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}