import { providers } from 'ethers'
import env from '@/helpers/env'

export default new providers.InfuraProvider(env.ETH_NETWORK, env.INFURA_ID)
