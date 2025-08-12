import React from 'react';
import '../styles/globals.css';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Base Wallet Tracker',
  description: 'Track ETH balance and recent transactions on Base network',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-start p-6">
        {children}
      </body>
    </html>
  )
}
