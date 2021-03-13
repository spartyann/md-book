import {MigrationInterface, QueryRunner} from "typeorm";

export class Mig31615636808961 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

		// SSO
		await queryRunner.query(`CREATE TABLE sso_provider (
			id int(11) unsigned NOT NULL AUTO_INCREMENT,
			name varchar(100) NOT NULL,
			enabled tinyint(1) NOT NULL DEFAULT 1,
			type varchar(10) NOT NULL DEFAULT 'oauth2',
			provider varchar(100) NOT NULL,
			oauth2AuthorizationOptions mediumtext NOT NULL,
			oauth2ProviderParams mediumtext NOT NULL,
			saml2Settings mediumtext NOT NULL DEFAULT '{}',
			mappingParams mediumtext NOT NULL,
			params mediumtext NOT NULL,
			PRIMARY KEY (id),
			UNIQUE KEY idx_sso_provider_name (name)
			) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);


		await queryRunner.query(`CREATE TABLE sso_link (
			id int(11) unsigned NOT NULL AUTO_INCREMENT,
			userId int(11) NOT NULL,
			ssoProviderId int(11) unsigned NOT NULL,
			lastResponse mediumtext NOT NULL,
			lastToken mediumtext NOT NULL,
			lastExpires varchar(100) NOT NULL,
			providerInternalId varchar(200) NOT NULL,
			pictureUrl varchar(500) NOT NULL DEFAULT '',
			publicProfileUrl varchar(500) NOT NULL DEFAULT '',
			firstName varchar(200) NOT NULL DEFAULT '',
			lastName varchar(200) NOT NULL DEFAULT '',
			email varchar(200) NOT NULL DEFAULT '',
			created datetime NOT NULL DEFAULT current_timestamp(),
			modified datetime NOT NULL DEFAULT current_timestamp(),
			PRIMARY KEY (id),
			UNIQUE KEY idx_sso_link_account (ssoProviderId, providerInternalId),
			KEY idx_sso_link_user (userId),
			KEY idx_sso_link_provider (ssoProviderId),
			KEY idx_sso_link_provider_internal_id (providerInternalId),
			KEY idx_sso_link_email (email),
			KEY idx_sso_link_created (created),
			KEY idx_sso_link_modified (modified),
			CONSTRAINT fk_sso_link_provider FOREIGN KEY (ssoProviderId) REFERENCES sso_provider(id) ON DELETE CASCADE ON UPDATE CASCADE,
			CONSTRAINT fk_sso_link_user FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
		  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

		  await queryRunner.query(`INSERT INTO sso_provider VALUES(?,?,?,?,?,?,?,?,?,?)`, [
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

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
