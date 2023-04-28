import { MigrationInterface, QueryRunner } from "typeorm";

export class Cascade1682440495895 implements MigrationInterface {
    name = 'Cascade1682440495895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "neighborhood" character varying NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "complement" character varying, "zipCode" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mark" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0c6d4afd73cc2b4eee5a926aafc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "model" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d6df271bba301d5cc79462912a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fuel" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_0979c62883aa0364e3152b6d36a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "color" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gallery" ("id" SERIAL NOT NULL, "images" text NOT NULL, CONSTRAINT "PK_65d7a1ef91ddafb3e7071b188a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "userId" uuid, "announceId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "announce" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "km" integer NOT NULL, "price_fipe" integer NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "withinFipe" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "softDeleted" boolean NOT NULL DEFAULT false, "publishedAt" boolean NOT NULL DEFAULT true, "ownerId" uuid, "markId" integer, "modelId" integer, "fuelId" integer, "colorId" integer, "galleryId" integer, CONSTRAINT "REL_ca9289562d84b0ba1ce83dd87a" UNIQUE ("galleryId"), CONSTRAINT "PK_02a142330ce2fa63d84bd13bee4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, "phone" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "admin" boolean NOT NULL DEFAULT false, "addressId" integer, CONSTRAINT "REL_217ba147c5de6c107f2fa7fa27" UNIQUE ("addressId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_35fc62e079e0947cf6577868546" FOREIGN KEY ("announceId") REFERENCES "announce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announce" ADD CONSTRAINT "FK_1caf1639dc4e529ce42503448e5" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announce" ADD CONSTRAINT "FK_e36a1df16b0cd062d4c7762d071" FOREIGN KEY ("markId") REFERENCES "mark"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announce" ADD CONSTRAINT "FK_86daff4789191d884c97d1c9730" FOREIGN KEY ("modelId") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announce" ADD CONSTRAINT "FK_9034304e09295936755baa9b286" FOREIGN KEY ("fuelId") REFERENCES "fuel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announce" ADD CONSTRAINT "FK_d15a20545f3f1dde646da1a8118" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announce" ADD CONSTRAINT "FK_ca9289562d84b0ba1ce83dd87ac" FOREIGN KEY ("galleryId") REFERENCES "gallery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "announce" DROP CONSTRAINT "FK_ca9289562d84b0ba1ce83dd87ac"`);
        await queryRunner.query(`ALTER TABLE "announce" DROP CONSTRAINT "FK_d15a20545f3f1dde646da1a8118"`);
        await queryRunner.query(`ALTER TABLE "announce" DROP CONSTRAINT "FK_9034304e09295936755baa9b286"`);
        await queryRunner.query(`ALTER TABLE "announce" DROP CONSTRAINT "FK_86daff4789191d884c97d1c9730"`);
        await queryRunner.query(`ALTER TABLE "announce" DROP CONSTRAINT "FK_e36a1df16b0cd062d4c7762d071"`);
        await queryRunner.query(`ALTER TABLE "announce" DROP CONSTRAINT "FK_1caf1639dc4e529ce42503448e5"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_35fc62e079e0947cf6577868546"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "announce"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "gallery"`);
        await queryRunner.query(`DROP TABLE "color"`);
        await queryRunner.query(`DROP TABLE "fuel"`);
        await queryRunner.query(`DROP TABLE "model"`);
        await queryRunner.query(`DROP TABLE "mark"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
