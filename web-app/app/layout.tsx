import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subject Study Planner',
  description: 'Plan your study subjects and topics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}