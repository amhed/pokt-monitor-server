import { NodeStat } from './entities/NodeStats';
import { getRepository } from '@helpers/DbContext'
import { getStatsForAllAccounts } from '@helpers/PocketBridge'
import { Logger } from '@helpers/Logger'

const execute = async () => {
  const repo = await getRepository(NodeStat)
  const stats = await getStatsForAllAccounts()
  for (const stat of stats) {
    Logger.info(`Storing stats for ${stat.name} ${stat.address}`, stat)
    await repo.save(stat)
  }
}

execute()