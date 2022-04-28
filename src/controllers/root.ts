import { AllowedAddressModel } from '@/models/AllowedAddress'
import { Body, Controller, Flow, Get, Post, Put } from 'amala'
import { MerkleTree } from 'merkletreejs'
import { keccak256 } from 'ethers/lib/utils'
import AddressBody from '@/validators/AddressBody'
import authenticate from '@/middlewares/authenticate'
import dosuInvites from '@/helpers/dosuInvites'

@Controller('/')
export default class RootController {
  @Post('/allowlist')
  @Flow(authenticate)
  async addAddress(@Body({ required: true }) { addresses }: AddressBody) {
    for (const address of addresses) {
      let allowedAddress = await AllowedAddressModel.findOne({ address })
      if (!allowedAddress) {
        allowedAddress = await AllowedAddressModel.create({ address })
      }
    }
    return { success: true }
  }

  @Get('/allowlist')
  async getAllowedAddress() {
    return (await AllowedAddressModel.find()).map((a) => a.address)
  }

  @Put('/merkle-tree')
  @Flow(authenticate)
  async updateMerkleTreeRoot() {
    const addresses = (await AllowedAddressModel.find()).map((a) => a.address)
    const merkleTree = new MerkleTree(addresses, keccak256, {
      sortPairs: true,
      hashLeaves: true,
    })
    const currentContractMerkleTreeRoot =
      await dosuInvites.allowlistMerkleRoot()
    const newRoot = merkleTree.getHexRoot()
    const needsUpdating = currentContractMerkleTreeRoot !== newRoot
    if (needsUpdating) {
      console.log('Updating merkle tree root to', newRoot)
      const tx = await dosuInvites.setAllowlistMerkleRoot(newRoot)
      await tx.wait()
    }
    return { updated: needsUpdating }
  }

  @Get('/contract-address')
  getContractAddress() {
    return { address: dosuInvites.address }
  }
}
