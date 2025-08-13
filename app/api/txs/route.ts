import { NextResponse } from 'next/server'
import { Alchemy, Network, AssetTransfersCategory } from 'alchemy-sdk'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const address = searchParams.get('address')

    if (!address) {
      return NextResponse.json({ error: 'Missing address' }, { status: 400 })
    }

    if (!process.env.ALCHEMY_API_KEY) {
      return NextResponse.json(
        { error: 'Alchemy API key not configured' },
        { status: 500 }
      )
    }

    const settings = {
      apiKey: process.env.ALCHEMY_API_KEY,
      network: Network.BASE_MAINNET,
    }

    const alchemy = new Alchemy(settings)

    const txs = await alchemy.core.getAssetTransfers({
      fromBlock: '0x0',
      toAddress: address,
      category: [
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.INTERNAL,
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.ERC721,
        AssetTransfersCategory.ERC1155,
      ],
      maxCount: 5,
    })

    return NextResponse.json(txs)
  } catch (error) {
    console.error('Error in /api/txs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}
