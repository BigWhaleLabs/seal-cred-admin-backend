import { ContractReceipt, Event } from 'ethers'
import { utils } from 'ethers'
import constructorEncoder from '@/helpers/constructorEncoder'
import verifyContract from '@/etherscan/verifyContract'

export default function verifyDerivative(tx: ContractReceipt) {
  const data = serializeVerifyParams(tx.events!)

  data.forEach(async (param) => {
    const response = await verifyContract(param)

    if (response.data.status === '1') {
      console.log(
        `Successfully submitted source code for contract ${param.contractAddress} for verification on the block explorer. Waiting for verification result...`
      )
    } else {
      console.log(
        `Something went wrong with the contract ${param.contractAddress} verification`
      )
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
