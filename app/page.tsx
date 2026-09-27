import { BioHero } from './components/BioHero/BioHero'
import { HubCards } from './components/HubCards/HubCards'
import { Gallery } from './components/Gallery/Gallery'
import { ExperienceSection } from './components/BusinessSections/ExperienceSection'
import { VisitSection } from './components/BusinessSections/VisitSection'
import { Footer } from './components/Footer/Footer'
import { SectionNav } from './components/SectionNav/SectionNav'
import { InstallApp } from './components/InstallApp/InstallApp'

export default function Home() {
  return (
    <>
      <SectionNav />

      <main>
        <BioHero />

        <HubCards />

        <Gallery />

        <ExperienceSection />

        <VisitSection />

        <Footer />
      </main>

      <InstallApp />
    </>
  )
}
