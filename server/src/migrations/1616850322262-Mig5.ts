import {MigrationInterface, QueryRunner} from "typeorm";

export class Mig51616850322262 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query(`CREATE TABLE wiki_cat (
            id int(11) NOT NULL AUTO_INCREMENT,
			user_id int(11) NOT NULL,
			parent_id int(11) NULL DEFAULT NULL,
			name varchar(255) NOT NULL,
            PRIMARY KEY (id),
			INDEX idx_wiki_cat_parent(parent_id),
            CONSTRAINT fk_wiki_cat_user FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

		await queryRunner.query(`ALTER TABLE wiki_cat
			ADD CONSTRAINT fk_wiki_cat_parent FOREIGN KEY (parent_id) REFERENCES wiki_cat (id) ON DELETE CASCADE ON UPDATE CASCADE
		`);

		await queryRunner.query(`CREATE TABLE wiki_page (
            id int(11) NOT NULL AUTO_INCREMENT,
			user_id int(11) NOT NULL,
			content longtext NOT NULL,
			image mediumblob NULL DEFAULT NULL,
            PRIMARY KEY (id),
            CONSTRAINT fk_wiki_page_user FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

		await queryRunner.query(`CREATE TABLE wiki_page_cat (
			page_id int(11) NOT NULL,
			cat_id int(11) NULL DEFAULT NULL,
            PRIMARY KEY (page_id, cat_id),
			INDEX idx_wiki_page_cat(cat_id, page_id),
			CONSTRAINT fk_wiki_page_cat_cat FOREIGN KEY (cat_id) REFERENCES wiki_cat (id) ON DELETE CASCADE ON UPDATE CASCADE,
			CONSTRAINT fk_wiki_page_cat_page FOREIGN KEY (page_id) REFERENCES wiki_page (id) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

		await queryRunner.query(`ALTER TABLE client
			ADD COLUMN gender varchar(1) NOT NULL DEFAULT 'o' AFTER lastName,
			ADD COLUMN birthday datetime NULL DEFAULT NULL AFTER lastName
		`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
