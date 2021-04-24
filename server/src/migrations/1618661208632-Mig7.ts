import {MigrationInterface, QueryRunner} from "typeorm";

export class Mig71618661208632 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query(`ALTER TABLE client
			ADD COLUMN anonymitySensitive tinyint(1) NOT NULL DEFAULT 0
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
