import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdminInUser1681237517744 implements MigrationInterface {
    name = 'AddAdminInUser1681237517744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "admin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "admin"`);
    }

}
