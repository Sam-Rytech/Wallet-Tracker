import { JsonRpcProvider } from 'ethers'

const rpcUrl = process.env.NEXT_PUBLIC_BASE_RPC_URL

if (!rpcUrl) {
  throw new Error('Missing NEXT_PUBLIC_BASE_RPC_URL in environment variables')
}

const provider = new JsonRpcProvider(rpcUrl)

export default provider
