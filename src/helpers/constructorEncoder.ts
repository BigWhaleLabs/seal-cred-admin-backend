import { Interface } from '@ethersproject/abi'

export default function constructorEncoder(constructorArguments: string[]) {
  const constructorInterface = new Interface([
    'constructor(address _streetCredMapAddress, address _streetCredContractAddress, string memory tokenName, string memory tokenSymbol, address _verifier)',
  ])
  return constructorInterface
    .encodeDeploy(constructorArguments)
    .replace('0x', '')
}
