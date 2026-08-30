'use client'

import { MessageCircle } from 'lucide-react'
import { Config } from '@/app/constants/config'
import styles from './WhatsAppFloat.module.css'

export function WhatsAppFloat() {
  return (
    <a 
      href={Config.WHATSAPP_URL} 
      target="_blank" 
      rel="noreferrer" 
      className={styles.whatsappFloat} 
      aria-label="Agendar Consulta pelo WhatsApp"
    >
      <MessageCircle size={22} />
    </a>
  )
}