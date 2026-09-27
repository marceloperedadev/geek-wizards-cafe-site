import { Coffee, Gamepad2, CalendarDays, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionContainer } from './SectionContainer'
import styles from './BusinessSections.module.css'

type Experience = {
  icon: LucideIcon
  title: string
  text: string
}

const experiences: Experience[] = [
  { icon: Coffee, title: 'Café com identidade', text: 'Bebidas, doces e sabores pensados para transformar uma pausa comum em uma experiência memorável.' },
  { icon: Gamepad2, title: 'Sua mesa, sua aventura', text: 'Um espaço preparado para jogos de tabuleiro, RPG e encontros que pedem mais tempo para acontecer.' },
  { icon: CalendarDays, title: 'Programação da guilda', text: 'Eventos e encontros para quem quer descobrir gente nova, campanhas novas e novas histórias.' },
  { icon: Users, title: 'Para grupos e empresas', text: 'Um ponto de encontro original para comemorações, confraternizações e experiências fora do padrão.' },
]

export function ExperienceSection() {
  return (
    <section className={styles.experienceSection} aria-labelledby="experience-title">
      <SectionContainer>
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
      </SectionContainer>
    </section>
  )
}
