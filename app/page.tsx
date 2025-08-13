'use client'
import { useState } from 'react'
import WalletTracker from '../components/WalletTracker'
import RecentTransactions from '../components/RecentTransactions'

export default function HomePage() {
  const [currentAddress, setCurrentAddress] = useState<string>('')

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <WalletTracker onAddressChange={setCurrentAddress} />
      {currentAddress && <RecentTransactions address={currentAddress} />}
    </main>
  )
}
