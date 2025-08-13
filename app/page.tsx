'use client'

import { useState } from 'react'
import WalletTracker from '../components/WalletTracker'
import RecentTransactions from '../components/RecentTransactions'

export default function Page() {
  const [address, setAddress] = useState<string>('')

  return (
    <main className="flex flex-col items-center justify-start gap-6 w-full">
      <WalletTracker onAddress={setAddress} />
      {address && <RecentTransactions address={address} />}
    </main>
  )
}
