import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { Footer } from '@/app/components/Footer/Footer'
import { BioHero } from '@/app/components/BioHero/BioHero'
import { ExperienceSection } from '@/app/components/BusinessSections/ExperienceSection'
import { VisitSection } from '@/app/components/BusinessSections/VisitSection'
import { SITE_CONFIG } from '@/app/constants/links'

describe('Footer', () => {
  it('exibe a marca e o ano corrente', () => {
    const { container } = render(<Footer />)

    const texto = container.textContent ?? ''
    const ano = new Date().getFullYear()

    expect(texto).toContain(String(ano))
    expect(texto).toContain(SITE_CONFIG.brandName)
    expect(texto).toContain('Todos os direitos reservados')
  })

  it('exibe o endereço oficial do estabelecimento', () => {
    render(<Footer />)

    expect(screen.getByText(SITE_CONFIG.locationShort)).toBeInTheDocument()
  })

  it('todos os links externos abrem em nova aba com rel seguro', () => {
    const { container } = render(<Footer />)

    const links = container.querySelectorAll('a')

    expect(links.length).toBeGreaterThan(0)

    links.forEach((link) => {
      expect(link.getAttribute('target')).toBe('_blank')
      expect(link.getAttribute('rel')).toContain('noreferrer')
    })
  })

  it('os links de rede social vêm da configuração central', () => {
    const { container } = render(<Footer />)

    const hrefs = Array.from(container.querySelectorAll('a')).map((a) =>
      a.getAttribute('href'),
    )

    expect(hrefs).toContain(SITE_CONFIG.social.instagram)
    expect(hrefs).toContain(SITE_CONFIG.social.facebook)
    expect(hrefs).toContain(SITE_CONFIG.social.rpgGroup)
  })
})

describe('navegação interna', () => {
  it('a rota /cardapio existe no projeto', () => {
    // A home aponta para /cardapio no CTA principal. Se a rota sumir,
    // o caminho de conversão morre silenciosamente.
    expect(
      existsSync(
        path.resolve(__dirname, '..', 'app', 'cardapio', 'page.tsx'),
      ),
    ).toBe(true)
  })

  it('o link do cardápio no BioHero aponta para a rota real', () => {
    const { container } = render(<BioHero />)

    const link = Array.from(container.querySelectorAll('a')).find(
      (a) => a.textContent?.toLowerCase().includes('cardápio'),
    )

    expect(link?.getAttribute('href')).toBe('/cardapio')
  })

  it('o hero tem âncora de retorno para a navegação', () => {
    const { container } = render(<BioHero />)

    expect(
      container.querySelector('section'),
    ).toHaveAttribute('id', 'inicio')
  })

  it('a seção de experiências é endereçável por âncora', () => {
    const { container } = render(<ExperienceSection />)

    expect(
      container.querySelector('section'),
    ).toHaveAttribute('id', 'experiencias')
  })
})

describe('ExperienceSection', () => {
  it('renderiza os quatro diferenciais com heading acessível', () => {
    render(<ExperienceSection />)

    const titulo = screen.getByRole('heading', {
      level: 2,
    })

    expect(titulo).toBeInTheDocument()

    expect(
      screen.getByText('Café com identidade'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Sua mesa, sua aventura'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Programação da guilda'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Para grupos e empresas'),
    ).toBeInTheDocument()
  })

  it('associa o título à seção via aria-labelledby', () => {
    const { container } = render(<ExperienceSection />)

    const section = container.querySelector('section')

    expect(section).toHaveAttribute('aria-labelledby', 'experience-title')
    expect(container.querySelector('#experience-title')).not.toBeNull()
  })
})

describe('VisitSection', () => {
  it('oferece caminhos de Maps e WhatsApp a partir da configuração', () => {
    render(<VisitSection />)

    const maps = screen.getByRole('link', { name: /como chegar/i })
    const whatsapp = screen.getByRole('link', {
      name: /falar com a equipe/i,
    })

    expect(maps).toHaveAttribute('href', SITE_CONFIG.social.maps)
    expect(whatsapp).toHaveAttribute('href', SITE_CONFIG.whatsapp.general)
  })

  it('mantém a section rotulada pelo título', () => {
    const { container } = render(<VisitSection />)

    expect(container.querySelector('section')).toHaveAttribute(
      'aria-labelledby',
      'visit-title',
    )
  })
})
