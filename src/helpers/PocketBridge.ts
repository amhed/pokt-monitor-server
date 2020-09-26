import axios from 'axios'
import { uuid } from 'uuidv4'
import { execSync } from 'child_process'
import { settings } from '@settings'
import { Claim, PagedClaimResult } from '../entities/Claim'

export const queryBalance = (address: string, height?: number) => {
  try {
    const result = height 
      ? execSync(`pocket query balance ${address} ${height}`).toString()
      : execSync(`pocket query balance ${address}`).toString()
    const json = JSON.parse(result.split('\n').slice(1).join(' '))
    return json.balance
  } catch (err) {
    return 0
  }
}

export const queryHeight = () => {
  try {
    const result = execSync(`pocket query height`).toString()
    const json = JSON.parse(result.split('\n').slice(1).join(' '))
    return json.height
  } catch (err) {
    return 0
  }
}

export const queryStakeInfo = (address: string) => {
  try {
    const result = execSync(`pocket query node ${address}`).toString()
    const json = JSON.parse(result.split('\n').slice(1).join(' '))
    return json
  } catch (err) {
    return null
  }
}

export const queryClaimsInfo = (address: string) => {
  try {
    const result = execSync(`pocket query node-claims ${address}`).toString()
    const json = JSON.parse(result.split('\n').slice(1).join(' ')) as PagedClaimResult
    return json
  } catch (err) {
    return undefined
  }
}

export const queryNode = (address: string) => {
  try {
    const result = execSync(`pocket query node ${address}`).toString()
    return result
    // const json = JSON.parse(result.split('\n').slice(1).join(' '))
    // return json.balance
  } catch (err) {
    return 0
  }
}

export const pingEndpoint = async (url?: string) => {
  if (url == null) {
    return false
  }

  try {
    const response = await axios.get(url)
    return response && response.status === 200
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getStatsForAllAccounts = async () => {
  const stats = []
  try {
    const height = queryHeight()
    const measuredAt = new Date()

    for (const {name, url, address} of settings.accountList) {
      const balance = await queryBalance(address)
      const claims = await queryClaimsInfo(address)

      const stat = {
        id: uuid(),
        name,
        url,
        online: await pingEndpoint(url),
        address,
        balance,
        height,
        measuredAt,
        stakeInfo: await queryStakeInfo(address),
        claims,
        claimCount: claims?.result?.reduce((acc, item) => item.total_proofs + acc, 0) || 0
      }      

      stats.push(stat)
    }
    return stats
  } catch (err) {
    //TODO: Amhed: Send to logger
    console.log(err)
    return []
  }
}