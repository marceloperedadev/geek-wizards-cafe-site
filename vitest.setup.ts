import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

/*
 * `next/font` depende do loader de build do Next e não funciona fora dele.
 * O stub devolve a classe esperada sem baixar nada, mantendo os testes
 * de metadata possíveis sem rede.
 */
vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-stub',
    variable: '--font-inter',
    style: { fontFamily: 'Inter' },
  }),
}))

