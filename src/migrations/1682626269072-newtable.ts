import { MigrationInterface, QueryRunner } from "typeorm";

export class Newtable1682626269072 implements MigrationInterface {
    name = 'Newtable1682626269072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "reset_token" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reset_token"`);
    }

}
