'use client'

import { FormEvent, useState } from 'react'
import { authClient } from '@/lib/neon-auth-client'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  async function submit(event: FormEvent) {
    event.preventDefault()
    const token = new URLSearchParams(window.location.search).get('token')
    if (!token) return setMessage('El enlace de recuperación no es válido.')
    const result = await authClient.resetPassword({ newPassword: password, token })
    setMessage(result.error ? 'No se pudo actualizar la contraseña.' : 'Contraseña actualizada. Ya puedes iniciar sesión.')
  }
  return <main className="auth-shell"><div className="auth-card"><div className="brand"><span className="brand-mark">K</span><span>Kontify</span></div><p className="overline">RECUPERACIÓN DE ACCESO</p><h1>Nueva contraseña.</h1><form onSubmit={submit}><label>NUEVA CONTRASEÑA<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label><button className="save-button auth-submit">Actualizar contraseña</button></form>{message && <p className="auth-message">{message}</p>}<a className="auth-back" href="/auth/sign-in">Volver a iniciar sesión</a></div></main>
}
