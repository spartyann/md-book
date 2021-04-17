import {MigrationInterface, QueryRunner} from "typeorm";

export class Mig71618661208632 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query(`ALTER TABLE client
			ADD COLUMN anonymitySensitive tinyint(1) NOT NULL DEFAULT 0
        `);

		await queryRunner.query(`DROP TABLE wiki_page_cat`);
		await queryRunner.query(`DROP TABLE wiki_cat`);
		await queryRunner.query(`DROP TABLE wiki_page`);

		await queryRunner.query(`CREATE TABLE wiki_cat (
            id int(11) NOT NULL AUTO_INCREMENT,
			userId int(11) NOT NULL,
			parentId int(11) NULL DEFAULT NULL,
			ordering int(11) NOT NULL DEFAULT 0,
			name varchar(255) NOT NULL,
            PRIMARY KEY (id),
			
			INDEX idx_wiki_cat_parent(parentId),
            CONSTRAINT fk_wiki_cat_user FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

		await queryRunner.query(`ALTER TABLE wiki_cat
			ADD CONSTRAINT fk_wiki_cat_parent FOREIGN KEY (parentId) REFERENCES wiki_cat (id) ON DELETE CASCADE ON UPDATE CASCADE
		`);

		await queryRunner.query(`CREATE TABLE wiki_page (
            id int(11) NOT NULL AUTO_INCREMENT,
			userId int(11) NOT NULL,
			ordering int(11) NOT NULL DEFAULT 0,
			shareAlias varchar(40) NULL DEFAULT NULL,
			title text NOT NULL DEFAULT '',
			content longtext NOT NULL,
			image mediumblob NULL DEFAULT NULL,

            PRIMARY KEY (id),
            CONSTRAINT fk_wiki_page_user FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

		await queryRunner.query(`CREATE TABLE wiki_page_cat (
			pageId int(11) NOT NULL,
			catId int(11) NULL DEFAULT NULL,

            PRIMARY KEY (pageId, catId),
			INDEX idx_wiki_page_cat(catId, pageId),
			CONSTRAINT fk_wiki_page_cat_cat FOREIGN KEY (catId) REFERENCES wiki_cat (id) ON DELETE CASCADE ON UPDATE CASCADE,
			CONSTRAINT fk_wiki_page_cat_page FOREIGN KEY (pageId) REFERENCES wiki_page (id) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
