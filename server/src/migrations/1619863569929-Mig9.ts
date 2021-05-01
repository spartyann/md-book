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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
