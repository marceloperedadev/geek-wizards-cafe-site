'use client'

import { ArrowUpRight, Award, ShieldCheck } from 'lucide-react'
import { Config } from '@/app/constants/config'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section id="inicio" className={styles.dentalHero}>
      <div className={styles.heroContent}>
        <div className={styles.dentalEyebrow}>
          <span /> Reabilitação Oral & Estética
        </div>
        
        <h1>
          Precisão técnica e <br />
          <em>estética de alta performance.</em>
        </h1>

        <p className={styles.heroLead}>
          Transformamos sorrisos com planejamento digital, implantodontia avançada e lâminas cerâmicas. Protocolos cirúrgicos previsíveis e personalizados para quem exige excelência em Taubaté.
        </p>

        <a 
          href={Config.WHATSAPP_URL} 
          target="_blank" 
          rel="noreferrer" 
          className={styles.dentalButton}
        >
          Agendar Consulta Técnica <ArrowUpRight size={20} />
        </a>

        <div className={styles.heroProof}>
          <div className={styles.proofBadge}>
            <Award size={22} />
          </div>
          <div>
            <strong>Referência em Odontologia Estética</strong>
            <small>Atendimento exclusivo e planejamento 3D</small>
          </div>
        </div>
      </div>

      <div className={styles.heroPortrait}>
        <div className={styles.portraitFrame}>
          <img 
            src="./images/proprietaria.png" 
            alt="Dra. Bárbara Glayris - Cirurgiã-Dentista em Taubaté" 
          />
        </div>

        <div className={styles.portraitCard}>
          <ShieldCheck size={22} color="#e2c285" />
          <div>
            <strong>Protocolo de Segurança</strong>
            <small>Procedimentos guiados e minimamente invasivos</small>
          </div>
        </div>

        <div className={styles.portraitSeal}>
          <span>BG</span>
          <small>Dra. Bárbara<br />Glayris</small>
        </div>
      </div>
    </section>
  )
}