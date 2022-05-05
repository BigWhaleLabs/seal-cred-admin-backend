import * as dotenv from 'dotenv'
import { cleanEnv, num, str } from 'envalid'
import { cwd } from 'process'
import { resolve } from 'path'

dotenv.config({ path: resolve(cwd(), '.env') })

// eslint-disable-next-line node/no-process-env
export default cleanEnv(process.env, {
  PORT: num({ default: 1337 }),
  CONTRACT_ADDRESS: str(),
  CONTRACT_OWNER_PRIVATE_KEY: str(),
  ETH_NETWORK: str(),
  ETHERSCAN_API_KEY: str(),
  INFURA_ID: str(),
  PASSWORD: str(),
})
