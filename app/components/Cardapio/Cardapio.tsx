
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  ShoppingBag,
  Plus,
  Minus,
  X,
  Sparkles,
  MapPin,
  Send,
} from 'lucide-react'
import { WHATSAPP_CONFIG } from '@/app/constants/links'
import styles from './Cardapio.module.css'

export type Produto = {
  id: number
  nome: string
  descricao: string
  preco: number
  simbolo: string
  categoria: Categoria
  imagemUrl: string | null
  destaque?: boolean
}

export type Categoria = string

/** Formats a price in the menu's pt-BR display format. */
export function formatarPreco(valor: number): string {
  return valor.toFixed(2).replace('.', ',')
}

type ItemCarrinho = {
  produto: Produto
  quantidade: number
}

export function Cardapio({ initialProducts, initialCategories }: { initialProducts: Produto[]; initialCategories: string[] }) {
  const [categoria, setCategoria] =
    useState<Categoria>('Todos')
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])
  const [produtoSelecionado, setProdutoSelecionado] =
    useState<Produto | null>(null)
  const [mesa, setMesa] = useState('')
  const [pedidoVisivel, setPedidoVisivel] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const modalCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const pedido = document.getElementById('pedido')
    if (!pedido) return

    const observador = new IntersectionObserver(
      ([entrada]) => setPedidoVisivel(entrada.isIntersecting),
      { threshold: 0.15 },
    )
    observador.observe(pedido)
    return () => observador.disconnect()
  }, [])

  useEffect(() => {
    if (!produtoSelecionado) return

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    modalCloseRef.current?.focus()

    const handleModalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProdutoSelecionado(null)
        return
      }

      if (event.key !== 'Tab' || !modalRef.current) return

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

    window.addEventListener('keydown', handleModalKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleModalKeyDown)
      previousFocus?.focus()
    }
  }, [produtoSelecionado])

  const produtosFiltrados = useMemo(() => {
    if (categoria === 'Todos') return initialProducts

    return initialProducts.filter(
      (produto) => produto.categoria === categoria,
    )
  }, [categoria, initialProducts])

  const quantidadeTotal = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0,
  )

  const valorTotal = carrinho.reduce(
    (total, item) =>
      total + item.produto.preco * item.quantidade,
    0,
  )

  function adicionarProduto(produto: Produto) {
    setCarrinho((atual) => {
      const existente = atual.find(
        (item) => item.produto.id === produto.id,
      )

      if (existente) {
        return atual.map((item) =>
          item.produto.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item,
        )
      }

      return [
        ...atual,
        {
          produto,
          quantidade: 1,
        },
      ]
    })
  }

  function diminuirProduto(produtoId: number) {
    setCarrinho((atual) =>
      atual
        .map((item) =>
          item.produto.id === produtoId
            ? {
                ...item,
                quantidade: item.quantidade - 1,
              }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    )
  }

  function removerProduto(produtoId: number) {
    setCarrinho((atual) =>
      atual.filter(
        (item) => item.produto.id !== produtoId,
      ),
    )
  }

  function quantidadeProduto(produtoId: number) {
    return (
      carrinho.find(
        (item) => item.produto.id === produtoId,
      )?.quantidade ?? 0
    )
  }

  function enviarPedido() {
    if (!WHATSAPP_CONFIG.configured) return

    if (!mesa) {
      alert('Informe o número da sua mesa.')
      return
    }

    if (!carrinho.length) {
      alert('Adicione pelo menos um produto ao pedido.')
      return
    }

    const itens = carrinho
      .map(
        (item) =>
          `${item.quantidade}x ${item.produto.nome} — R$ ${formatarPreco(
            item.produto.preco * item.quantidade,
          )}`,
      )
      .join('\n')

    const mensagem = `🧙 NOVO PEDIDO — GEEK WIZARDS & CAFÉ

📍 Mesa: ${mesa}

${itens}

💰 Total: R$ ${formatarPreco(valorTotal)}

Pedido enviado pelo cardápio digital.`

    const url = WHATSAPP_CONFIG.createUrl(mensagem)
    if (!url) return

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className={styles.page}>
      {/* ATMOSFERA */}
      <div
        className={styles.magicGlow}
        aria-hidden="true"
      />

      <div
        className={styles.characterBackground}
        aria-hidden="true"
      >
        <Image
          src="/images/geek-wizards-personagem.png"
          alt=""
          fill
          sizes="700px"
        />
      </div>

      {/* CABEÇALHO */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>
            ✦
          </span>

          <div>
            <p className={styles.brandEyebrow}>
              CAFETERIA TEMÁTICA
            </p>

            <h1>Geek Wizards & Café</h1>
          </div>
        </div>

        <div className={styles.headerInfo}>
          <MapPin size={15} />
          <span>Taubaté — SP</span>
        </div>
      </header>

      {/* HERO DO CARDÁPIO */}
      <section className={styles.menuHero}>
        <div>
          <span className={styles.sectionEyebrow}>
            <Sparkles size={13} />
            CARDÁPIO DA CASA
          </span>

          <h2>
            Escolha sua
            <strong> próxima aventura.</strong>
          </h2>

          <p>
            Cafés, doces, bebidas e sabores preparados
            especialmente para sua jornada.
          </p>
        </div>

        <div className={styles.heroDecoration}>
          <span>✦</span>
          <span>☽</span>
          <span>✧</span>
        </div>
      </section>

      {/* CATEGORIAS */}
      <nav
        className={styles.categories}
        aria-label="Categorias do cardápio"
      >
        {['Todos', ...initialCategories].map((item) => (
          <button
            key={item}
            type="button"
            className={
              categoria === item
                ? styles.categoryActive
                : styles.category
            }
            aria-pressed={categoria === item}
            onClick={() => setCategoria(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* PRODUTOS */}
      <section className={styles.menuSection}>
        <div className={styles.sectionHeader}>
          <div>
            <span>✦ SELEÇÃO DA CASA</span>
            <h3>{categoria}</h3>
          </div>

          <small>
            {produtosFiltrados.length} opções
          </small>
        </div>

        <div className={styles.productGrid}>
          {produtosFiltrados.map((produto) => {
            const quantidade =
              quantidadeProduto(produto.id)

            return (
              <article
                key={produto.id}
                className={`${styles.productCard} ${
                  produto.destaque
                    ? styles.productFeatured
                    : ''
                }`}
              >
                <button
                  type="button"
                  className={styles.productImage}
                  data-category={produto.categoria}
                  onClick={() =>
                    setProdutoSelecionado(produto)
                  }
                  aria-label={`Ver ${produto.nome}`}
                >
                  {produto.imagemUrl ? (
                    <Image
                      src={produto.imagemUrl}
                      alt=""
                      fill
                      sizes="(max-width: 620px) 45vw, (max-width: 900px) 45vw, 30vw"
                      unoptimized
                      className={styles.productPhoto}
                    />
                  ) : (
                    <span className={styles.productArtwork} aria-hidden="true">
                      {produto.simbolo}
                    </span>
                  )}

                  {produto.destaque && (
                    <span
                      className={styles.featuredTag}
                    >
                      ✦ DESTAQUE
                    </span>
                  )}

                  <span
                    className={styles.imageOverlay}
                  >
                    Ver detalhes
                  </span>
                </button>

                <div className={styles.productContent}>
                  <div className={styles.productTop}>
                    <div>
                      <span
                        className={styles.productCategory}
                      >
                        {produto.categoria}
                      </span>

                      <h4>{produto.nome}</h4>
                    </div>

                    <strong
                      className={styles.price}
                    >
                      R$ {formatarPreco(produto.preco)}
                    </strong>
                  </div>

                  <p>{produto.descricao}</p>

                  <div className={styles.productAction}>
                    {quantidade > 0 ? (
                      <div
                        className={styles.quantityControl}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            diminuirProduto(
                              produto.id,
                            )
                          }
                          aria-label="Diminuir quantidade"
                          className={styles.quantityButton}
                        >
                          <Minus size={16} />
                        </button>

                        <span>{quantidade}</span>

                        <button
                          type="button"
                          onClick={() =>
                            adicionarProduto(produto)
                          }
                          aria-label="Aumentar quantidade"
                          className={styles.quantityButton}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className={styles.addButton}
                        onClick={() =>
                          adicionarProduto(produto)
                        }
                      >
                        <Plus size={17} />
                        Adicionar
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* BARRA DO PEDIDO */}
      {carrinho.length > 0 && !pedidoVisivel && (
        <button
          type="button"
          className={styles.cartBar}
          onClick={() =>
            document
              .getElementById('pedido')
              ?.scrollIntoView({
                behavior: 'smooth',
              })
          }
        >
          <span className={styles.cartIcon}>
            <ShoppingBag size={19} />
            <b>{quantidadeTotal}</b>
          </span>

          <span>
            <small>Seu pedido</small>
            <strong>
              R$ {formatarPreco(valorTotal)}
            </strong>
          </span>

          <span className={styles.cartArrow}>
            Ver pedido →
          </span>
        </button>
      )}

      {/* PEDIDO */}
      <section
        id="pedido"
        className={styles.orderSection}
      >
        <div className={styles.orderHeader}>
          <div>
            <span>✦ FINALIZAÇÃO</span>
            <h3>Seu pedido</h3>
          </div>

          {carrinho.length > 0 && (
            <button
              type="button"
              onClick={() => setCarrinho([])}
              className={styles.clearButton}
            >
              Limpar
            </button>
          )}
        </div>

        {carrinho.length === 0 ? (
          <div className={styles.emptyOrder}>
            <ShoppingBag size={30} />
            <strong>Seu pedido está vazio</strong>
            <span>
              Escolha seus produtos no cardápio.
            </span>
          </div>
        ) : (
          <>
            <div className={styles.orderList}>
              {carrinho.map((item) => (
                <div
                  key={item.produto.id}
                  className={styles.orderItem}
                >
                  <div>
                    <strong>
                      {item.produto.nome}
                    </strong>

                    <span>
                      R${' '}
                      {formatarPreco(item.produto.preco)}
                    </span>
                  </div>

                  <div className={styles.orderControls}>
                    <button
                      type="button"
                      aria-label={`Diminuir ${item.produto.nome}`}
                      onClick={() =>
                        diminuirProduto(
                          item.produto.id,
                        )
                      }
                    >
                      <Minus size={14} />
                    </button>

                    <b>{item.quantidade}</b>

                    <button
                      type="button"
                      aria-label={`Aumentar ${item.produto.nome}`}
                      onClick={() =>
                        adicionarProduto(
                          item.produto,
                        )
                      }
                    >
                      <Plus size={14} />
                    </button>

                    <button
                      type="button"
                      className={styles.removeButton}
                      aria-label={`Remover ${item.produto.nome} do pedido`}
                      onClick={() =>
                        removerProduto(
                          item.produto.id,
                        )
                      }
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.tableBox}>
              <label htmlFor="mesa">
                Número da sua mesa
              </label>

              <input
                id="mesa"
                type="text"
                inputMode="numeric"
                placeholder="Ex.: 04"
                value={mesa}
                onChange={(event) =>
                  setMesa(event.target.value)
                }
              />
            </div>

            <div className={styles.orderTotal}>
              <span>Total do pedido</span>

              <strong>
                R$ {formatarPreco(valorTotal)}
              </strong>
            </div>

            <button
              type="button"
              className={styles.sendButton}
              onClick={enviarPedido}
              disabled={!WHATSAPP_CONFIG.configured}
            >
              <Send size={18} />
              {WHATSAPP_CONFIG.configured
                ? 'Enviar pedido pelo WhatsApp'
                : 'Contato de pedidos não configurado'}
            </button>

            <p className={styles.orderNote}>
              {WHATSAPP_CONFIG.configured
                ? 'Seu pedido será encaminhado para nossa equipe. Aguarde a confirmação do garçom.'
                : 'O contato para pedidos ainda não foi configurado.'}
            </p>
          </>
        )}
      </section>

      {/* MODAL DO PRODUTO */}
      {produtoSelecionado && (
        <div
          className={styles.modalBackdrop}
          onClick={() =>
            setProdutoSelecionado(null)
          }
        >
          <div
            className={styles.modal}
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className={styles.modalClose}
              ref={modalCloseRef}
              onClick={() =>
                setProdutoSelecionado(null)
              }
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            <div className={styles.modalImage}>
              {produtoSelecionado.imagemUrl ? (
                <Image
                  src={produtoSelecionado.imagemUrl}
                  alt=""
                  fill
                  sizes="(max-width: 620px) 90vw, 29rem"
                  unoptimized
                  className={styles.productPhoto}
                />
              ) : (
                <span className={styles.modalArtwork} aria-hidden="true">
                  {produtoSelecionado.simbolo}
                </span>
              )}
            </div>

            <div className={styles.modalContent}>
              <span>
                {produtoSelecionado.categoria}
              </span>

              <h3 id="product-modal-title">{produtoSelecionado.nome}</h3>

              <p>
                {produtoSelecionado.descricao}
              </p>

              <strong>
                R${' '}
                {formatarPreco(produtoSelecionado.preco)}
              </strong>

              <button
                type="button"
                className={styles.modalAdd}
                onClick={() => {
                  adicionarProduto(
                    produtoSelecionado,
                  )
                  setProdutoSelecionado(null)
                }}
              >
                <Plus size={18} />
                Adicionar ao pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}


