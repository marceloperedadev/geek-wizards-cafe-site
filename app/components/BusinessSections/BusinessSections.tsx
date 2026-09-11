'use client'

import { ArrowRight, CalendarDays, Coffee, Gamepad2, MapPin, MessageCircle, Sparkles, Users } from 'lucide-react'
import { SITE_CONFIG } from '@/app/constants/links'
import styles from './BusinessSections.module.css'

const experiences = [
  { icon: Coffee, title: 'Café com identidade', text: 'Bebidas, doces e sabores pensados para transformar uma pausa comum em uma experiência memorável.' },
  { icon: Gamepad2, title: 'Sua mesa, sua aventura', text: 'Um espaço preparado para jogos de tabuleiro, RPG e encontros que pedem mais tempo para acontecer.' },
  { icon: CalendarDays, title: 'Programação da guilda', text: 'Eventos e encontros para quem quer descobrir gente nova, campanhas novas e novas histórias.' },
  { icon: Users, title: 'Para grupos e empresas', text: 'Um ponto de encontro original para comemorações, confraternizações e experiências fora do padrão.' },
]

export function BusinessSections() {
  return (
    <>
      <section className={styles.experienceSection} aria-labelledby="experience-title">
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>Muito além de uma cafeteria</p>
          <h2 id="experience-title">Um lugar para entrar, ficar e voltar.</h2>
          <p>O Geek Wizards Café combina hospitalidade, cultura geek e uma experiência de marca que faz cada visita parecer o começo de uma nova história.</p>
        </div>
        <div className={styles.experienceGrid}>
          {experiences.map(({ icon: Icon, title, text }) => (
            <article className={styles.experienceCard} key={title}>
              <span className={styles.iconWrap}><Icon size={20} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.visitSection} aria-labelledby="visit-title">
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
      </section>
    </>
  )
}
