'use client'

import { useState, useEffect } from 'react'

export default function RecentTransactions({ address }: { address: string }) {
  const [txs, setTxs] = useState<any[]>([])

  useEffect(() => {
    if (!address) return
    async function fetchTxs() {
      const res = await fetch(`/api/txs?address=${address}`)
      const data = await res.json()
      setTxs(data.transfers || [])
    }
    fetchTxs()
  }, [address])

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      {txs.length === 0 ? (
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
