import { BioHero } from './components/BioHero/BioHero'
import { HubCards } from './components/HubCards/HubCards'
import { Gallery } from './components/Gallery/Gallery'
import { Footer } from './components/Footer/Footer'

export default function Home() {
  return (
    <main>
      <BioHero />

      <HubCards />

      <Gallery />

      <Footer />
    </main>
  )
}