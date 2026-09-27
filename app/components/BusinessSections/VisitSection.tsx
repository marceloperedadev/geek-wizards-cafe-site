import { ArrowRight, MapPin, MessageCircle, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/app/constants/links'
import { SectionContainer } from './SectionContainer'
import styles from './BusinessSections.module.css'

export function VisitSection() {
  return (
    <section className={styles.visitSection} aria-labelledby="visit-title">
      <SectionContainer>
        <div className={styles.visitPanel}>
          <div>
            <p className={styles.kicker}>Sua próxima parada em Taubaté</p>
            <h2 id="visit-title">A aventura começa com um café.</h2>
            <p className={styles.visitText}>Venha conhecer o espaço, escolher sua mesa e descobrir o cardápio da guilda. Para grupos, reservas e dúvidas, fale diretamente com a nossa equipe.</p>
            <div className={styles.visitActions}>
              <a className={styles.primaryAction} href={SITE_CONFIG.social.maps} target="_blank" rel="noreferrer"><MapPin size={17} aria-hidden="true" /> Como chegar <ArrowRight size={16} aria-hidden="true" /></a>
              <a className={styles.secondaryAction} href={SITE_CONFIG.whatsapp.general} target="_blank" rel="noreferrer"><MessageCircle size={17} aria-hidden="true" /> Falar com a equipe</a>
            </div>
          </div>
          <div className={styles.visitBadge} aria-hidden="true"><Sparkles size={22} /><span>Prepare sua<br /><strong>próxima aventura</strong></span></div>
        </div>
      </SectionContainer>
    </section>
  )
}
