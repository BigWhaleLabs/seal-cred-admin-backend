import { StreetCredLedger__factory } from '@big-whale-labs/street-cred-ledger-contract'
import contractOwnerWallet from '@/helpers/contractOwnerWallet'
import env from '@/helpers/env'

export default StreetCredLedger__factory.connect(
  env.CONTRACT_ADDRESS,
  contractOwnerWallet
)
