
'use client'

import { useMemo, useState } from 'react'
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
import styles from './Cardapio.module.css'

type Produto = {
  id: number
  nome: string
  descricao: string
  preco: number
  imagem: string
  categoria: string
  destaque?: boolean
}

const CATEGORIAS = [
  'Todos',
  'Cafés',
  'Bebidas',
  'Doces',
  'Salgados',
  'Combos',
]

const PRODUTOS: Produto[] = [
  {
    id: 1,
    nome: 'Café Arcano',
    descricao:
      'Café especial preparado com um toque mágico da casa.',
    preco: 12.9,
    imagem: '/images/cafe.jpg',
    categoria: 'Cafés',
    destaque: true,
  },
  {
    id: 2,
    nome: 'Poção Roxa',
    descricao:
      'Bebida refrescante e misteriosa, perfeita para aventureiros.',
    preco: 15.9,
    imagem: '/images/pocao.jpg',
    categoria: 'Bebidas',
    destaque: true,
  },
  {
    id: 3,
    nome: 'Bolo do Mago',
    descricao:
      'Fatia generosa de bolo artesanal preparada na casa.',
    preco: 14.9,
    imagem: '/images/bolo.jpg',
    categoria: 'Doces',
  },
  {
    id: 4,
    nome: 'Cookie Encantado',
    descricao:
      'Cookie artesanal com chocolate e uma dose de magia.',
    preco: 9.9,
    imagem: '/images/cookie.jpg',
    categoria: 'Doces',
  },
  {
    id: 5,
    nome: 'Torrada do Aventureiro',
    descricao:
      'Torrada crocante com recheio especial da casa.',
    preco: 16.9,
    imagem: '/images/torrada.jpg',
    categoria: 'Salgados',
  },
  {
    id: 6,
    nome: 'Combo do Mago',
    descricao:
      'Café Arcano + Cookie Encantado.',
    preco: 20.9,
    imagem: '/images/combo.jpg',
    categoria: 'Combos',
    destaque: true,
  },
]

type ItemCarrinho = {
  produto: Produto
  quantidade: number
}

export function Cardapio() {
  const [categoria, setCategoria] = useState('Todos')
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])
  const [produtoSelecionado, setProdutoSelecionado] =
    useState<Produto | null>(null)
  const [mesa, setMesa] = useState('')

  const produtosFiltrados = useMemo(() => {
    if (categoria === 'Todos') return PRODUTOS

    return PRODUTOS.filter(
      (produto) => produto.categoria === categoria,
    )
  }, [categoria])

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
          `${item.quantidade}x ${item.produto.nome} — R$ ${(
            item.produto.preco * item.quantidade
          )
            .toFixed(2)
            .replace('.', ',')}`,
      )
      .join('\n')

    const mensagem = `🧙 NOVO PEDIDO — GEEK WIZARDS & CAFÉ

📍 Mesa: ${mesa}

${itens}

💰 Total: R$ ${valorTotal
      .toFixed(2)
      .replace('.', ',')}

Pedido enviado pelo cardápio digital.`

    const telefone = '5512999999999'

    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(
      mensagem,
    )}`

    window.open(url, '_blank')
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
        {CATEGORIAS.map((item) => (
          <button
            key={item}
            type="button"
            className={
              categoria === item
                ? styles.categoryActive
                : styles.category
            }
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
                  onClick={() =>
                    setProdutoSelecionado(produto)
                  }
                  aria-label={`Ver ${produto.nome}`}
                >
                  <Image
                    src={produto.imagem}
                    alt={produto.nome}
                    fill
                    sizes="(max-width: 700px) 50vw, 280px"
                  />

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
                      R$ {produto.preco
                        .toFixed(2)
                        .replace('.', ',')}
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
      {carrinho.length > 0 && (
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
              R$ {valorTotal
                .toFixed(2)
                .replace('.', ',')}
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
                      {item.produto.preco
                        .toFixed(2)
                        .replace('.', ',')}
                    </span>
                  </div>

                  <div className={styles.orderControls}>
                    <button
                      type="button"
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
                R$ {valorTotal
                  .toFixed(2)
                  .replace('.', ',')}
              </strong>
            </div>

            <button
              type="button"
              className={styles.sendButton}
              onClick={enviarPedido}
            >
              <Send size={18} />
              Enviar pedido pelo WhatsApp
            </button>

            <p className={styles.orderNote}>
              Seu pedido será encaminhado para nossa
              equipe. Aguarde a confirmação do garçom.
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
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={() =>
                setProdutoSelecionado(null)
              }
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            <div className={styles.modalImage}>
              <Image
                src={produtoSelecionado.imagem}
                alt={produtoSelecionado.nome}
                fill
                sizes="500px"
              />
            </div>

            <div className={styles.modalContent}>
              <span>
                {produtoSelecionado.categoria}
              </span>

              <h3>{produtoSelecionado.nome}</h3>

              <p>
                {produtoSelecionado.descricao}
              </p>

              <strong>
                R${' '}
                {produtoSelecionado.preco
                  .toFixed(2)
                  .replace('.', ',')}
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


