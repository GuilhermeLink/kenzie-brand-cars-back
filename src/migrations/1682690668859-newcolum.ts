import { MigrationInterface, QueryRunner } from "typeorm";

export class Newcolum1682690668859 implements MigrationInterface {
    name = 'Newcolum1682690668859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "reset_token" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reset_token"`);
    }

}
