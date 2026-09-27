import type { ReactNode } from 'react'
import styles from './BusinessSections.module.css'

type SectionContainerProps = {
  children: ReactNode
  className?: string
}

/**
 * Container responsivo compartilhado pelas seções de negócio.
 * Centraliza a largura máxima e o gutter para que todas as seções
 * fiquem alinhadas em qualquer breakpoint.
 */
export function SectionContainer({
  children,
  className,
}: SectionContainerProps) {
  return (
    <div
      className={
        className
          ? `${styles.sectionContainer} ${className}`
          : styles.sectionContainer
      }
    >
      {children}
    </div>
  )
}
