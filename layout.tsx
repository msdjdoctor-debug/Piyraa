import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pi Wallet - Digital Turkish Lira & Pi Network",
  description:
    "World's first hybrid CBDC + Pi Network wallet. Connect to Pi ecosystem, integrate with Turkish banks, and transfer across all blockchains.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Pi Wallet - Digital Turkish Lira & Pi Network",
    description: "Hybrid CBDC wallet supporting Pi Network, Turkish banks, and cross-chain transfers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pi Wallet",
    description: "Digital Turkish Lira + Pi Network hybrid wallet",
  },
  generator: "v0.app",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="beforeInteractive" />
        <style>{`
          :root {
            --sat: env(safe-area-inset-top);
            --sar: env(safe-area-inset-right);
            --sab: env(safe-area-inset-bottom);
            --sal: env(safe-area-inset-left);
          }
          .pb-safe {
            padding-bottom: max(1.5rem, var(--sab));
          }
        `}</style>
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
