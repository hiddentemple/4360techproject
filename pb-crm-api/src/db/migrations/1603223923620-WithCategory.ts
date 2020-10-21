import {MigrationInterface, QueryRunner} from "typeorm";

export class WithCategory1603223923620 implements MigrationInterface {
    name = 'WithCategory1603223923620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emails" RENAME COLUMN "type" TO "categoryId"`);
        await queryRunner.query(`CREATE TYPE "category_code_enum" AS ENUM('PRMY', 'USER')`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" "category_code_enum" NOT NULL, "description" character varying(25) NOT NULL, CONSTRAINT "UQ_7b7115fda47b20b277b8ca6f89f" UNIQUE ("description"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "phones" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "phones" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "phones" ADD "phoneNumber" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "phones" ADD "categoryId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "emails" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "emails" ADD "categoryId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "firstName" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "lastName" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "company"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "company" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "notes" text`);
        await queryRunner.query(`ALTER TABLE "emails" ADD CONSTRAINT "FK_35c14e58efad07c643cf8799291" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phones" ADD CONSTRAINT "FK_1c6587944d8f3f2a4fa6a878b3d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phones" DROP CONSTRAINT "FK_1c6587944d8f3f2a4fa6a878b3d"`);
        await queryRunner.query(`ALTER TABLE "emails" DROP CONSTRAINT "FK_35c14e58efad07c643cf8799291"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "notes" character varying`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "company"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "company" character varying`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "emails" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "emails" ADD "categoryId" character varying`);
        await queryRunner.query(`ALTER TABLE "phones" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "phones" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "phones" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "phones" ADD "number" numeric NOT NULL`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TYPE "category_code_enum"`);
        await queryRunner.query(`ALTER TABLE "emails" RENAME COLUMN "categoryId" TO "type"`);
    }

}
