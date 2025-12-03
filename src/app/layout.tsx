import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mystery.exe - Quant Logic : IT Theme',
  description: 'Enter the quantum realm of code. A mysterious hacker-themed terminal interface for digital exploration.',
  keywords: ['hacker', 'terminal', 'quantum', 'logic', 'coding', 'cyber', 'matrix', 'mystery'],
  authors: [{ name: 'Mystery.exe Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-secondary-900">
        {children}
      </body>
    </html>
  )
}
