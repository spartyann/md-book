import {MigrationInterface, QueryRunner} from "typeorm";

export class Mig21615634916236 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


		await queryRunner.query(`ALTER TABLE clients
			DROP FOREIGN KEY fk_clients_user
		`);

		await queryRunner.query(`ALTER TABLE clients
			CHANGE COLUMN user_id userId int(11) NOT NULL,
			CHANGE COLUMN name name varchar(200) NOT NULL DEFAULT '',
            CHANGE COLUMN first_name firstName varchar(100) NOT NULL DEFAULT '',
            CHANGE COLUMN last_name lastName varchar(100) NOT NULL DEFAULT '',
			CHANGE COLUMN email email varchar(100) NOT NULL DEFAULT '',
            CHANGE COLUMN comment comment longtext NOT NULL DEFAULT '',
			ADD COLUMN country varchar(200) NOT NULL DEFAULT '' AFTER comment,
			ADD COLUMN city varchar(10) NOT NULL DEFAULT '' AFTER comment,
			ADD COLUMN cp varchar(10) NOT NULL DEFAULT '' AFTER comment,
			ADD COLUMN address varchar(200) NOT NULL DEFAULT '' AFTER comment,
			ADD COLUMN phone varchar(30) NOT NULL DEFAULT '' AFTER comment,
			ADD COLUMN mobilePhone varchar(30) NOT NULL DEFAULT '' AFTER comment
        `);

		await queryRunner.query(`ALTER TABLE clients
            ADD CONSTRAINT fk_clients_user FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
        `);

		await queryRunner.query(`ALTER TABLE consults
			DROP FOREIGN KEY fk_consults_user,
			DROP FOREIGN KEY fk_consults_client
        `);
		
		await queryRunner.query(`ALTER TABLE consults
			CHANGE COLUMN user_id userId int(11) NOT NULL,
			CHANGE COLUMN client_id clientId int(11) NOT NULL,
			CHANGE COLUMN pre_consult preConsult longtext NOT NULL DEFAULT '',
			ADD COLUMN hypothesis longtext NOT NULL DEFAULT '' AFTER preConsult,
            CHANGE COLUMN report report longtext NOT NULL DEFAULT '',
            CHANGE COLUMN report_client reportClient longtext NOT NULL DEFAULT '',
            CHANGE COLUMN report_client_post_consult reportClientPostConsult longtext NOT NULL DEFAULT '',
			ADD COLUMN data longtext NOT NULL DEFAULT ''
        `);

		await queryRunner.query(`ALTER TABLE consults
			ADD CONSTRAINT fk_consults_user FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
			ADD CONSTRAINT fk_consults_client FOREIGN KEY (clientId) REFERENCES clients (id) ON DELETE CASCADE ON UPDATE CASCADE
        `);

		await queryRunner.query(`ALTER TABLE users
			CHANGE COLUMN name name varchar(200) NOT NULL DEFAULT '',
			CHANGE COLUMN first_name firstName varchar(100) NOT NULL DEFAULT '',
			CHANGE COLUMN last_name lastName varchar(100) NOT NULL DEFAULT '',
			CHANGE COLUMN image image mediumblob NULL DEFAULT ''
        `);

		await queryRunner.query(`RENAME TABLE clients TO client`);
		await queryRunner.query(`RENAME TABLE users TO user`);
		await queryRunner.query(`RENAME TABLE consults TO consult`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
