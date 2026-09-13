import { neonAuth } from '@/lib/neon-auth'


export default neonAuth.middleware({ loginUrl: '/auth/sign-in' })

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|kontify-logo.png|auth|api/auth).*)'],
}
