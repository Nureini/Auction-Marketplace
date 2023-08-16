import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { AuthContextProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'PrestigeAuctions',
    description:
        'Introducing the epitome of automotive luxury and exclusivity. ',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthContextProvider>
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-1 dark:bg-deep-charcoal">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </AuthContextProvider>
            </body>
        </html>
    )
}
