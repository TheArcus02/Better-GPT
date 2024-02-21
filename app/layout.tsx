import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import GetPremiumModal from '@/components/get-premium-modal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: {
    default: 'BetterGPT',
    template: '%s | BetterGPT',
  },
  description:
    'Revolutionize your creativity with BetterGPT, your ultimate AI-powered companion. Engage in smart conversations, generate stunning images, and break language barriers with seamless translations. Explore limitless possibilities with our advanced AI technology. Join us now and experience the future of creative innovation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning={true}>
        <body className={inter.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
          >
            <TooltipProvider>
              <GetPremiumModal />
              {children}
            </TooltipProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
