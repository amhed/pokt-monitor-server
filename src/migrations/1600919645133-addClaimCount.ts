import {MigrationInterface, QueryRunner} from "typeorm";

export class addClaimCount1600919645133 implements MigrationInterface {
    name = 'addClaimCount1600919645133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NodeStat" ADD "claimCount" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NodeStat" DROP COLUMN "claimCount"`);
    }

}
