'use client'

import React, { useState } from 'react'
import { ethers } from 'ethers'
import provider from '../lib/provider'

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletTrackerProps {
  onAddressChange: (address: string) => void
}

export default function WalletTracker({ onAddressChange }: WalletTrackerProps) {
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError('MetaMask not found')
        return
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      const userAddress = ethers.getAddress(accounts[0])
      setAddress(userAddress)
      onAddressChange(userAddress)

      const bal = await provider.getBalance(userAddress)
      setBalance(ethers.formatEther(bal))
    } catch (err) {
      console.error(err)
      setError('Failed to connect wallet')
    }
  }

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4">Base Wallet Tracker</h2>
      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        Connect Wallet
      </button>

      {address && (
        <div className="mt-4 text-white">
          <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>ETH Balance:</strong>{' '}
            {balance ? `${balance} ETH` : 'Loading...'}
          </p>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}
