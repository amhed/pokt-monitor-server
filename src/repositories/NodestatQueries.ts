import { NodeStat } from './../entities/NodeStats';
import { Repository } from 'typeorm';

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


  //TODO: Amhed: Add filtering + choose time horizon!
  static async getLatestSince(repo: Repository<NodeStat>): Promise<NodeStat[]> {
    const latest = await repo.manager.query(`
      SELECT max(balance) as Balance, max("claimCount") as "claimCount", max("measuredAt") FROM "NodeStat"
      GROUP BY date_trunc('hour', "measuredAt")
      Order by max("measuredAt")
    `)

    return latest || []
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