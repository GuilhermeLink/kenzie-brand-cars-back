import { MigrationInterface, QueryRunner } from "typeorm";

export class Newcolum21682690939151 implements MigrationInterface {
    name = 'Newcolum21682690939151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "reset_token" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "reset_token" SET NOT NULL`);
    }

}
