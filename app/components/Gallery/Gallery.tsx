'use client'

import Image from 'next/image'
import styles from './Gallery.module.css'

const galleryImages = [
  {
    src: '/images/dente-01.jpg',
    alt: 'Resultado de lentes em resina com acabamento natural'
  },
  {
    src: '/images/dente-02.jpg',
    alt: 'Detalhe de textura e naturalidade dental'
  }
]

export function Gallery() {
  return (
    <section
      className={styles.gallerySection}
      aria-labelledby="gallery-title"
    >
      <div className={styles.galleryContainer}>

        {/* Cabeçalho */}
        <div className={styles.sectionHeader}>

          <h2
            id="gallery-title"
            className={styles.galleryTitle}
          >
            Casos & Resultados
          </h2>

          <p className={styles.gallerySubtitle}>
            Naturalidade, proporção e acabamento em cada detalhe.
          </p>

        </div>

        {/* Galeria */}
        <div className={styles.imageGrid}>

          {galleryImages.map((img) => (
            <div
              key={img.src}
              className={styles.imageItem}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={600}
                sizes="
                  (max-width: 480px) 100vw,
                  (max-width: 899px) 50vw,
                  450px
                "
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}