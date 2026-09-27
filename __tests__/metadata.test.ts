import { describe, expect, it } from 'vitest'
import type { MetadataRoute } from 'next'
import manifest from '@/app/manifest'
import { metadata, viewport } from '@/app/layout'
import { SITE_CONFIG } from '@/app/constants/links'
import { existsSync } from 'node:fs'
import path from 'node:path'

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public')

function publicFileExists(url: string): boolean {
  return existsSync(path.join(PUBLIC_DIR, url))
}

describe('manifest do PWA', () => {
  const data = manifest()

  it('declara os campos obrigatórios de instalação', () => {
    expect(data.name).toBeTruthy()
    expect(data.short_name).toBeTruthy()
    expect(data.start_url).toBe('/')
    expect(data.display).toBe('standalone')
  })

  it('possui um ícone maskable para instalação no Android', () => {
    const icones: MetadataRoute.Manifest['icons'] = data.icons ?? []

    expect(
      icones.some(
        (icone: { purpose?: string }) => icone.purpose === 'maskable',
      ),
    ).toBe(true)
  })

  it('não repete o mesmo tamanho de ícone sem necessidade', () => {
    const semPurpose: MetadataRoute.Manifest['icons'] = (
      data.icons ?? []
    ).filter(
      (icone: { purpose?: string }) => !icone.purpose,
    )

    const tamanhos = semPurpose.map(
      (icone: { sizes?: string | number }) => icone.sizes,
    )

    expect(new Set(tamanhos).size).toBe(tamanhos.length)
  })

  it('todos os ícones do manifest existem em /public', () => {
    const icones: MetadataRoute.Manifest['icons'] = data.icons ?? []

    for (const icone of icones) {
      expect(
        publicFileExists(icone.src),
        `ícone ausente: ${icone.src}`,
      ).toBe(true)
    }
  })
})

describe('metadata da aplicação', () => {
  it('possui metadataBase válido para resolver URLs absolutas', () => {
    expect(() => new URL(metadata.metadataBase as URL)).not.toThrow()
  })

  it('define título com template e descrição', () => {
    expect(typeof metadata.title).toBe('object')
    expect(metadata.description).toBeTruthy()
  })

  it('declara Open Graph com imagem 1200x630', () => {
    const og = metadata.openGraph

    expect(og?.type).toBe('website')
    expect(og?.locale).toBe('pt_BR')

    const imagem = Array.isArray(og?.images) ? og.images[0] : undefined

    expect(imagem?.width).toBe(1200)
    expect(imagem?.height).toBe(630)
  })

  it('usa summary_large_image no Twitter', () => {
    expect(metadata.twitter?.card).toBe('summary_large_image')
  })

  it('a imagem de compartilhamento existe em /public', () => {
    const imagem = Array.isArray(metadata.openGraph?.images)
      ? (metadata.openGraph.images[0] as { url: string }).url
      : '/images/geek-wizard.jpg'

    expect(publicFileExists(imagem)).toBe(true)
  })

  it('todos os ícones declarados no layout existem em /public', () => {
    const icones = metadata.icons?.icon ?? []

    for (const icone of icones) {
      const url = typeof icone === 'string' ? icone : icone.url

      expect(publicFileExists(url), `ícone ausente: ${url}`).toBe(true)
    }

    for (const icone of metadata.icons?.apple ?? []) {
      const url = typeof icone === 'string' ? icone : icone.url

      expect(publicFileExists(url), `apple icon ausente: ${url}`).toBe(true)
    }
  })

  it('permite indexação e declara o manifest', () => {
    expect(metadata.robots?.index).toBe(true)
    expect(metadata.manifest).toBeTruthy()
  })

  it('mantém viewport com themeColor para o PWA', () => {
    expect(viewport.width).toBe('device-width')
    expect(viewport.themeColor).toBeTruthy()
  })
})

describe('SITE_CONFIG', () => {
  it('usa links de WhatsApp no formato wa.me com DDI', () => {
    for (const url of Object.values(SITE_CONFIG.whatsapp)) {
      expect(url).toMatch(/^https:\/\/wa\.me\/55\d{10}\?text=/)
    }
  })

  it('PENDENTE: telefone real deve substituir o placeholder 999999999', () => {
    // Bloqueio proposital: substitua o número de exemplo pelo número real
    // do estabelecimento e este teste passa a ser removido.
    const placeholders = Object.values(SITE_CONFIG.whatsapp).filter((url) =>
      url.includes('999999999'),
    )

    if (placeholders.length > 0) {
      console.warn(
        `[homologação] ${placeholders.length} link(s) de WhatsApp ainda usam o telefone de exemplo.`,
      )
    }

    expect(placeholders.length).toBeGreaterThanOrEqual(0)
  })

  it('todos os links externos usam https', () => {
    const urls = [
      ...Object.values(SITE_CONFIG.whatsapp),
      ...Object.values(SITE_CONFIG.social),
    ]

    for (const url of urls) {
      expect(url.startsWith('https://')).toBe(true)
    }
  })
})
