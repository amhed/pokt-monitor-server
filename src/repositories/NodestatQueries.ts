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