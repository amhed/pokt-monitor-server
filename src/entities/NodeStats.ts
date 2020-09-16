import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Claim, PagedClaimResult } from './Claim';
import { StakeInfo } from './StakeInfo';

@Entity({ name: 'NodeStat' })
export class NodeStat {
    @PrimaryColumn({ unique: true })
    id?: string;

    name: string;

    url: string;

    online: boolean;

    @Column({ type: 'timestamp', name: 'measuredAt' })
    measuredAt: Date;

    @Column({ type: 'varchar', name: 'address'})
    address: string;

    @Column({ type: 'int8', name: 'height'})
    height: number

    @Column({ type: 'int8', name: 'balance'})
    balance: number

    @Column({ type: 'json', name: 'stakeInfo', nullable: true})
    stakeInfo?: StakeInfo

    @Column({ type: 'json', name: 'claims', nullable: true})
    claims?: PagedClaimResult

    @Column({ type: 'int8', name: 'claimCount', nullable: true})
    claimCount?: number
}