import {MigrationInterface, QueryRunner} from "typeorm";

export class ApiV1_3_2_1607023633197 implements MigrationInterface {
    name = 'ApiV1.3.21607023633197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "method" character varying(255) NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "biller" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "mobilePhone" character varying, "businessPhone" character varying, "fax" character varying, "email" character varying, "invoiceFooter" character varying(255), "notes" character varying(255), "active" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "addressId" uuid, "paymentInfoId" uuid, CONSTRAINT "REL_1a9942b186aa19f5c7d531f4f1" UNIQUE ("addressId"), CONSTRAINT "REL_f9daf5f6f104073a0643173d57" UNIQUE ("paymentInfoId"), CONSTRAINT "PK_2081806a811418e6e53fa9190a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "attn" character varying(255), "mobilePhone" character varying, "businessPhone" character varying, "fax" character varying, "email" character varying, "webpage" character varying, "salesTech" character varying(255), "notes" character varying(255), "active" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "addressId" uuid, CONSTRAINT "REL_9a1ba71f8651412e2003cfa46d" UNIQUE ("addressId"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lineItems" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "quantity" integer NOT NULL, "itemCategory" character varying(255) NOT NULL, "description" character varying(255), "unitPrice" numeric NOT NULL, "totalPrice" numeric NOT NULL, "warranty" character varying(255), "invoiceId" uuid, CONSTRAINT "PK_6ed50824a9335e70c7f6ac53fe5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" character varying NOT NULL, "invoiceNumber" character varying(255) NOT NULL, "technician" character varying(255), "notes" character varying(255), "subTotal" numeric, "tax" numeric, "total" numeric, "amountOwed" numeric, "amountPaid" numeric, "paidInFull" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying(255), "updatedAt" TIMESTAMP DEFAULT now(), "updatedBy" character varying(255), "billerId" uuid, "customerId" uuid, "accountId" uuid, CONSTRAINT "REL_7183d20517c2c62817f150ca19" UNIQUE ("billerId"), CONSTRAINT "REL_1df049f8943c6be0c1115541ef" UNIQUE ("customerId"), CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "acctNumber" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "notes" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "paymentInfoId" uuid, CONSTRAINT "REL_95ed8958bf98ecdaf31328e5ab" UNIQUE ("paymentInfoId"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "firstName" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "lastName" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "nickName"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "nickName" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "organization"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "organization" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "relatedName"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "relatedName" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "jobTitle"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "jobTitle" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "department"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "department" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "company"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "company" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "birthday" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "anniversary"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "anniversary" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "gender" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "tags" character varying(255) array`);
        await queryRunner.query(`ALTER TABLE "biller" ADD CONSTRAINT "FK_1a9942b186aa19f5c7d531f4f11" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "biller" ADD CONSTRAINT "FK_f9daf5f6f104073a0643173d571" FOREIGN KEY ("paymentInfoId") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_9a1ba71f8651412e2003cfa46d4" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lineItems" ADD CONSTRAINT "FK_0b6a400cec7c998b2dc28205761" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_7183d20517c2c62817f150ca19a" FOREIGN KEY ("billerId") REFERENCES "biller"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_1df049f8943c6be0c1115541efb" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_517b74001b457b209d95e4352e6" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_95ed8958bf98ecdaf31328e5ab1" FOREIGN KEY ("paymentInfoId") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_95ed8958bf98ecdaf31328e5ab1"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_517b74001b457b209d95e4352e6"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_1df049f8943c6be0c1115541efb"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_7183d20517c2c62817f150ca19a"`);
        await queryRunner.query(`ALTER TABLE "lineItems" DROP CONSTRAINT "FK_0b6a400cec7c998b2dc28205761"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_9a1ba71f8651412e2003cfa46d4"`);
        await queryRunner.query(`ALTER TABLE "biller" DROP CONSTRAINT "FK_f9daf5f6f104073a0643173d571"`);
        await queryRunner.query(`ALTER TABLE "biller" DROP CONSTRAINT "FK_1a9942b186aa19f5c7d531f4f11"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "tags" character varying array`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "gender" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "anniversary"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "anniversary" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "birthday" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "company"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "company" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "department"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "department" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "jobTitle"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "jobTitle" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "relatedName"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "relatedName" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "organization"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "organization" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "nickName"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "nickName" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "lastName" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "firstName" character varying(50) NOT NULL`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "invoices"`);
        await queryRunner.query(`DROP TABLE "lineItems"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "biller"`);
        await queryRunner.query(`DROP TABLE "payment"`);
    }

}
