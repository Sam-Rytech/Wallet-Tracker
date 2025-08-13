import { NextResponse } from 'next/server'
import { Alchemy, Network } from 'alchemy-sdk'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 })
  }

  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.BASE_MAINNET,
  }

  const alchemy = new Alchemy(settings)
  const txs = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    toAddress: address,
    category: ['external', 'internal', 'erc20', 'erc721', 'erc1155'],
    order: 'desc',
    maxCount: 5,
  })

  return NextResponse.json(txs)
}
