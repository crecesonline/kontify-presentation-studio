import { createNeonAuth } from '@neondatabase/auth/next/server'

export const neonAuth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    // The project variable is used at runtime; the fallback only lets Next collect routes in environments that omit project vars during build.
    secret: process.env.NEON_AUTH_COOKIE_SECRET || 'kontify-build-only-secret-please-configure-runtime',
    sessionDataTtl: 300,
  },
})

export async function requireUser() {
  const { data: session } = await neonAuth.getSession()
  if (!session?.user) return null
  return session.user
}
