import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Claim } from './Claim';

@Entity({ name: 'Orders' })
export class Order {
    @PrimaryColumn({ unique: true })
    id: string;

    @Column({ type: 'timestamp', name: 'MeasuredAt' })
    measuredAt: Date;

    @Column({ type: 'varchar', name: 'address'})
    address: string;

    @Column({ type: 'int8', name: 'height'})
    height: number

    @Column({ type: 'int8', name: 'balance'})
    balance: number

    @Column({ type: 'json', name: 'claims'})
    claims: Claim[]
}