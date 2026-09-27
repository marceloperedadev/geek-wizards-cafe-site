
'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './Gallery.module.css'
import { SITE_CONFIG } from '@/app/constants/links'

const galleryImages = [
  {
    src: '/images/geek-wizards-personagem.png',
    symbol: 'GW',
    alt: 'Ilustração da identidade visual da Geek Wizards Café',
    title: 'A identidade da casa',
    description:
      'Uma atmosfera fantástica para entrar no universo Geek Wizards.',
  },
  {
    src: '/images/Geek-hubCards.jpg',
    symbol: '02',
    alt: 'Miniaturas e dados de RPG sobre uma mesa de madeira',
    title: 'Dados sobre a mesa',
    description:
      'Reúna sua guilda para RPGs, board games e grandes aventuras.',
  },
  {
    src: null,
    symbol: 'CAFÉ',
    alt: 'Arte editorial da categoria de cafés do cardápio',
    title: 'Cafés & poções',
    description:
      'Cafés especiais e poções preparadas para cada aventura.',
  },
  {
    src: null,
    symbol: 'DOCES',
    alt: 'Arte editorial da categoria de doces do cardápio',
    title: 'Doces artesanais',
    description:
      'Doces artesanais para completar sua experiência na taverna.',
  },
]

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const lightboxCloseRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const isOpen = activeIndex !== null

  const activeImage =
    activeIndex !== null
      ? galleryImages[activeIndex]
      : null

  const closeLightbox = () => {
    setActiveIndex(null)
  }

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lightboxCloseRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      openerRef.current?.focus()
      openerRef.current = null
    }
  }, [isOpen])

  const showPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) return null

      return current === 0
        ? galleryImages.length - 1
        : current - 1
    })
  }

  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null) return null

      return current === galleryImages.length - 1
        ? 0
        : current + 1
    })
  }

  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox()
      }

      if (event.key === 'ArrowLeft') {
        showPrevious()
      }

      if (event.key === 'ArrowRight') {
        showNext()
      }

      if (event.key === 'Tab' && lightboxRef.current) {
        const focusable = Array.from(
          lightboxRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          ),
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }
  }, [activeIndex])

  return (
    <>
      <section
        className={styles.gallerySection}
        id="galeria"
        aria-labelledby="gallery-title"
      >
        <div className={styles.galleryContainer}>
          <header className={styles.sectionHeader}>
            <p className={styles.galleryEyebrow}>
              Dentro da Taverna
            </p>

            <h2
              id="gallery-title"
              className={styles.galleryTitle}
            >
              Aventura & Gastronomia
            </h2>

            <p className={styles.gallerySubtitle}>
              Um vislumbre das poções, doces artesanais e
              batalhas épicas que esperam por você.
            </p>
          </header>

          <div
            className={styles.imageGrid}
            aria-label="Galeria de imagens da Geek Wizards Café"
          >
            {galleryImages.map((image, index) => (
              <button
                key={image.title}
                type="button"
                className={styles.imageItem}
                onClick={(event) => {
                  openerRef.current = event.currentTarget
                  setActiveIndex(index)
                }}
                aria-label={`Ampliar imagem: ${image.title}`}
              >
                {image.src ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={700}
                    height={700}
                    quality={85}
                    sizes="(max-width: 480px) 50vw, (max-width: 899px) 50vw, (max-width: 1199px) 230px, 280px"
                  />
                ) : (
                  <span className={styles.galleryArtwork} aria-hidden="true">
                    {image.symbol}
                  </span>
                )}

                <span
                  className={styles.imageOverlay}
                  aria-hidden="true"
                >
                  <span className={styles.imageTag}>
                    {image.title}
                  </span>

                  <span className={styles.expandIcon}>
                    ⤢
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className={styles.galleryCta}>
            <div className={styles.galleryCtaContent}>
              <span className={styles.ctaEyebrow}>
                Sua próxima aventura
              </span>

              <strong className={styles.ctaTitle}>
                Pronto para entrar na guilda?
              </strong>

              <p className={styles.ctaText}>
                Reserve sua mesa e venha viver a experiência
                Geek Wizards de perto.
              </p>
            </div>

            <a
              href={SITE_CONFIG.whatsapp.reservations ?? '#visite'}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              <span>{SITE_CONFIG.whatsapp.reservations ? 'Reservar Mesa' : 'Informações para visita'}</span>

              <span aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {activeImage && activeIndex !== null && (
        <div
          ref={lightboxRef}
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Visualizando ${activeImage.title}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox()
            }
          }}
        >
          <div className={styles.lightboxFrame}>
            <button
              type="button"
              className={styles.lightboxClose}
              ref={lightboxCloseRef}
              onClick={closeLightbox}
              aria-label="Fechar visualização"
            >
              ×
            </button>

            <div className={styles.lightboxImage}>
              {activeImage.src ? (
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(max-width: 900px) 92vw, 82vw"
                  quality={85}
                  priority
                />
              ) : (
                <span className={styles.lightboxArtwork} aria-hidden="true">
                  {activeImage.symbol}
                </span>
              )}
            </div>

            <div className={styles.lightboxInfo}>
              <div>
                <span className={styles.lightboxEyebrow}>
                  Geek Wizards Café
                </span>

                <h3 className={styles.lightboxTitle}>
                  {activeImage.title}
                </h3>

                <p className={styles.lightboxDescription}>
                  {activeImage.description}
                </p>
              </div>

              <span className={styles.lightboxCounter}>
                {String(activeIndex + 1).padStart(2, '0')}
                {' / '}
                {String(galleryImages.length).padStart(2, '0')}
              </span>
            </div>

            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={showPrevious}
              aria-label="Imagem anterior"
            >
              ←
            </button>

            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={showNext}
              aria-label="Próxima imagem"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
