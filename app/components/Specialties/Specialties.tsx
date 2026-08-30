'use client'

import { ArrowRight, Sparkles, Shield, Cpu, Activity, Stethoscope, Award } from 'lucide-react'
import { Config } from '@/app/constants/config'
import styles from './Specialties.module.css'

const SPECIALTIES_DATA = [
  {
    number: '01',
    icon: Cpu,
    title: 'Implantodontia Avançada',
    description: 'Planejamento digital guiado por computador para colocação de implantes de alta precisão, garantindo cirurgias minimamente invasivas e rápida recuperação.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Lâminas & Facetas de Porcelana',
    description: 'Design do sorriso sob medida. Restaurações ultrafinas em cerâmica para correção de forma, alinhamento e tonalidade com naturalidade absoluta.',
  },
  {
    number: '03',
    icon: Shield,
    title: 'Reabilitação Oral Complexa',
    description: 'Tratamentos integrados para devolução de função mastigatória e estética em casos de grande perda estrutural ou desgastes acentuados.',
  },
  {
    number: '04',
    icon: Activity,
    title: 'Cirurgia Guiada & Protocolos',
    description: 'Soluções fixas para substituição de próteses removíveis com menor tempo cirúrgico e previsibilidade anatômica total.',
  },
  {
    number: '05',
    icon: Stethoscope,
    title: 'Odontologia Estética & Restauradora',
    description: 'Clareamentos de alta performance e restaurações estéticas diretas que preservam a estrutura dental hígida.',
  },
  {
    number: '06',
    icon: Award,
    title: 'Check-up Digital Preventivo',
    description: 'Mapeamento completo da saúde bucal com imagens de alta definição e scanner intraoral para diagnóstico precoce.',
  },
]

export function Specialties() {
  const getWhatsappLink = (title: string) => {
    const baseUrl = Config.WHATSAPP_URL || 'https://wa.me/5512997093459'
    const message = `Olá! Gostaria de agendar uma consulta sobre ${title} em Taubaté.`
    const separator = baseUrl.includes('?') ? '&' : '?'
    return `${baseUrl}${separator}text=${encodeURIComponent(message)}`
  }

  return (
    <section id="especialidades" className={styles.specialties}>
      <div className={styles.sectionIntro}>
        <div className={styles.dentalEyebrow}>
          <span aria-hidden="true" /> Alta Performance & Tecnologia
        </div>
        <h2>
          Especialidades & <br />
          <em>Protocolos Clínicos.</em>
        </h2>
        <p>
          Soluções odonto-cirúrgicas integradas em Taubaté que unem rigor científico, tecnologia de escaneamento 3D e estética personalizada.
        </p>
      </div>

      <div className={styles.specialtyGrid}>
        {SPECIALTIES_DATA.map((item) => {
          const Icon = item.icon
          const customLink = getWhatsappLink(item.title)

          return (
            <article key={item.number}>
              <span className={styles.specialtyNumber}>{item.number}</span>
              <div className={styles.icon}>
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a 
                href={customLink} 
                target="_blank" 
                rel="noreferrer"
                aria-label={`Saber mais sobre o protocolo de ${item.title} pelo WhatsApp`}
              >
                Saber mais sobre protocolo <ArrowRight size={14} aria-hidden="true" />
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}