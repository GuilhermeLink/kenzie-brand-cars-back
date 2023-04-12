import { MigrationInterface, QueryRunner } from "typeorm";

export class Softdelete1681333351920 implements MigrationInterface {
    name = 'Softdelete1681333351920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announce" ADD "softDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announce" DROP COLUMN "softDeleted"`);
    }

}
