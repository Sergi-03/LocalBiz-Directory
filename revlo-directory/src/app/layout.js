import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/ui/theme-provider'
import FloatingMenu from '@/components/floating-menu'
import Footer from '@/components/ui/footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL("https://expert-space-journey-wr9w6p6jp7wxhv457-3000.app.github.dev"),
  title: 'Revlo - Find local businesses',
  description: 'Intelligent directory of local businesses with reviews and locations.',
   openGraph: {
    title: "Revlo - Find local businesses",
    description: "Intelligent directory of local businesses with reviews and locations.",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revlo - Find local businesses",
    description: "Intelligent directory of local businesses with reviews and locations.",
    images: ["/og-image.png"],
  }
}

export default function RootLayout({ children }) {
  return (
     <html lang="es" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background text-foreground")}>
        <ThemeProvider>
          <Toaster position="top-center" closeButton/>
          <main className="pt-16 max-w-7xl mx-auto p-6">{children}</main>
          <FloatingMenu/>
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  )
}