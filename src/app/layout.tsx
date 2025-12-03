import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { NavigationProvider } from '@/contexts/NavigationContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'
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
  description: 'Enter the quantum realm of code. A mysterious hacker-themed terminal interface for digital exploration featuring matrix animations and cyberpunk aesthetics.',
  keywords: ['hacker', 'terminal', 'quantum', 'logic', 'coding', 'cyber', 'matrix', 'mystery', 'cyberpunk', 'terminal interface', 'quantum computing'],
  authors: [{ name: 'Mystery.exe Team' }],
  creator: 'Mystery.exe',
  publisher: 'Mystery.exe',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#000000' },
  ],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    title: 'Mystery.exe - Quant Logic : IT Theme',
    description: 'Enter the quantum realm of code with a cyberpunk terminal interface. Matrix animations, glitch effects, and mysterious rooms await.',
    url: 'https://mystery-exe.vercel.app',
    siteName: 'Mystery.exe',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mystery.exe - Quantum Logic Terminal Interface',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mystery.exe - Quant Logic : IT Theme',
    description: 'Enter the quantum realm of code with a cyberpunk terminal interface.',
    images: ['/og-image.jpg'],
    creator: '@mystery_exe',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
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
        <ErrorBoundary>
          <NavigationProvider>
            {children}
          </NavigationProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
