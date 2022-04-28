import { Body, Controller, Flow, Get, Put } from 'amala'
import { utils } from 'ethers'
import AddressBody from '@/validators/AddressBody'
import authenticate from '@/middlewares/authenticate'
import streetCredLedger from '@/helpers/streetCredLedger'

@Controller('/')
export default class RootController {
  @Put('/add-roots')
  @Flow(authenticate)
  async addRoots(@Body({ required: true }) { addresses }: AddressBody) {
    await streetCredLedger.addRoots(
      addresses.map((tokenAddress) => ({
        tokenAddress,
        merkleRoot: utils.hexZeroPad('0x0', 32),
      }))
    )
  }

  @Get('/contract-address')
  getContractAddress() {
    return { address: streetCredLedger.address }
  }
}
