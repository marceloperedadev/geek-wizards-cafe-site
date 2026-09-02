'use client'

import Image from 'next/image'
import styles from './Gallery.module.css'

const galleryImages = [
  {
    src: '/images/geek-wizard.jpg',
    alt: 'Mago da Geek Wizards Café',
    title: '🧙‍♂️ Nosso Mago',
  },
  {
    src: '/images/dia-de-jogo.jpg',
    alt: 'Clientes jogando jogos de tabuleiro e RPG',
    title: '🎲 Quest & Jogos',
  },
  {
    src: '/images/cafe-especial.jpg',
    alt: 'Café temático especial da Geek Wizards Café',
    title: '☕ Poções & Cafés',
  },
  {
    src: '/images/doce-artesanal.jpg',
    alt: 'Sobremesa artesanal com marshmallow tostado',
    title: '🍫 Doces Mágicos',
  },
]

export function Gallery() {
  return (
    <section
      className={styles.gallerySection}
      aria-labelledby="gallery-title"
    >
      <div className={styles.galleryContainer}>

        {/* =====================================================
            CABEÇALHO
            ===================================================== */}

        <header className={styles.sectionHeader}>
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

        {/* =====================================================
            GALERIA
            ===================================================== */}

        <div
          className={styles.imageGrid}
          aria-label="Galeria de imagens da Geek Wizards Café"
        >
          {galleryImages.map((image) => (
            <figure
              key={image.src}
              className={styles.imageItem}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={500}
                sizes="
                  (max-width: 480px) 50vw,
                  (max-width: 899px) 50vw,
                  230px
                "
              />

              <figcaption className={styles.imageOverlay}>
                <span className={styles.imageTag}>
                  {image.title}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  )
}