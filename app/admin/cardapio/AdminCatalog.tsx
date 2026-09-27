'use client'

import Image from 'next/image'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { LogOut, Pencil, Plus, Save, X } from 'lucide-react'
import styles from './AdminCatalog.module.css'

type Category = {
  id: string
  name: string
  active: boolean
  sortOrder: number
}

type Product = {
  id: number
  name: string
  description: string
  priceCents: number
  categoryId: string
  imageUrl: string | null
  symbol: string
  active: boolean
  featured: boolean
  sortOrder: number
}

export type CatalogResponse = { categories: Category[]; products: Product[] }
type ProductForm = {
  name: string
  description: string
  price: string
  categoryId: string
  imageUrl: string
  active: boolean
  sortOrder: string
}
type AccountFlow = 'login' | 'request-recovery' | 'recovery-sent' | 'reset-password' | 'recovery-complete'

const emptyProduct = (categoryId = ''): ProductForm => ({
  name: '',
  description: '',
  price: '',
  categoryId,
  imageUrl: '',
  active: true,
  sortOrder: '0',
})

async function responseError(response: Response, fallback: string) {
  try {
    const data = await response.json() as { error?: string }
    return data.error || fallback
  } catch {
    return fallback
  }
}

export function AdminCatalog({
  initiallyAuthenticated,
  configured,
  initialCatalog,
  recoveryMode = false,
  recoveryError = false,
}: {
  initiallyAuthenticated: boolean
  configured: boolean
  initialCatalog: CatalogResponse
  recoveryMode?: boolean
  recoveryError?: boolean
}) {
  const [authenticated, setAuthenticated] = useState(initiallyAuthenticated)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accountFlow, setAccountFlow] = useState<AccountFlow>(
    recoveryMode && initiallyAuthenticated ? 'reset-password' : 'login',
  )
  const [recoveryEmail, setRecoveryEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [catalog, setCatalog] = useState<CatalogResponse>(initialCatalog)
  const [tab, setTab] = useState<'products' | 'categories'>('products')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<ProductForm>(emptyProduct())
  const [showForm, setShowForm] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState(recoveryError ? 'O link de recuperação é inválido ou expirou. Solicite outro.' : '')
  const [success, setSuccess] = useState('')
  const editDialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = editDialogRef.current
    if (!dialog) return

    if (showForm && editingId !== null) {
      if (!dialog.open) {
        if (typeof dialog.showModal === 'function') dialog.showModal()
        else {
          dialog.setAttribute('open', '')
          dialog.focus()
        }
      }
      return () => {
        if (!dialog.open) return
        if (typeof dialog.close === 'function') dialog.close()
        else dialog.removeAttribute('open')
      }
    }

    if (dialog.open) {
      if (typeof dialog.close === 'function') dialog.close()
      else dialog.removeAttribute('open')
    }
  }, [editingId, showForm])

  async function loadCatalog() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/products', { cache: 'no-store' })
      if (response.status === 401) {
        setAuthenticated(false)
        return
      }
      if (!response.ok) throw new Error(await responseError(response, 'Não foi possível carregar o cardápio.'))
      const data = await response.json() as CatalogResponse
      setCatalog(data)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Não foi possível carregar o cardápio.')
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) throw new Error(await responseError(response, 'Não foi possível entrar. Tente novamente.'))
      setEmail('')
      setPassword('')
      setAuthenticated(true)
      await loadCatalog()
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Não foi possível entrar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/session', { method: 'DELETE' })
    setAuthenticated(false)
    setCatalog({ categories: [], products: [] })
    setShowForm(false)
    setSuccess('')
  }

  async function requestPasswordRecovery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSaving(true)
    try {
      const response = await fetch('/api/admin/password/recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: recoveryEmail }),
      })
      if (!response.ok) throw new Error(await responseError(response, 'Não foi possível solicitar a recuperação agora.'))
      setAccountFlow('recovery-sent')
    } catch (recoveryRequestError) {
      setError(recoveryRequestError instanceof Error ? recoveryRequestError.message : 'Não foi possível solicitar a recuperação agora.')
    } finally {
      setSaving(false)
    }
  }

  async function resetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      })
      if (!response.ok) throw new Error(await responseError(response, 'Não foi possível atualizar a senha.'))
      setNewPassword('')
      setConfirmPassword('')
      setAuthenticated(false)
      setAccountFlow('recovery-complete')
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : 'Não foi possível atualizar a senha.')
    } finally {
      setSaving(false)
    }
  }

  function startNewProduct() {
    const firstActiveCategory = catalog.categories.find((category) => category.active)?.id ?? ''
    setEditingId(null)
    setForm(emptyProduct(firstActiveCategory))
    setShowForm(true)
    setError('')
    setSuccess('')
  }

  function startEdit(product: Product) {
    setEditingId(product.id)
    setForm({
      name: product.name,
      description: product.description,
      price: (product.priceCents / 100).toFixed(2).replace('.', ','),
      categoryId: product.categoryId,
      imageUrl: product.imageUrl ?? '',
      active: product.active,
      sortOrder: String(product.sortOrder),
    })
    setShowForm(true)
    setError('')
    setSuccess('')
  }

  function closeProductForm() {
    if (saving || uploadingImage) return
    setShowForm(false)
    setEditingId(null)
    setError('')
  }

  async function uploadProductImage(file?: File) {
    if (!file) return
    setError('')
    setSuccess('')
    setUploadingImage(true)
    try {
      const body = new FormData()
      body.set('file', file)
      const response = await fetch('/api/admin/catalog-image', {
        method: 'POST',
        body,
      })
      if (!response.ok) {
        throw new Error(await responseError(response, 'Não foi possível enviar a imagem.'))
      }
      const data = await response.json() as { imageUrl: string }
      setForm((current) => ({ ...current, imageUrl: data.imageUrl }))
      setSuccess('Imagem enviada. Salve o produto para aplicar a alteração.')
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Não foi possível enviar a imagem.')
    } finally {
      setUploadingImage(false)
    }
  }

  async function handleProductSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')

    const normalizedPrice = form.price.trim().replace(',', '.')
    if (!/^\d+(\.\d{1,2})?$/.test(normalizedPrice) || Number(normalizedPrice) <= 0) {
      setError('Informe um preço maior que zero, com até duas casas decimais.')
      return
    }
    const [wholePart, fractionalPart = ''] = normalizedPrice.split('.')
    const priceCents = Number(wholePart) * 100 + Number(fractionalPart.padEnd(2, '0'))
    const sortOrder = Number(form.sortOrder)
    if (!Number.isInteger(sortOrder) || sortOrder < 0) {
      setError('A ordem de exibição deve ser um número inteiro igual ou maior que zero.')
      return
    }

    setSaving(true)
    try {
      const endpoint = editingId === null ? '/api/admin/products' : `/api/admin/products/${editingId}`
      const response = await fetch(endpoint, {
        method: editingId === null ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          priceCents,
          categoryId: form.categoryId,
          imageUrl: form.imageUrl.trim() || null,
          active: form.active,
          sortOrder,
        }),
      })
      if (!response.ok) throw new Error(await responseError(response, 'Não foi possível salvar. Tente novamente.'))
      setShowForm(false)
      setEditingId(null)
      setSuccess(editingId === null ? 'Produto adicionado com sucesso.' : 'Produto atualizado com sucesso.')
      await loadCatalog()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Não foi possível salvar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  async function toggleProduct(product: Product) {
    setError('')
    setSuccess('')
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !product.active }),
      })
      if (!response.ok) throw new Error(await responseError(response, 'Não foi possível salvar. Tente novamente.'))
      setSuccess(product.active ? 'Produto desativado.' : 'Produto ativado.')
      await loadCatalog()
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : 'Não foi possível salvar. Tente novamente.')
    }
  }

  async function createCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory }),
      })
      if (!response.ok) throw new Error(await responseError(response, 'Não foi possível salvar. Tente novamente.'))
      setNewCategory('')
      setSuccess('Categoria criada com sucesso.')
      await loadCatalog()
    } catch (categoryError) {
      setError(categoryError instanceof Error ? categoryError.message : 'Não foi possível salvar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  async function updateCategory(event: FormEvent<HTMLFormElement>, category: Category) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    if (!name) {
      setError('Informe o nome da categoria.')
      return
    }
    setError('')
    setSuccess('')
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/categories/${encodeURIComponent(category.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      if (!response.ok) throw new Error(await responseError(response, 'Não foi possível salvar. Tente novamente.'))
      setSuccess('Categoria atualizada com sucesso.')
      await loadCatalog()
    } catch (categoryError) {
      setError(categoryError instanceof Error ? categoryError.message : 'Não foi possível salvar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  async function toggleCategory(category: Category) {
    setError('')
    setSuccess('')
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/categories/${encodeURIComponent(category.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !category.active }),
      })
      if (!response.ok) throw new Error(await responseError(response, 'Não foi possível salvar. Tente novamente.'))
      setSuccess(category.active ? 'Categoria desativada.' : 'Categoria ativada.')
      await loadCatalog()
    } catch (categoryError) {
      setError(categoryError instanceof Error ? categoryError.message : 'Não foi possível salvar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  const productForm = (
    <form className={styles.productForm} onSubmit={handleProductSave} aria-busy={saving}>
      <div className={styles.formHeading}>
        <h3 id="product-form-title">{editingId === null ? 'Novo produto' : 'Editar produto'}</h3>
        <button type="button" className={styles.iconButton} onClick={closeProductForm} disabled={saving || uploadingImage} aria-label="Cancelar edição"><X size={19} /></button>
      </div>
      <div className={styles.formGrid}>
        <label>Nome<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} maxLength={100} required /></label>
        <label>Preço (R$)<input value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} inputMode="decimal" placeholder="12,90" required /></label>
        <label className={styles.fullWidth}>Descrição<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} maxLength={400} rows={3} required /></label>
        <label>Categoria<select value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })} required>
          <option value="" disabled>Selecione</option>
          {catalog.categories.map((category) => <option key={category.id} value={category.id} disabled={!category.active}>{category.name}{category.active ? '' : ' (inativa)'}</option>)}
        </select></label>
        <label>Ordem de exibição<input type="number" min="0" max="9999" step="1" value={form.sortOrder} onChange={(event) => setForm({ ...form, sortOrder: event.target.value })} required /></label>
        <label className={styles.fullWidth}>URL da imagem (opcional)<input type="text" inputMode="url" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} placeholder="https://… ou /images/arquivo.jpg" /></label>
        <label className={styles.fullWidth}>Ou envie uma imagem (JPG, PNG ou WebP; até 5 MB)<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => { void uploadProductImage(event.target.files?.[0]); event.target.value = '' }} disabled={saving || uploadingImage} />{uploadingImage && <span className={styles.muted}>Enviando imagem…</span>}</label>
        <label className={styles.checkboxLabel}><input type="checkbox" checked={form.active} onChange={(event) => setForm({ ...form, active: event.target.checked })} /> Disponível no cardápio</label>
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={styles.formActions}>
        <button type="button" className={styles.secondaryButton} onClick={closeProductForm} disabled={saving || uploadingImage}>Cancelar</button>
        <button type="submit" className={styles.primaryButton} disabled={saving || uploadingImage || catalog.categories.every((category) => !category.active)}><Save size={16} aria-hidden="true" /> {saving ? 'Salvando…' : 'Salvar produto'}</button>
      </div>
    </form>
  )

  if (!authenticated || accountFlow !== 'login') {
    return (
      <main className={styles.loginPage}>
        <section className={styles.loginCard}>
          <span className={styles.eyebrow}>Geek Wizards Café</span>
          <h1>Administração do cardápio</h1>
          {!configured ? (
            <p className={styles.error} role="status">
              O acesso ainda não está configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no ambiente do servidor.
            </p>
          ) : accountFlow === 'login' ? (
            <form onSubmit={handleLogin}>
              <p>Entre com seu e-mail e senha para gerenciar produtos e categorias.</p>
              <label htmlFor="admin-email">E-mail</label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                maxLength={320}
              />
              <label htmlFor="admin-password">Senha</label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                maxLength={256}
              />
              {error && <p className={styles.error} role="alert">{error}</p>}
              <button className={styles.primaryButton} type="submit" disabled={saving}>
                {saving ? 'Entrando…' : 'Entrar'}
              </button>
              <button
                className={styles.textButton}
                type="button"
                onClick={() => {
                  setRecoveryEmail(email)
                  setError('')
                  setAccountFlow('request-recovery')
                }}
              >
                Esqueci minha senha
              </button>
            </form>
          ) : accountFlow === 'request-recovery' ? (
            <form onSubmit={requestPasswordRecovery}>
              <p>Informe o e-mail da conta administrativa. Se houver uma conta para esse endereço, enviaremos um link de recuperação.</p>
              <label htmlFor="recovery-email">E-mail</label>
              <input
                id="recovery-email"
                type="email"
                autoComplete="email"
                value={recoveryEmail}
                onChange={(event) => setRecoveryEmail(event.target.value)}
                required
                maxLength={320}
              />
              {error && <p className={styles.error} role="alert">{error}</p>}
              <button className={styles.primaryButton} type="submit" disabled={saving}>
                {saving ? 'Enviando…' : 'Enviar link de recuperação'}
              </button>
              <button className={styles.textButton} type="button" onClick={() => { setError(''); setAccountFlow('login') }}>
                Voltar para entrar
              </button>
            </form>
          ) : accountFlow === 'recovery-sent' ? (
            <div>
              <p role="status">Se houver uma conta para esse endereço, enviaremos um link de recuperação. Confira sua caixa de entrada.</p>
              <button className={styles.textButton} type="button" onClick={() => setAccountFlow('login')}>
                Voltar para entrar
              </button>
            </div>
          ) : accountFlow === 'reset-password' && authenticated ? (
            <form onSubmit={resetPassword}>
              <p>Defina uma nova senha para sua conta administrativa.</p>
              <label htmlFor="new-admin-password">Nova senha</label>
              <input
                id="new-admin-password"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                minLength={8}
                maxLength={256}
                required
              />
              <label htmlFor="confirm-admin-password">Confirme a nova senha</label>
              <input
                id="confirm-admin-password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                minLength={8}
                maxLength={256}
                required
              />
              {error && <p className={styles.error} role="alert">{error}</p>}
              <button className={styles.primaryButton} type="submit" disabled={saving}>
                {saving ? 'Atualizando…' : 'Salvar nova senha'}
              </button>
            </form>
          ) : accountFlow === 'recovery-complete' ? (
            <div>
              <p role="status">Senha atualizada. Entre com sua nova senha.</p>
              <button className={styles.primaryButton} type="button" onClick={() => setAccountFlow('login')}>
                Ir para o login
              </button>
            </div>
          ) : (
            <div>
              {error && <p className={styles.error} role="alert">{error}</p>}
              <button className={styles.textButton} type="button" onClick={() => { setError(''); setAccountFlow('login') }}>
                Voltar para entrar
              </button>
            </div>
          )}
        </section>
      </main>
    )
  }

  return (
    <main className={styles.adminPage}>
      {showForm && editingId !== null && (
        <dialog
          ref={editDialogRef}
          className={styles.editDialog}
          aria-labelledby="product-form-title"
          aria-modal="true"
          onCancel={(event) => {
            event.preventDefault()
            closeProductForm()
          }}
        >
          <div className={styles.editDialogContent}>
            {productForm}
          </div>
        </dialog>
      )}
      <header className={styles.topBar}>
        <div>
          <span className={styles.eyebrow}>Geek Wizards Café</span>
          <h1>Cardápio</h1>
        </div>
        <button type="button" className={styles.secondaryButton} onClick={handleLogout}>
          <LogOut size={16} aria-hidden="true" /> Sair
        </button>
      </header>

      <nav className={styles.tabs} aria-label="Seções do painel">
        <button type="button" aria-current={tab === 'products' ? 'page' : undefined} onClick={() => { setTab('products'); setShowForm(false); setError(''); setSuccess('') }}>Produtos</button>
        <button type="button" aria-current={tab === 'categories' ? 'page' : undefined} onClick={() => { setTab('categories'); setShowForm(false); setError(''); setSuccess('') }}>Categorias</button>
      </nav>

      <div className={styles.feedback} aria-live="polite">
        {error && !showForm && <p className={styles.error} role="alert">{error}</p>}
        {success && <p className={styles.success} role="status">{success}</p>}
      </div>

      {tab === 'products' ? (
        <section aria-labelledby="products-heading">
          <div className={styles.sectionHeading}>
            <div>
              <h2 id="products-heading">Produtos</h2>
              <p>Altere o cardápio que aparece para seus clientes.</p>
            </div>
            {!showForm && <button type="button" className={styles.primaryButton} onClick={startNewProduct}><Plus size={17} aria-hidden="true" /> Adicionar produto</button>}
          </div>

          {showForm && editingId === null && productForm}

          {loading ? <p className={styles.muted}>Carregando cardápio…</p> : catalog.categories.map((category) => {
            const products = catalog.products.filter((product) => product.categoryId === category.id)
            if (!products.length) return null
            return (
              <section className={styles.categoryGroup} key={category.id} aria-labelledby={`category-${category.id}`}>
                <h3 id={`category-${category.id}`}>{category.name}{!category.active && <span className={styles.inactiveLabel}>Inativa</span>}</h3>
                <div className={styles.productList}>
                  {products.map((product) => (
                    <article className={styles.productRow} key={product.id}>
                      {product.imageUrl ? <Image src={product.imageUrl} alt="" width={64} height={64} unoptimized className={styles.productThumbnail} /> : <span className={styles.productSymbol} aria-hidden="true">{product.symbol}</span>}
                      <div className={styles.productInfo}>
                        <strong>{product.name}</strong>
                        <span>{category.name}</span>
                      </div>
                      <strong className={styles.productPrice}>R$ {(product.priceCents / 100).toFixed(2).replace('.', ',')}</strong>
                      <span className={product.active && category.active ? styles.activeStatus : styles.inactiveStatus}>{product.active && category.active ? 'Ativo' : 'Inativo'}</span>
                      <div className={styles.rowActions}>
                        <button type="button" className={styles.secondaryButton} onClick={() => startEdit(product)}><Pencil size={15} aria-hidden="true" /> Editar</button>
                        <button type="button" className={styles.textButton} onClick={() => void toggleProduct(product)} disabled={saving}>{product.active ? 'Desativar' : 'Ativar'}</button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )
          })}
        </section>
      ) : (
        <section aria-labelledby="categories-heading">
          <div className={styles.sectionHeading}>
            <div><h2 id="categories-heading">Categorias</h2><p>Crie, renomeie ou pause uma categoria.</p></div>
          </div>
          <form className={styles.addCategory} onSubmit={createCategory}>
            <label htmlFor="new-category">Nova categoria</label>
            <div><input id="new-category" value={newCategory} onChange={(event) => setNewCategory(event.target.value)} maxLength={50} required placeholder="Ex.: Sanduíches" /><button className={styles.primaryButton} type="submit" disabled={saving}><Plus size={16} aria-hidden="true" /> Adicionar</button></div>
          </form>
          <div className={styles.categoryList}>
            {catalog.categories.map((category) => (
              <form key={`${category.id}:${category.name}`} className={styles.categoryRow} onSubmit={(event) => void updateCategory(event, category)}>
                <input aria-label={`Nome da categoria ${category.name}`} name="name" defaultValue={category.name} maxLength={50} required />
                <span className={category.active ? styles.activeStatus : styles.inactiveStatus}>{category.active ? 'Ativa' : 'Inativa'}</span>
                <button className={styles.secondaryButton} type="submit" disabled={saving}><Save size={15} aria-hidden="true" /> Salvar nome</button>
                <button className={styles.textButton} type="button" onClick={() => void toggleCategory(category)} disabled={saving}>{category.active ? 'Desativar' : 'Ativar'}</button>
              </form>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
