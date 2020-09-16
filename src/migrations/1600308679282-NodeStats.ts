import {MigrationInterface, QueryRunner} from "typeorm";

export class NodeStats1600308679282 implements MigrationInterface {
    name = 'NodeStats1600308679282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "NodeStat" ("id" character varying NOT NULL, "measuredAt" TIMESTAMP NOT NULL, "address" character varying NOT NULL, "height" bigint NOT NULL, "balance" bigint NOT NULL, "stakeInfo" json NOT NULL, "claims" json NOT NULL, CONSTRAINT "PK_1321e6febc156a94b64b281e9f8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "NodeStat"`);
    }

}
