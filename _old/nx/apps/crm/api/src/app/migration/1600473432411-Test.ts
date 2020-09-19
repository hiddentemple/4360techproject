import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1600473432411 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "passwordHash" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
