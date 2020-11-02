import {MigrationInterface, QueryRunner} from "typeorm";

export class ImportExportSchema1604284045589 implements MigrationInterface {
    name = 'ImportExportSchema1604284045589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "webpages_type_enum" AS ENUM('Personal', 'Business', 'Commerce')`);
        await queryRunner.query(`CREATE TABLE "webpages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "type" "webpages_type_enum" NOT NULL, "contactId" uuid, CONSTRAINT "PK_c6499e122b0aedc8c21ab814f77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "street2" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "postalCode" character varying NOT NULL, "country" character varying, "type" character varying NOT NULL, "contactId" uuid, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "nickName" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "countryCode" character varying(25)`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "relatedName" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "birthday" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "anniversary" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "tags" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "phones" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "phones" ADD "phoneNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "webpages" ADD CONSTRAINT "FK_2fa84abea06c690b2b7d38b69d8" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_4b3866faeb7c87d481e073fc7cd" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_4b3866faeb7c87d481e073fc7cd"`);
        await queryRunner.query(`ALTER TABLE "webpages" DROP CONSTRAINT "FK_2fa84abea06c690b2b7d38b69d8"`);
        await queryRunner.query(`ALTER TABLE "phones" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "phones" ADD "phoneNumber" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "anniversary"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "relatedName"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "countryCode"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "nickName"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "webpages"`);
        await queryRunner.query(`DROP TYPE "webpages_type_enum"`);
    }

}
