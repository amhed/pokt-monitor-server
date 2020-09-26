import moment from 'moment'
import { NodeStat } from './entities/NodeStats';
import { getRepository } from '@helpers/DbContext'
import { queryBalance, queryClaimsInfo, queryHeight, queryStakeInfo } from '@helpers/PocketBridge'
import { settings } from '@settings'
import { uuid } from 'uuidv4'
import { Repository } from 'typeorm'

const startingBlock = 4289 // around sep 11
const blocksInADay = 96 // 4 blocks per hour * 24

const execute = async () => {
  const currentHeight = queryHeight()

  let block = startingBlock
  let date = moment('2020-09-11')

  // query data from the node
  const stats = []
  while (block < 5521) {
    for (const { name, url, address } of settings.accountList) {
      const balance = queryBalance(address)
      const claims = queryClaimsInfo(address)

      const stat = {
        id: uuid(),
        name,
        url,
        online: false,
        address,
        balance,
        height: currentHeight,
        measuredAt: date.toDate(),
        stakeInfo: queryStakeInfo(address),
        claims,
        claimCount: claims?.result?.reduce((acc, item) => item.total_proofs + acc, 0) || 0
      }

      stats.push(stat)
    }

    block += blocksInADay
    date.add(1, 'day')
  }

  const repo = await getRepository(NodeStat)
  console.log(stats)
  await repo.save(stats)
}

execute()