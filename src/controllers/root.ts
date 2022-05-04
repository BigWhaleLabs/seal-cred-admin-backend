import { Body, Controller, Delete, Flow, Get, Post } from 'amala'
import { utils } from 'ethers'
import AddressBody from '@/validators/AddressBody'
import authenticate from '@/middlewares/authenticate'
import delay from '@/helpers/delay'
import streetCredLedger from '@/helpers/streetCredLedger'
import verifyDerivative from '@/helpers/verifyDerivative'

@Controller('/')
export default class RootController {
  @Post('/add-roots')
  @Flow(authenticate)
  async addRoots(@Body({ required: true }) { addresses }: AddressBody) {
    const tx = await streetCredLedger.addRoots(
      addresses.map((tokenAddress) => ({
        tokenAddress,
        merkleRoot: utils.hexZeroPad('0x1', 32),
      }))
    )
    const completedTx = await tx.wait()
    await delay(60) // wait for the etherscan to update
    await verifyDerivative(completedTx)
  }

  @Delete('/remove-roots')
  @Flow(authenticate)
  async deleteRoots(@Body({ required: true }) { addresses }: AddressBody) {
    for (const address of addresses) {
      const tx = await streetCredLedger.deleteRoot(address)
      await tx.wait()
    }
  }

  @Get('/contract-address')
  getContractAddress() {
    return { address: streetCredLedger.address }
  }
}
