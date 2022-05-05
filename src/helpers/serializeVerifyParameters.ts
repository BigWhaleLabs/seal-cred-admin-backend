import { Event, utils } from 'ethers'
import constructorEncoder from '@/helpers/constructorEncoder'

export default function serializeVerifyParameters(events: Event[]) {
  const createDerivativeEvents = events.filter((event) => !event.event)

  const eventsData = createDerivativeEvents.map((event: Event) =>
    utils.defaultAbiCoder.decode(
      ['address', 'address', 'address', 'string', 'string', 'address'],
      event.data
    )
  )

  const serialized = eventsData.map((data) => {
    return {
      contractAddress: data[0] as string,
      constructorArguments: constructorEncoder([...data.slice(1, 6)]),
    }
  })

  return serialized
}
