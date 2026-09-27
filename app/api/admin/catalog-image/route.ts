import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { isAdminAuthenticated, isSameOriginRequest } from '@/lib/admin-auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

const BUCKET = 'catalog-images'
const MAX_FILE_SIZE = 5 * 1024 * 1024
const MIME_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  })
}

function hasValidSignature(bytes: Uint8Array, mimeType: string) {
  if (mimeType === 'image/jpeg') {
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
  }
  if (mimeType === 'image/png') {
    return [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
      .every((byte, index) => bytes[index] === byte)
  }
  if (mimeType === 'image/webp') {
    return (
      String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' &&
      String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP'
    )
  }
  return false
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return json({ error: 'Solicitação inválida.' }, 403)
  if (!(await isAdminAuthenticated())) return json({ error: 'Não autorizado.' }, 401)

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > MAX_FILE_SIZE + 64 * 1024) {
    return json({ error: 'A imagem deve ter no máximo 5 MB.' }, 413)
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return json({ error: 'Envie um arquivo de imagem válido.' }, 400)
  }

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return json({ error: 'Selecione uma imagem.' }, 400)
  }
  if (file.size > MAX_FILE_SIZE) {
    return json({ error: 'A imagem deve ter no máximo 5 MB.' }, 413)
  }

  const extension = MIME_EXTENSIONS[file.type]
  if (!extension) {
    return json({ error: 'Formato não suportado. Use JPG, PNG ou WebP.' }, 415)
  }

  const imageBytes = new Uint8Array(await file.arrayBuffer())
  if (!hasValidSignature(imageBytes, file.type)) {
    return json({ error: 'O conteúdo do arquivo não corresponde a uma imagem válida.' }, 415)
  }

  try {
    const supabase = await createSupabaseServerClient()
    const path = `${randomUUID()}.${extension}`
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, imageBytes, { contentType: file.type, upsert: false })

    if (error) return json({ error: 'Não foi possível enviar a imagem.' }, 500)

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    return json({ imageUrl: data.publicUrl }, 201)
  } catch {
    return json({ error: 'Não foi possível enviar a imagem.' }, 500)
  }
}
