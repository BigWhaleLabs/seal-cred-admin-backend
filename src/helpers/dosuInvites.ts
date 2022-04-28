import { DosuInvites__factory } from '@big-whale-labs/dosu-invites-contract/typechain'
import contractOwnerWallet from '@/helpers/contractOwnerWallet'
import env from '@/helpers/env'

export default DosuInvites__factory.connect(
  env.CONTRACT_ADDRESS,
  contractOwnerWallet
)
