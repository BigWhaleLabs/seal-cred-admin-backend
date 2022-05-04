import { ContractReceipt, Event } from 'ethers'
import { pingVerificationStatus } from '@/etherscan/EtherscanService'
import { toCheckStatusRequest } from '@/etherscan/EtherscanVerifyContractRequest'
import { utils } from 'ethers'
import { verifyContract } from '@/etherscan/verifyContract.api'
import constructorEncoder from '@/helpers/constructorEncoder'

export default function verifyDerivative(tx: ContractReceipt) {
  const data = serializeVerifyParams(tx.events!)

  data.forEach(async (param) => {
    console.log(param)
    const response = await verifyContract(param)
    console.log(response.data)
    console.log(
      `Successfully submitted source code for contract ${param.contractAddress} for verification on the block explorer. Waiting for verification result...`
    )

    const pollRequest = toCheckStatusRequest({
      guid: response.data.result,
    })
    console.log(pollRequest)

    const verificationStatus = await pingVerificationStatus(pollRequest)
    console.log('verificationStatus', verificationStatus)

    if (verificationStatus.isPending()) {
      return pingVerificationStatus(pollRequest)
    }

    if (
      verificationStatus.isVerificationFailure() ||
      verificationStatus.isVerificationSuccess()
    ) {
      return verificationStatus
    }
  })
}

function serializeVerifyParams(
  events: Event[]
): Array<{ contractAddress: string; constructorArguments: string }> {
  const createDerivativeEvents = events?.filter(
    (event: Event) => event.event === undefined
  )

  const eventsData = createDerivativeEvents.map((event: Event) =>
    utils.defaultAbiCoder.decode(
      ['address', 'address', 'address', 'string', 'string', 'address'],
      event.data
    )
  )

  const serialized = eventsData.map((data) => {
    return {
      contractAddress: data[0],
      constructorArguments: constructorEncoder([...data.slice(1, 6)]),
    }
  })

  return serialized
}
