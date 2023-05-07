import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1683472904661 implements MigrationInterface {
    name = 'NewMigration1683472904661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_35fc62e079e0947cf6577868546"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "announcesId" integer`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "announceId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "announceId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_ce486da76412c12df0055fbee46" FOREIGN KEY ("announcesId") REFERENCES "announce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_ce486da76412c12df0055fbee46"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "announceId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "announceId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "announcesId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_35fc62e079e0947cf6577868546" FOREIGN KEY ("announceId") REFERENCES "announce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
