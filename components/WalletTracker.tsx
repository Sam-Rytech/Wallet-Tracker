'use client'
import { useState } from 'react'
import { ethers } from 'ethers'
import provider from '../lib/provider'

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function WalletTracker({
  onAddressChange,
}: {
  onAddressChange: (address: string) => void
}) {
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [inputAddress, setInputAddress] = useState<string>('')
  const [balance, setBalance] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // Fetch balance for current wallet
  const fetchBalance = async (address: string) => {
    try {
      setLoading(true)
      const bal = await provider.getBalance(address)
      setBalance(parseFloat(ethers.formatEther(bal)).toFixed(4))
    } catch (err) {
      console.error('Balance fetch error:', err)
      setBalance('Error')
    } finally {
      setLoading(false)
    }
  }

  // Connect MetaMask
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert('MetaMask not detected!')
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      const addr = accounts[0]
      setWalletAddress(addr)
      onAddressChange(addr)
      fetchBalance(addr)
    } catch (err) {
      console.error('Wallet connection error:', err)
    }
  }

  // Handle search submit
  const handleSearch = () => {
    if (ethers.isAddress(inputAddress)) {
      setWalletAddress(inputAddress)
      setBalance('')
      onAddressChange(inputAddress)
      fetchBalance(inputAddress)
    } else {
      alert('Invalid wallet address')
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-800 text-white">
      <h2 className="text-xl font-bold mb-3">Base Wallet Tracker</h2>

      {/* Connect Wallet */}
      <button
        onClick={connectWallet}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 mr-2"
      >
        Connect Wallet
      </button>

      {/* Search Wallet */}
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          placeholder="Enter wallet address..."
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          className="px-3 py-2 rounded bg-gray-700 border border-gray-600 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {/* Wallet Info */}
      {walletAddress && (
        <div className="mt-4 space-y-1">
          <p>
            <strong>Address:</strong> {walletAddress}
          </p>
          <p>
            <strong>ETH Balance:</strong>{' '}
            {loading ? 'Loading...' : `${balance} ETH`}
          </p>
        </div>
      )}
    </div>
  )
}
