import {
  EtherscanVerifyResponse,
  toVerifyRequest,
} from '@/etherscan/EtherscanVerifyContractRequest'
import etherscanClient from '@/helpers/client'

export default function verifyContract(
  contractAddress: string,
  constructorArguments: string
): Promise<EtherscanVerifyResponse> {
  const request = toVerifyRequest(contractAddress, constructorArguments)
  const parameters = new URLSearchParams({ ...request })

  return etherscanClient.post('', parameters)
}
