'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  Compass,
  Images,
  MapPin,
  Swords,
} from 'lucide-react'
import styles from './SectionNav.module.css'

type Item = {
  id: string
  label: string
  icon: typeof Compass
}
const ITENS: Item[] = [
  { id: 'inicio', label: 'Início', icon: Compass },
  { id: 'aventuras', label: 'Explorar', icon: Swords },
  { id: 'galeria', label: 'Galeria', icon: Images },
  { id: 'visite', label: 'Visita', icon: MapPin },
]

export function SectionNav() {
  const [ativo, setAtivo] = useState('inicio')
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const alvos = ITENS.map((item) =>
      document.getElementById(item.id),
    ).filter((el): el is HTMLElement => el !== null)

    if (alvos.length === 0) return

    const observador = new IntersectionObserver(
      (entradas) => {
        const visivelAgora = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visivelAgora) {
          setAtivo(visivelAgora.target.id)
        }
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 1],
      },
    )

    alvos.forEach((el) => observador.observe(el))

    return () => observador.disconnect()
  }, [])

  useEffect(() => {
    const aoRolar = () => {
      setVisivel(window.scrollY > 320)
    }

    aoRolar()

    window.addEventListener('scroll', aoRolar, { passive: true })

    return () =>
      window.removeEventListener('scroll', aoRolar)
  }, [])

  const irPara = useCallback((id: string) => {
    const alvo = document.getElementById(id)

    if (!alvo) return

    alvo.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    // Evita que o foco e a URL mudem ao navegar por âncoras.
    alvo.setAttribute('tabindex', '-1')
    alvo.focus({ preventScroll: true })
  }, [])

  return (
    <nav
      className={`${styles.nav} ${visivel ? styles.visivel : ''}`}
      aria-label="Seções da página"
    >
      {ITENS.map((item) => {
        const Icon = item.icon

        const selecionado = ativo === item.id

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={
              selecionado
                ? styles.itemAtivo
                : styles.item
            }
            aria-current={selecionado ? 'true' : undefined}
            onClick={(e) => {
              e.preventDefault()
              irPara(item.id)
            }}
          >
            <Icon
              size={15}
              aria-hidden="true"
            />
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}
