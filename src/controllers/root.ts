import { Body, Controller, Flow, Get, Post } from 'amala'
import { utils } from 'ethers'
import AddressBody from '@/validators/AddressBody'
import authenticate from '@/middlewares/authenticate'
import streetCredLedger from '@/helpers/streetCredLedger'

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
    await tx.wait()
  }

  @Get('/contract-address')
  getContractAddress() {
    return { address: streetCredLedger.address }
  }
}
