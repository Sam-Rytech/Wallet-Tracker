'use client'

import React, { useEffect, useState } from 'react'

interface RecentTransactionsProps {
  defaultAddress: string
}

export default function RecentTransactions({
  defaultAddress,
}: RecentTransactionsProps) {
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    if (!defaultAddress) return

    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: 1,
              jsonrpc: '2.0',
              method: 'alchemy_getAssetTransfers',
              params: [
                {
                  fromBlock: '0x0',
                  toAddress: defaultAddress,
                  category: ['external', 'erc20', 'erc721'],
                  withMetadata: true,
                  excludeZeroValue: true,
                  maxCount: '0xA',
                },
              ],
            }),
          }
        )

        if (!res.ok) throw new Error(`Failed to fetch transactions`)

        const data = await res.json()
        setTransactions(data.result?.transfers || [])
      } catch (err) {
        console.error('Error fetching transactions:', err)
      }
    }

    fetchTransactions()
  }, [defaultAddress])

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p>No recent transactions</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((tx, idx) => (
            <li key={idx} className="bg-gray-800 p-3 rounded-lg">
              <p>
                <strong>From:</strong> {tx.from}
              </p>
              <p>
                <strong>To:</strong> {tx.to}
              </p>
              <p>
                <strong>Amount:</strong> {tx.value}
              </p>
              <p>
                <strong>Hash:</strong> {tx.hash}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
