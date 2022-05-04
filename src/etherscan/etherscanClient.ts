import axios from 'axios'
import env from '@/helpers/env'

const etherscanClient = axios.create({
  baseURL: env.ETHERSCAN_API,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})

export default etherscanClient
