import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PizzaGate',
  description: 'Pizza restaurant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>
        {children}
      </body>
    </html>
  )
}
