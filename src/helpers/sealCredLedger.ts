import { SealCredLedger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import contractOwnerWallet from '@/helpers/contractOwnerWallet'
import env from '@/helpers/env'

export default SealCredLedger__factory.connect(
  env.SCLEDGER_CONTRACT_ADDRESS,
  contractOwnerWallet
)
