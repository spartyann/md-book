import {MigrationInterface, QueryRunner} from "typeorm";
import * as bcrypt from 'bcrypt';

export class InitDb21614421578737 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query(`INSERT INTO sso_providers VALUES(?,?,?,?,?,?,?,?,?,?)`, [
			1, 'google', 0, 'oauth2', 'google',
			JSON.stringify({
				"scope": [
				  "https://www.googleapis.com/auth/userinfo.email",
				  "https://www.googleapis.com/auth/userinfo.profile"
				]
			}, null, 4),
			JSON.stringify({
				"clientId": "<FILL>",
				"clientSecret": "<FILL>"
			}, null, 4),
			JSON.stringify({}, null, 4),
			JSON.stringify({
				"id": "sub",
				"firstName": "given_name",
				"lastName": "family_name",
				"email": "email",
				"pictureUrl": "picture",
				"publicProfileUrl": "profile",
				"emailVerified": "email_verified"
			}, null, 4),
			JSON.stringify({
				"text": "Google"
			}, null, 4),
		]);

	
		const email = 'admin@admin.fr';
		const pwd = await bcrypt.hash(email, 5);

		await queryRunner.query(`INSERT INTO users VALUES(?,?,?,?,?,?, NULL)`, [
			1, 'Admin', 'Admin', 'Admin', email, pwd
		]);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
