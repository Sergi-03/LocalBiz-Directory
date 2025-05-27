import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/ui/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Revlo - Find local businesses',
  description: 'Intelligent directory of local businesses with reviews and locations.',
}

export default function RootLayout({ children }) {
  return (
     <html lang="es" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background text-foreground")}>
        <ThemeProvider>
          <main className="pt-16 max-w-7xl mx-auto p-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}