import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KOPI TUPI',
  description: 'Kopi Tupi - Where exceptional coffee meets modern comfort. Experience artisanal brewing in a contemporary atmosphere designed for connection and creativity.',
  generator: 'v0.dev',
  icons: {
    icon: '/Logo Kopi Tupi.png',
    shortcut: '/Logo Kopi Tupi.png',
    apple: '/Logo Kopi Tupi.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/kopitupi-favicon.png" type="image/png" />
        <title>KOPI TUPI</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
