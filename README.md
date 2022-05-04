# StreetCred admin backend

- Allows adding new merkle roots
- Returns the address of the contract

## Installation and local launch

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/street-cred-admin-backend`
2. Create `.env` with the environment variables listed below
3. Run `yarn` in the root folder
4. Run `yarn develop`

And you should be good to go! Feel free to fork and submit pull requests.

## Environment variables

| Name                         | Description                              |
| ---------------------------- | ---------------------------------------- |
| `PORT`                       | Port to run server on (defaults to 1337) |
| `CONTRACT_ADDRESS`           | Address of the contract                  |
| `CONTRACT_OWNER_PRIVATE_KEY` | Private key of the contract owner        |
| `ETH_NETWORK`                | Ethereum network to connect to           |
| `INFURA_ID`                  | Infura ID to connect to                  |
| `PASSWORD`                   | Password for protected routes            |
| `ETHERSCAN_API_KEY`          | Etherscan API key                        |

Also, please, consider looking at `.env.sample`.
