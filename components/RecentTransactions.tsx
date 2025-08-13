'use client'

import { useState, useEffect } from 'react'

export default function RecentTransactions({
  defaultAddress,
}: {
  defaultAddress?: string
}) {
  const [searchAddress, setSearchAddress] = useState(defaultAddress || '')
  const [txs, setTxs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchTxs(address: string) {
    if (!address) return
    setLoading(true)
    try {
      const res = await fetch(`/api/txs?address=${address}`)
      if (!res.ok) {
        console.error('API error:', await res.text())
        setTxs([])
        return
      }
      const data = await res.json()
      setTxs(data.transfers || [])
    } catch (err) {
      console.error('Error fetching transactions:', err)
      setTxs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (defaultAddress) fetchTxs(defaultAddress)
  }, [defaultAddress])

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

      {/* Search Form */}
      <div className="flex mb-4 space-x-2">
        <input
          type="text"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          placeholder="Enter wallet address"
          className="flex-1 p-2 rounded bg-gray-700 text-white focus:outline-none"
        />
        <button
          onClick={() => fetchTxs(searchAddress)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading transactions...</p>
      ) : txs.length === 0 ? (
        <p>No recent transactions</p>
      ) : (
        <ul className="space-y-3">
          {txs.map((tx, idx) => (
            <li key={idx} className="p-3 bg-gray-700 rounded">
              <p>
                <strong>Hash:</strong> {tx.hash?.slice(0, 10)}...
              </p>
              <p>
                <strong>From:</strong> {tx.from}
              </p>
              <p>
                <strong>To:</strong> {tx.to}
              </p>
              <p>
                <strong>Value:</strong> {tx.value} ETH
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
