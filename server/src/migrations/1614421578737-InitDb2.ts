import {MigrationInterface, QueryRunner} from "typeorm";
import * as bcrypt from 'bcrypt';

export class InitDb21614421578737 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
	
		const email = 'admin@admin.fr';
		const pwd = await bcrypt.hash(email, 5);

		await queryRunner.query(`INSERT INTO users VALUES(?,?,?,?,?,?, NULL)`, [
			1, 'Admin', 'Admin', 'Admin', email, pwd
		]);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
