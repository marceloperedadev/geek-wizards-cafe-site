# Painel e catálogo no Supabase

O catálogo em produção é armazenado no PostgreSQL do Supabase. `/admin/cardapio` continua usando as mesmas rotas e componentes do painel; `/cardapio` continua recebendo `categories` e `products` no formato anterior, incluindo `preco` em reais, `simbolo` e `destaque`. O carrinho e o fluxo de WhatsApp não dependem da implementação do banco.

## Configuração do projeto Supabase

1. Crie um projeto Supabase e aplique `supabase/migrations/20260927000100_catalog.sql` pelo SQL Editor ou pela ferramenta de migrations do Supabase. A migration cria as tabelas, políticas RLS, índices, timestamps e inclui as cinco categorias e seis produtos atuais.
2. A migration é repetível: criação de índices/policies é protegida e o seed usa `ON CONFLICT (id) DO NOTHING`. Registros existentes não são substituídos. A fonte oficial da aplicação passa a ser o banco.
3. Em **Authentication → Users**, crie o usuário do proprietário com e-mail e senha. Depois atribua `role: admin` ao `app_metadata` dessa conta pelo SQL Editor, usando o e-mail real:

   ```sql
   update auth.users
   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
   where email = 'proprietario@exemplo.com';
   ```

   Confirme que uma linha foi atualizada. Saia e entre novamente após mudar esse papel para renovar o JWT.

Configure estas variáveis no ambiente privado do servidor (localmente, no `.env.local`; na Vercel, em **Project Settings → Environment Variables**):

- `NEXT_PUBLIC_SUPABASE_URL`: URL do projeto Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: chave pública/anon do projeto. Essa chave pode ser usada no navegador, mas a aplicação a consome no servidor.

Não configure nem exponha uma `service_role` key. A autenticação usa Supabase Auth por e-mail e senha, com sessão em cookies `HttpOnly`; a autorização é verificada no servidor e novamente pelo RLS com o claim assinado `app_metadata.role = admin`.

## Recuperação de senha do administrador

O link **Esqueci minha senha** usa `resetPasswordForEmail` do Supabase Auth. O callback troca o código PKCE por uma sessão e só libera a definição de nova senha quando o usuário autenticado possui `app_metadata.role = admin`. A senha é enviada à API de Auth do Supabase por `updateUser({ password })`; a aplicação não persiste nem registra a senha e não modifica metadata ou papel.

No Supabase Dashboard, em **Authentication → URL Configuration**:

- Defina **Site URL** para a origem local durante desenvolvimento (`http://localhost:3000`) ou para a origem pública em produção.
- Adicione às **Redirect URLs** o callback local `http://localhost:3000/api/admin/auth/callback` e o callback de produção `https://SEU_DOMINIO/api/admin/auth/callback`.
- Em **Authentication → Email Templates → Reset Password**, mantenha o link de confirmação do Supabase (`{{ .ConfirmationURL }}`) para que a validação do token e o redirecionamento sejam feitos pelo Auth.

O domínio usado no callback precisa estar na allowlist de redirects do projeto. Nenhuma variável secreta ou chave `service_role` é necessária no navegador.

## Tabelas e segurança

- `categories`: `id`, `name`, `slug`, `active`, `sort_order`, `created_at`, `updated_at`.
- `products`: `id`, `category_id`, `name`, `description`, `price_cents`, `image_url`, `symbol`, `featured`, `active`, `sort_order`, `created_at`, `updated_at`.
- Preços são inteiros em centavos. As seis imagens originais continuam sem URL; não há upload.
- Leitura anônima só retorna produtos ativos de categorias ativas. Categorias anônimas também são limitadas às ativas.
- Inserts e updates exigem `app_metadata.role = admin`. Não há permissão/política de exclusão física.
- O papel vem de `app_metadata`, que o usuário não consegue alterar por conta própria. Não é lido de metadata editável pelo cliente.
- A autenticação é revalidada pelo Supabase nas rotas do painel; `proxy.ts` mantém os cookies atualizados. O RLS segue como barreira no banco caso uma rota da aplicação seja contornada.

## Catálogo anterior

`data/catalog.json` permanece no repositório somente como referência da migração. A aplicação não o importa nem lê. O seed SQL conserva IDs de categorias/produtos, nomes, preços, descrições, símbolos, destaques, estado e ordem originais; `image_url` permanece `NULL` nos seis produtos. A migration ignora IDs já existentes e não duplica registros ao ser reaplicada.

## Operação

1. Configure as duas variáveis Supabase no ambiente de deploy e publique a versão da aplicação.
2. Crie a conta Auth do proprietário, atribua `app_metadata.role = admin` e aplique a migration no projeto correspondente.
3. Abra `/admin/cardapio`, entre com e-mail e senha e edite o catálogo. Mudanças são gravadas no PostgreSQL e são compartilhadas entre instâncias/deploys.

Sem as variáveis do Supabase, o painel informa que não está configurado e as rotas administrativas não concedem acesso. `/cardapio` também precisa dessas variáveis para consultar o banco; não há fallback para o JSON. Não é necessário `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` ou `MENU_DATA_PATH`.
