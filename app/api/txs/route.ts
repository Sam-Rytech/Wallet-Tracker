import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.query

  // Load API key from env (server-side)
  const apiKey =
    process.env.ALCHEMY_API_KEY || process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'Alchemy API key not configured' })
  }

  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid address' })
  }

  try {
    const response = await fetch(
      `https://base-mainnet.g.alchemy.com/v2/${apiKey}`,
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
              toBlock: 'latest',
              toAddress: address,
              category: ['external', 'erc20', 'erc721', 'erc1155'],
              withMetadata: true,
              excludeZeroValue: true,
              maxCount: '0xA',
            },
          ],
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Alchemy API request failed: ${response.status}`)
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (err: any) {
    console.error('Alchemy fetch error:', err)
    return res
      .status(500)
      .json({ error: err.message || 'Internal Server Error' })
  }
}
