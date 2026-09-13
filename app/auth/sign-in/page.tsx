'use client'

import { FormEvent, useState } from 'react'
import { authClient } from '@/lib/neon-auth-client'

export default function SignInPage() {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    try {
      if (mode === 'signup') {
        const result = await authClient.signUp.email({ email, password, name })
        if (result.error) throw new Error('No se pudo crear la cuenta.')
      } else if (mode === 'forgot') {
        const result = await authClient.requestPasswordReset({ email, redirectTo: `${window.location.origin}/auth/reset-password` })
        if (result.error) throw new Error('No se pudo solicitar la recuperación.')
        setMessage('Si existe una cuenta, recibirás instrucciones por correo.')
        return
      } else {
        const result = await authClient.signIn.email({ email, password })
        if (result.error) throw new Error('Correo o contraseña incorrectos.')
      }
      window.location.href = '/'
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo completar la operación.')
    } finally {
      setBusy(false)
    }
  }

  return <main className="auth-shell"><div className="auth-card"><div className="brand"><span className="brand-mark">K</span><span>Kontify</span></div><p className="overline">KONTIFY PRESENTATION STUDIO</p><h1>{mode === 'signin' ? 'Bienvenido de vuelta.' : mode === 'signup' ? 'Crea tu cuenta.' : 'Recupera tu acceso.'}</h1><p className="auth-copy">Tus presentaciones viven contigo, no en una cookie.</p><form className="auth-form" onSubmit={submit}>{mode === 'signup' && <label>NOMBRE<input required value={name} onChange={(event) => setName(event.target.value)} /></label>}<label>CORREO<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>{mode !== 'forgot' && <label>CONTRASEÑA<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>}<button className="save-button auth-submit" disabled={busy}>{busy ? 'Procesando…' : mode === 'signin' ? 'Iniciar sesión' : mode === 'signup' ? 'Crear cuenta' : 'Enviar instrucciones'}</button></form>{message && <p className="auth-message">{message}</p>}<div className="auth-links">{mode === 'signin' && <><button onClick={() => setMode('forgot')}>¿Olvidaste tu contraseña?</button><button onClick={() => setMode('signup')}>Crear una cuenta</button></>}{mode !== 'signin' && <button onClick={() => setMode('signin')}>Volver a iniciar sesión</button>}</div></div></main>
}
