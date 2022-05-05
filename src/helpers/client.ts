import axios from 'axios'

const etherscanClient = axios.create({
  baseURL: 'https://api.etherscan.io/api',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})

export default etherscanClient
