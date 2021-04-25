import {MigrationInterface, QueryRunner} from "typeorm";

export class Mig81619255155462 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query(`DROP TABLE IF EXISTS wiki_page_cat`);
		await queryRunner.query(`DROP TABLE IF EXISTS wiki_cat`);
		await queryRunner.query(`DROP TABLE IF EXISTS wiki_page`);

		await queryRunner.query(`CREATE TABLE wiki_page (
            id int(11) NOT NULL AUTO_INCREMENT,
			userId int(11) NOT NULL,
			parentId int(11) NULL DEFAULT NULL,
			ordering int(11) NOT NULL DEFAULT 0,
			shareAlias varchar(40) NULL DEFAULT NULL,
			title text NOT NULL DEFAULT '',
			subTitle text NOT NULL DEFAULT '',
			keyWords longtext NOT NULL DEFAULT '[]',
			summary text NOT NULL DEFAULT '',
			content longtext NOT NULL DEFAULT '',
			image longtext NULL DEFAULT NULL,

            PRIMARY KEY (id),
            CONSTRAINT fk_wiki_page_user FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
			CONSTRAINT fk_wiki_page_parent FOREIGN KEY (parentId) REFERENCES wiki_page (id) ON DELETE SET NULL ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
