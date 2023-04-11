import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedAdress1681236399486 implements MigrationInterface {
  name = "UpdatedAdress1681236399486";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "number"`);
    await queryRunner.query(
      `ALTER TABLE "address" ADD "number" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "complement" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "complement" SET NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "number"`);
    await queryRunner.query(
      `ALTER TABLE "address" ADD "number" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD "country" character varying NOT NULL`
    );
  }
}
