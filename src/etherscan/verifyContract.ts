import {
  EtherscanVerifyResponse,
  toVerifyRequest,
} from '@/etherscan/EtherscanVerifyContractRequest'
import etherscanClient from '@/etherscan/etherscanClient'

export default function verifyContract(params: {
  contractAddress: string
  constructorArguments: string
}): Promise<EtherscanVerifyResponse> {
  const request = toVerifyRequest(params)
  const parameters = new URLSearchParams({ ...request })

  return etherscanClient.post('', parameters)
}
