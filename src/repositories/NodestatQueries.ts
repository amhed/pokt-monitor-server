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
      .getMany();
  }

  static async getLatestSince(repo: Repository<NodeStat>, groupBy?: DateGroupType): Promise<NodeStat[]> {
    if (!groupBy) {
      return await repo.manager.query(`
        SELECT name as Name, balance as Balance, "claimCount" as "claimCount", "measuredAt" as measuredAt FROM "NodeStat"
        Order by "measuredAt"
      `)
    }

    return await repo.manager.query(`
      SELECT name as Name, max(balance) as Balance, max("claimCount") as "claimCount", max("measuredAt") as measuredAt FROM "NodeStat"
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