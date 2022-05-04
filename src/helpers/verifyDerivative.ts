import { ContractReceipt } from 'ethers'
import serializeVerifyParameters from '@/helpers/serializeVerifyParameters'
import verifyContract from '@/helpers/verifyContract'

export default function verifyDerivative(tx: ContractReceipt) {
  if (!tx.events) {
    throw new Error('No events found in transaction')
  }
  const data = serializeVerifyParameters(tx.events)
  return Promise.all(
    data.map(async ({ contractAddress, constructorArguments }) => {
      await verifyContract(contractAddress, constructorArguments)
      console.log(
        `Successfully submitted source code for contract ${contractAddress} for verification on the block explorer`
      )
    })
  )
}
