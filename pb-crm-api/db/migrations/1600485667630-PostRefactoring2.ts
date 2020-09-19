import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring21600485667630 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "passwordHash" TO "password"`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
