'use client'

import React from 'react'
import { useState } from 'react'
import WalletTracker from '../components/WalletTracker'
import RecentTransactions from '../components/RecentTransactions'

export default function HomePage() {
  const [connectedAddress, setConnectedAddress] = useState<string>('')
  const [searchAddress, setSearchAddress] = useState<string>('')
  const [displayAddress, setDisplayAddress] = useState<string>('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchAddress.trim()) {
      setDisplayAddress(searchAddress.trim())
    }
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      {/* Wallet connection */}
      <WalletTracker onAddressChange={setConnectedAddress} />

      {/* Search field */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2 my-6">
        <input
          type="text"
          placeholder="Enter Base wallet address"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
        />
        <button
          type="submit"
          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
        >
          Search
        </button>
      </form>

      {/* Recent transactions */}
      {(displayAddress || connectedAddress) && (
        <RecentTransactions defaultAddress={displayAddress || connectedAddress} />
      )}
    </main>
  )
}
