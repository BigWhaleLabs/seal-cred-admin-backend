import { IsEthereumAddress } from 'amala'

export default class AdressBody {
  @IsEthereumAddress({ each: true })
  addresses!: string[]
}
