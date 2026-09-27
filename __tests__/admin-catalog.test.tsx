import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AdminCatalog, type CatalogResponse } from '@/app/admin/cardapio/AdminCatalog'

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt ?? ''} />,
}))

const initialCatalog: CatalogResponse = {
  categories: [{ id: 'cafes', name: 'Cafés', active: true, sortOrder: 0 }],
  products: [{
    id: 1,
    name: 'Café Arcano',
    description: 'Café especial da casa.',
    priceCents: 1290,
    categoryId: 'cafes',
    imageUrl: null,
    symbol: '☕',
    active: true,
    featured: false,
    sortOrder: 0,
  }],
}

function mockFetch() {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input)
    if (url === '/api/admin/session' && init?.method === 'POST') {
      return { ok: true, status: 200, json: async () => ({ ok: true }) } as Response
    }
    if (url === '/api/admin/password/recovery' && init?.method === 'POST') {
      return { ok: true, status: 200, json: async () => ({ ok: true }) } as Response
    }
    if (url === '/api/admin/password' && init?.method === 'POST') {
      return { ok: true, status: 200, json: async () => ({ ok: true }) } as Response
    }
    if (url === '/api/admin/products' && !init?.method) {
      return { ok: true, status: 200, json: async () => initialCatalog } as Response
    }
    return { ok: true, status: 200, json: async () => ({}) } as Response
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

async function login() {
  render(
    <AdminCatalog
      initiallyAuthenticated={false}
      configured
      initialCatalog={{ categories: [], products: [] }}
    />,
  )
  fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'owner@example.com' } })
  fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'senha-de-teste' } })
  fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))
  await screen.findByRole('heading', { name: 'Produtos' })
}

describe('AdminCatalog', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('cancela uma edição sem enviar alterações', async () => {
    const fetchMock = mockFetch()
    await login()

    fireEvent.click(screen.getByRole('button', { name: 'Editar' }))
    const nameInput = screen.getByLabelText('Nome')
    fireEvent.change(nameInput, { target: { value: 'Nome que não deve ser salvo' } })
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(screen.queryByLabelText('Nome')).not.toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalledWith(
      '/api/admin/products/1',
      expect.objectContaining({ method: 'PATCH' }),
    )

    fireEvent.click(screen.getByRole('button', { name: 'Editar' }))
    await waitFor(() => expect(screen.getByLabelText('Nome')).toHaveValue('Café Arcano'))
  })

  it('salva uma edição pelo PATCH existente e fecha o modal', async () => {
    const fetchMock = mockFetch()
    await login()

    fireEvent.click(screen.getByRole('button', { name: 'Editar' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Café atualizado' } })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar produto' }))

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/admin/products/1',
        expect.objectContaining({
          method: 'PATCH',
          body: expect.stringContaining('Café atualizado'),
        }),
      )
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('recusa preço inválido antes de enviar o formulário', async () => {
    const fetchMock = mockFetch()
    await login()
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar produto' }))

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Novo café' } })
    fireEvent.change(screen.getByLabelText('Preço (R$)'), { target: { value: '12,345' } })
    fireEvent.change(screen.getByLabelText('Descrição'), { target: { value: 'Descrição do café.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar produto' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('até duas casas decimais')
    expect(fetchMock).not.toHaveBeenCalledWith(
      '/api/admin/products',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('solicita recuperação sem revelar se o e-mail está cadastrado', async () => {
    const fetchMock = mockFetch()
    render(
      <AdminCatalog
        initiallyAuthenticated={false}
        configured
        initialCatalog={{ categories: [], products: [] }}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Esqueci minha senha' }))
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'owner@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'Enviar link de recuperação' }))

    expect(await screen.findByRole('status')).toHaveTextContent('Se houver uma conta para esse endereço')
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/admin/password/recovery',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'owner@example.com' }),
      }),
    )
  })

  it('envia a nova senha somente no fluxo de recuperação validado', async () => {
    const fetchMock = mockFetch()
    render(
      <AdminCatalog
        initiallyAuthenticated
        configured
        recoveryMode
        initialCatalog={{ categories: [], products: [] }}
      />,
    )

    fireEvent.change(screen.getByLabelText('Nova senha'), { target: { value: 'senha-forte-de-teste' } })
    fireEvent.change(screen.getByLabelText('Confirme a nova senha'), { target: { value: 'senha-forte-de-teste' } })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar nova senha' }))

    expect(await screen.findByRole('status')).toHaveTextContent('Senha atualizada')
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/admin/password',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ password: 'senha-forte-de-teste' }),
      }),
    )
  })
})
