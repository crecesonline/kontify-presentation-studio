import { Pool } from 'pg'
import { NextResponse } from 'next/server'
import type { Presentation } from '@/lib/presentation-model'
import { requireUser } from '@/lib/neon-auth'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function authenticatedUser() {
  const user = await requireUser()
  if (!user) return null
  return user
}

export async function GET(request: Request) {
  const user = await authenticatedUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const result = await pool.query('SELECT id, title, audience, duration, level, objective, slides, created_at, updated_at FROM presentations WHERE user_id = $1 AND ($2::text IS NULL OR id = $2) ORDER BY updated_at DESC', [user.id, id])
  if (id && result.rows.length === 0) return NextResponse.json({ error: 'Presentación no encontrada' }, { status: 404 })
  return NextResponse.json(id ? result.rows[0] : result.rows)
}

export async function POST(request: Request) {
  const user = await authenticatedUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const presentation = await request.json() as Presentation
  if (!presentation?.id || !presentation.title || !Array.isArray(presentation.slides)) return NextResponse.json({ error: 'Presentación inválida' }, { status: 400 })
  const existing = await pool.query('SELECT user_id FROM presentations WHERE id = $1', [presentation.id])
  if (existing.rows[0] && existing.rows[0].user_id !== user.id) return NextResponse.json({ error: 'Presentación no encontrada' }, { status: 404 })
  await pool.query(`INSERT INTO presentations (id, user_id, title, audience, duration, level, objective, slides, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,now()) ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, audience=EXCLUDED.audience, duration=EXCLUDED.duration, level=EXCLUDED.level, objective=EXCLUDED.objective, slides=EXCLUDED.slides, updated_at=now() WHERE presentations.user_id = EXCLUDED.user_id`, [presentation.id, user.id, presentation.title, presentation.audience ?? '', presentation.duration ?? '', presentation.level ?? '', presentation.objective ?? '', JSON.stringify(presentation.slides)])
  return NextResponse.json({ ok: true, presentation })
}

export async function DELETE(request: Request) {
  const user = await authenticatedUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 })
  const result = await pool.query('DELETE FROM presentations WHERE id = $1 AND user_id = $2', [id, user.id])
  if (result.rowCount === 0) return NextResponse.json({ error: 'Presentación no encontrada' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
