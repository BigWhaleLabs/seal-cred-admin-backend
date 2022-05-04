import * as SCERC721Derivative from '@/helpers/SCERC721Derivative.json'
import env from '@/helpers/env'

export interface EtherscanRequest {
  apikey: string
  module: 'contract'
  action: string
}

export interface EtherscanVerifyResponse {
  data: {
    status: string
    message: string
    result: string
  }
}

export interface EtherscanVerifyRequest extends EtherscanRequest {
  action: 'verifysourcecode'
  contractaddress: string
  sourceCode: string
  codeformat: 'solidity-standard-json-input'
  contractname: string
  compilerversion: string
  constructorArguements: string
}

export interface EtherscanCheckStatusRequest extends EtherscanRequest {
  action: 'checkverifystatus'
  guid: string
}

export function toVerifyRequest(params: {
  contractAddress: string
  constructorArguments: string
}): EtherscanVerifyRequest {
  return {
    apikey: env.ETHERSCAN_API_KEY,
    module: 'contract',
    action: 'verifysourcecode',
    contractaddress: params.contractAddress.toString(),
    codeformat: 'solidity-standard-json-input',
    contractname: 'contracts/SCERC721Derivative.sol:SCERC721Derivative',
    compilerversion: 'v0.8.4+commit.c7e474f2',
    constructorArguements: params.constructorArguments,
    sourceCode: JSON.stringify(SCERC721Derivative),
  }
}

export function toCheckStatusRequest(params: {
  guid: string
}): EtherscanCheckStatusRequest {
  return {
    apikey: env.ETHERSCAN_API_KEY,
    module: 'contract',
    action: 'checkverifystatus',
    guid: params.guid,
  }
}
