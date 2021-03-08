import {MigrationInterface, QueryRunner} from "typeorm";

export class Mig11615233728078 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query(`ALTER TABLE clients 
			CHANGE COLUMN name name varchar(200) NOT NULL DEFAULT '',
            CHANGE COLUMN first_name first_name varchar(100) NOT NULL DEFAULT '',
            CHANGE COLUMN last_name last_name varchar(100) NOT NULL DEFAULT '',
			CHANGE COLUMN email email varchar(100) NOT NULL DEFAULT '',
            CHANGE COLUMN comment comment longtext NOT NULL DEFAULT ''
        `);

		await queryRunner.query(`ALTER TABLE consults
			CHANGE COLUMN pre_consult pre_consult longtext NOT NULL DEFAULT '',
            CHANGE COLUMN report report longtext NOT NULL DEFAULT '',
            CHANGE COLUMN report_client report_client longtext NOT NULL DEFAULT '',
            CHANGE COLUMN report_client_post_consult report_client_post_consult mediumtext NOT NULL DEFAULT ''
        `);

		await queryRunner.query(`ALTER TABLE users
			CHANGE COLUMN name name varchar(200) NOT NULL DEFAULT '',
			CHANGE COLUMN first_name first_name varchar(100) NOT NULL DEFAULT '',
			CHANGE COLUMN last_name last_name varchar(100) NOT NULL DEFAULT '',
			CHANGE COLUMN image image mediumblob NULL DEFAULT ''
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
