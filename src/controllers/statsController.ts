import _ from 'lodash'
import { Router } from 'express'

import { getStatsForAllAccounts } from '@helpers/PocketBridge'

import { NodestatQueries } from '../repositories/NodestatQueries'
import { getRepository } from '@helpers/DbContext'
import { NodeStat } from 'src/entities/NodeStats'

export const statsController = Router()

statsController.get('/stored', async (req, res, next) => {
  const repo = await getRepository(NodeStat)
  const stats = await NodestatQueries.getLatestStats(repo)
  res.send(stats)
})

statsController.get('/stored/:address', async (req, res, next) => {
  const stats = await getStatsForAllAccounts()
  res.send(stats)
})

statsController.get('/node', async (req, res, next) => {
  const stats = await getStatsForAllAccounts()
  res.send(stats)
})