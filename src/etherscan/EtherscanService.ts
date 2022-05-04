import { EtherscanCheckStatusRequest } from '@/etherscan/EtherscanVerifyContractRequest'
import { getVerificationStatus } from '@/etherscan/verifyContract.api'
import delay from '@/helpers/delay'

export async function pingVerificationStatus(
  params: EtherscanCheckStatusRequest
): Promise<EtherscanResponse> {
  const response = await getVerificationStatus(params)
  console.log('response.data', response.data)
  const etherscanResponse = new EtherscanResponse(response.data)

  if (etherscanResponse.isPending()) {
    await delay(3000)

    return getVerificationStatus(params)
  }

  if (etherscanResponse.isVerificationFailure()) {
    return etherscanResponse
  }

  return etherscanResponse
}

export default class EtherscanResponse {
  public readonly data: { status: number; message: string } = {
    status: 0,
    message: '',
  }

  constructor(response: any) {
    this.data.status = parseInt(response.status, 10)
    this.data.message = response.result
  }

  public isPending() {
    return this.data.message === 'Pending in queue'
  }

  public isVerificationFailure() {
    return this.data.message === 'Fail - Unable to verify'
  }

  public isVerificationSuccess() {
    return this.data.message === 'Pass - Verified'
  }

  public isBytecodeMissingInNetworkError() {
    return this.data.message.startsWith('Unable to locate ContractCode at')
  }

  public isOk() {
    return this.data.status === 1
  }
}
