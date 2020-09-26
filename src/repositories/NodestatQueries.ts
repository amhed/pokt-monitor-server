import moment from 'moment'
import { NodeStat } from './../entities/NodeStats';
import { Repository } from 'typeorm';

type DateGroupType = 'day' | 'hour' | 'minute';

/**
 * Wrapper class used to interact with the Stats table
 */
export class NodestatQueries {
  static async getStatsByAddress(
    repo: Repository<NodeStat>,
    address: string
  ): Promise<NodeStat[] | undefined> {
    return repo.createQueryBuilder('nodestat')
      .where('nodestat.address = :address', { address })
      .andWhere('nodestat.measuredAt >= :since', { since: moment().add(-7, 'days').format('yy-MM-DD') })
      .getMany();
  }

  static async getLatestSince(repo: Repository<NodeStat>, groupBy?: DateGroupType): Promise<NodeStat[]> {
    const oneWeekAgo = moment().add(-7, 'days').format('yy-MM-DD')

    if (!groupBy) {
      return await repo.manager.query(`
        SELECT name as Name, balance as Balance, "claimCount" as "claimCount", "measuredAt" as measuredAt 
        FROM "NodeStat"
        WHERE "measuredAt" >= '${oneWeekAgo}'
        ORDER BY "measuredAt"
      `)
    }

    return await repo.manager.query(`
      SELECT name as Name, max(balance) as Balance, max("claimCount") as "claimCount", max("measuredAt") as measuredAt 
      FROM "NodeStat"
      WHERE "measuredAt" >= '${oneWeekAgo}'
      GROUP BY name, date_trunc('${groupBy}', "measuredAt")
      Order by max("measuredAt")
    `)
  }

  static async getLatestStats(repo: Repository<NodeStat>): Promise<NodeStat[]> {
    const latestTimestamp = (await repo
      .createQueryBuilder('nodestat')
      .orderBy('nodestat.measuredAt', 'DESC')
      .getOne())?.measuredAt

    const latest = await repo
      .createQueryBuilder('nodestat')
      .where('nodestat.measuredAt = :latestTimestamp', { latestTimestamp })
      .getMany()

    return latest || []
  }
}