import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdminInUser1681237467472 implements MigrationInterface {
  name = "AddAdminInUser1681237467472";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "admin" boolean NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "admin"`);
  }
}
