'use client'

import { useState } from 'react'

export default function RecentTransactions() {
  const [address, setAddress] = useState('')
  const [txs, setTxs] = useState<any[]>([])

  const fetchTxs = async () => {
    if (!address) return

    const res = await fetch(`/api/txs?address=${address}`)
    if (!res.ok) {
      console.error('API error:', await res.text())
      setTxs([])
      return
    }

    const data = await res.json()
    if (data?.result?.transfers) {
      setTxs(data.result.transfers)
    } else {
      setTxs([])
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Base wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={fetchTxs}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      <h3 className="mt-4 font-bold">Recent Transactions</h3>
      {txs.length === 0 ? (
        <p>No recent transactions</p>
      ) : (
        <ul className="mt-2">
          {txs.map((tx, i) => (
            <li key={i} className="border-b py-2">
              {tx.hash}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
