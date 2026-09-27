import { ArrowRight, Clock3, MapPin, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/app/constants/links'
import { SectionContainer } from './SectionContainer'
import styles from './BusinessSections.module.css'

export function VisitSection() {
  return (
    <section
      className={styles.visitSection}
      id="visite"
      aria-labelledby="visit-title"
    >
      <SectionContainer>
        <div className={styles.visitPanel}>
          <div>
            <p className={styles.kicker}>Sua próxima parada em Taubaté</p>
            <h2 id="visit-title">A aventura começa com um café.</h2>
            <p className={styles.visitText}>Venha conhecer o espaço, escolher sua mesa e descobrir o cardápio da guilda. Para grupos, reservas e dúvidas, fale diretamente com a nossa equipe.</p>
            <div className={styles.visitDetails} aria-label="Endereço e horário de funcionamento">
              <p><MapPin size={18} aria-hidden="true" /><span>{SITE_CONFIG.location}</span></p>
              <p><Clock3 size={18} aria-hidden="true" /><span>{SITE_CONFIG.hours}</span></p>
            </div>
            <div className={styles.visitActions}>
              <a className={styles.primaryAction} href={SITE_CONFIG.social.maps} target="_blank" rel="noreferrer"><MapPin size={17} aria-hidden="true" /> Como chegar <ArrowRight size={16} aria-hidden="true" /></a>
              {SITE_CONFIG.whatsapp.general && <a className={styles.secondaryAction} href={SITE_CONFIG.whatsapp.general} target="_blank" rel="noreferrer"><MessageCircle size={17} aria-hidden="true" /> Falar com a equipe</a>}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
