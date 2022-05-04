import {
  EtherscanVerifyResponse,
  toCheckStatusRequest,
  toVerifyRequest,
} from '@/etherscan/EtherscanVerifyContractRequest'
import EtherscanResponse from '@/etherscan/EtherscanService'
import etherscanClient from '@/etherscan/etherscanClient'

const verifyContract = (params: {
  contractAddress: string
  constructorArguments: string
}): Promise<EtherscanVerifyResponse> => {
  const request = toVerifyRequest(params)
  // console.log(request)
  const parameters = new URLSearchParams({ ...request })

  return etherscanClient.post('', parameters)
}

const getVerificationStatus = (params: {
  guid: string
}): Promise<EtherscanResponse> => {
  const request = toCheckStatusRequest(params)
  const parameters = new URLSearchParams({ ...request })

  return etherscanClient.post('', parameters)
}

export { verifyContract, getVerificationStatus }
