'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export default function WalletTracker({
  onAddress,
}: {
  onAddress: (addr: string) => void
}) {
  const [address, setAddress] = useState<string>('')
  const [balance, setBalance] = useState<string>('')

  async function connectWallet() {
    if (!(window as any).ethereum) {
      alert('MetaMask not found!')
      return
    }
    const provider = new ethers.BrowserProvider((window as any).ethereum)
    const accounts = await provider.send('eth_requestAccounts', [])
    const addr = accounts[0]
    setAddress(addr)
    onAddress(addr)

    const bal = await provider.getBalance(addr)
    setBalance(ethers.formatEther(bal))
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Base Wallet Tracker</h1>
      {!address ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <p className="mb-2">
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>ETH Balance:</strong> {balance} ETH
          </p>
        </div>
      )}
    </div>
  )
}
