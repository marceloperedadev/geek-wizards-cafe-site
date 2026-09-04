
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './Gallery.module.css'
import { SITE_CONFIG } from '@/app/constants/links'

const galleryImages = [
  {
    src: '/images/geek-wizard.jpg',
    alt: 'Mago da Geek Wizards Café',
    title: '🧙‍♂️ Nosso Mago',
    description:
      'Uma atmosfera fantástica para entrar no universo Geek Wizards.',
  },
  {
    src: '/images/dia-de-jogo.jpg',
    alt: 'Clientes jogando jogos de tabuleiro e RPG',
    title: '🎲 Quest & Jogos',
    description:
      'Reúna sua guilda para RPGs, board games e grandes aventuras.',
  },
  {
    src: '/images/cafe-especial.jpg',
    alt: 'Café temático especial da Geek Wizards Café',
    title: '☕ Poções & Cafés',
    description:
      'Cafés especiais e poções preparadas para cada aventura.',
  },
  {
    src: '/images/doce-artesanal.jpg',
    alt: 'Sobremesa artesanal com marshmallow tostado',
    title: '🍫 Doces Mágicos',
    description:
      'Doces artesanais para completar sua experiência na taverna.',
  },
]

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const activeImage =
    activeIndex !== null
      ? galleryImages[activeIndex]
      : null

  const closeLightbox = () => {
    setActiveIndex(null)
  }

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
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow

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
                key={image.src}
                type="button"
                className={styles.imageItem}
                onClick={() => setActiveIndex(index)}
                aria-label={`Ampliar imagem: ${image.title}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={700}
                  height={700}
                  quality={85}
                  sizes="
                    (max-width: 480px) 50vw,
                    (max-width: 899px) 50vw,
                    (max-width: 1199px) 230px,
                    280px
                  "
                />

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
              href={SITE_CONFIG.whatsapp.reservations}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              <span>Reservar Mesa</span>

              <span aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {activeImage && activeIndex !== null && (
        <div
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
              onClick={closeLightbox}
              aria-label="Fechar visualização"
            >
              ×
            </button>

            <div className={styles.lightboxImage}>
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="(max-width: 900px) 92vw, 82vw"
                quality={95}
                priority
              />
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
