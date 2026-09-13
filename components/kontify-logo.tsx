import Image from 'next/image'

type KontifyLogoProps = {
  className?: string
}

export function KontifyLogo({ className = '' }: KontifyLogoProps) {
  return <Image className={className} src="/kontify-logo.png" alt="Kontify" width={480} height={170} priority />
}
