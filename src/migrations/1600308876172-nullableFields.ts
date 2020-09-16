import {MigrationInterface, QueryRunner} from "typeorm";

export class nullableFields1600308876172 implements MigrationInterface {
    name = 'nullableFields1600308876172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NodeStat" ALTER COLUMN "stakeInfo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "NodeStat" ALTER COLUMN "claims" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NodeStat" ALTER COLUMN "claims" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "NodeStat" ALTER COLUMN "stakeInfo" SET NOT NULL`);
    }

}
