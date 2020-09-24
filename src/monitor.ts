import { NodeStat } from './entities/NodeStats';
import { getRepository } from '@helpers/DbContext'
import { getStatsForAllAccounts } from '@helpers/PocketBridge'
import { Logger } from '@helpers/Logger'

const execute = async () => {
  const repo = await getRepository(NodeStat)
  const stats = await getStatsForAllAccounts()
  
  const currentHeight = stats[0].height
  if (currentHeight === 0) {
    console.log('For some reason height is zero. Ignoring')
    return
  }

  const heightOnDb = await repo.findOne({height: currentHeight})  
  if (heightOnDb != null) {
    console.log('Height already exists. Skipping')
    return
  }

  for (const stat of stats) {
    Logger.info(`Storing stats for ${stat.name} ${stat.address}`, stat)
    await repo.save(stat)
  }
}

execute()