import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683656725958 implements MigrationInterface {
    name = 'Migration1683656725958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announce" DROP CONSTRAINT "FK_1caf1639dc4e529ce42503448e5"`);
        await queryRunner.query(`ALTER TABLE "announce" RENAME COLUMN "ownerId" TO "author_id"`);
        await queryRunner.query(`ALTER TABLE "announce" ADD CONSTRAINT "FK_a263c4bb98501fcaf3b1058ace8" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announce" DROP CONSTRAINT "FK_a263c4bb98501fcaf3b1058ace8"`);
        await queryRunner.query(`ALTER TABLE "announce" RENAME COLUMN "author_id" TO "ownerId"`);
        await queryRunner.query(`ALTER TABLE "announce" ADD CONSTRAINT "FK_1caf1639dc4e529ce42503448e5" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
