import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNameToNodeStat1601040418899 implements MigrationInterface {
    name = 'AddNameToNodeStat1601040418899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NodeStat" ADD "name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NodeStat" DROP COLUMN "name"`);
    }

}
