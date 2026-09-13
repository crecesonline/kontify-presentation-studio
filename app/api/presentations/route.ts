import { randomUUID } from 'node:crypto'
import { Pool } from 'pg'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { Presentation } from '@/lib/presentation-model'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function workspaceId() {
  const jar = await cookies()
  let id = jar.get('kontify_workspace')?.value
  if (!id) id = `workspace-${randomUUID()}`
  return { id, isNew: !jar.get('kontify_workspace') }
}

export async function GET() {
  const { id, isNew } = await workspaceId()
  const result = await pool.query('SELECT id, title, audience, duration, level, objective, slides, created_at, updated_at FROM presentations WHERE user_id = $1 ORDER BY updated_at DESC', [id])
  const response = NextResponse.json(result.rows)
  if (isNew) response.cookies.set('kontify_workspace', id, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 365 })
  return response
}

export async function POST(request: Request) {
  const { id: userId, isNew } = await workspaceId()
  const presentation = await request.json() as Presentation
  if (!presentation?.id || !presentation.title || !Array.isArray(presentation.slides)) return NextResponse.json({ error: 'Presentación inválida' }, { status: 400 })
  await pool.query(`INSERT INTO presentations (id, user_id, title, audience, duration, level, objective, slides, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,now()) ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, audience=EXCLUDED.audience, duration=EXCLUDED.duration, level=EXCLUDED.level, objective=EXCLUDED.objective, slides=EXCLUDED.slides, updated_at=now()`, [presentation.id, userId, presentation.title, presentation.audience ?? '', presentation.duration ?? '', presentation.level ?? '', presentation.objective ?? '', JSON.stringify(presentation.slides)])
  const response = NextResponse.json({ ok: true, presentation })
  if (isNew) response.cookies.set('kontify_workspace', userId, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 365 })
  return response
}

export async function DELETE(request: Request) {
  const { id: userId } = await workspaceId()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 })
  await pool.query('DELETE FROM presentations WHERE id = $1 AND user_id = $2', [id, userId])
  return NextResponse.json({ ok: true })
}
