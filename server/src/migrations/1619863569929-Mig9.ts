import {MigrationInterface, QueryRunner} from "typeorm";
let generator = require('generate-password');

export class Mig91619863569929 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

		let pages = await queryRunner.query(`SELECT id FROM wiki_page`);

		let pwds = generator.generateMultiple(pages.length + 2, {
			length: 20,
			uppercase: false,
			numbers: true,
			excludeSimilarCharacters: true
		});

		for (let i in pages)
		{
			let page = pages[i];

			await queryRunner.query(`UPDATE wiki_page SET shareAlias = ? WHERE id = ` + page.id, [ pwds[i] ]);
		}
		
		await queryRunner.query(`ALTER TABLE wiki_page ADD UNIQUE KEY idx_wiki_page_share_alias(shareAlias)`);

		await queryRunner.query(`ALTER TABLE user ADD UNIQUE KEY idx_user_email(email)`);

		await queryRunner.query(`CREATE TABLE configuration (
			name varchar(50) NOT NULL,
			value longtext NOT NULL,
			comment longtext NOT NULL,
            PRIMARY KEY (name)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

		await queryRunner.query(`INSERT INTO configuration(name, value, comment) VALUES
			('registration_enabled', 'false', 'Inscription activée')`);

		await queryRunner.query(`INSERT INTO configuration(name, value, comment) VALUES
			('registration_codes', '[]', "Codes d'invitation pour les inscriptions")`);

		await queryRunner.query(`CREATE TABLE recovery (
            id int(11) NOT NULL AUTO_INCREMENT,
			object varchar(200) NOT NULL,
			date datetime NOT NULL DEFAULT current_timestamp(),
			data longtext NOT NULL,
			PRIMARY KEY (id),
			INDEX idx_recovery_object(object, id),
			INDEX idx_recovery_object2(object, date),
			INDEX idx_recovery_date(date)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
