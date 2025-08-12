import { JsonRpcProvider } from 'ethers'

const provider = new JsonRpcProvider(process.env.BASE_RPC_URL)

export default provider
