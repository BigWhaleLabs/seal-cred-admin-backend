import * as SCERC721Derivative from '@/models/SCERC721Derivative.json'
import client from '@/helpers/client'
import env from '@/helpers/env'

const verifyContract = (
  contractAddress: string,
  constructorArguments: string
) => {
  const request = {
    apikey: env.ETHERSCAN_API_KEY,
    module: 'contract',
    action: 'verifysourcecode',
    contractaddress: contractAddress.toString(),
    codeformat: 'solidity-standard-json-input',
    contractname: 'contracts/SCERC721Derivative.sol:SCERC721Derivative',
    compilerversion: 'v0.8.4+commit.c7e474f2',
    constructorArguements: constructorArguments,
    sourceCode: JSON.stringify(SCERC721Derivative),
  }
  const parameters = new URLSearchParams({ ...request })
  return client.post<{
    status: string
    message: string
    result: string
  }>('', parameters)
}

export default verifyContract
