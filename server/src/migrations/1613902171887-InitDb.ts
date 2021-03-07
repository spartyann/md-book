import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDb1613902171887 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		
		// npx typeorm migration:create -n InitDb -d src/migrations

		// TODO
		// User
		// Office
		// ACLS

		// USER
		await queryRunner.query(`CREATE TABLE users (
            id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(200) NOT NULL,
            first_name varchar(100) NOT NULL,
            last_name varchar(100) NOT NULL,
			email varchar(100) NOT NULL,
			password varchar(100) NOT NULL,
			image mediumblob NULL,
            PRIMARY KEY (id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);


		// SSO
		await queryRunner.query(`CREATE TABLE sso_providers (
			id int(11) unsigned NOT NULL AUTO_INCREMENT,
			name varchar(100) NOT NULL,
			enabled tinyint(1) NOT NULL DEFAULT 1,
			type varchar(10) NOT NULL DEFAULT 'oauth2',
			provider varchar(100) NOT NULL,
			oauth2_authorization_options mediumtext NOT NULL,
			oauth2_provider_params mediumtext NOT NULL,
			saml2_settings mediumtext NOT NULL DEFAULT '{}',
			mapping_params mediumtext NOT NULL,
			params mediumtext NOT NULL,
			PRIMARY KEY (id),
			UNIQUE KEY idx_sso_providers_name (name)
			) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);


		await queryRunner.query(`CREATE TABLE sso_links (
			id int(11) unsigned NOT NULL AUTO_INCREMENT,
			user_id int(11) NOT NULL,
			sso_providers_id int(11) unsigned NOT NULL,
			last_response mediumtext NOT NULL,
			last_token mediumtext NOT NULL,
			last_expires varchar(100) NOT NULL,
			provider_internal_id varchar(200) NOT NULL,
			picture_url varchar(500) NOT NULL DEFAULT '',
			public_profile_url varchar(500) NOT NULL DEFAULT '',
			first_name varchar(200) NOT NULL DEFAULT '',
			last_name varchar(200) NOT NULL DEFAULT '',
			email varchar(200) NOT NULL DEFAULT '',
			created datetime NOT NULL DEFAULT current_timestamp(),
			modified datetime NOT NULL DEFAULT current_timestamp(),
			PRIMARY KEY (id),
			UNIQUE KEY idx_sso_links_account (sso_providers_id,provider_internal_id),
			KEY idx_sso_links_user (user_id),
			KEY idx_sso_links_provider (sso_providers_id),
			KEY idx_sso_links_provider_internal_id (provider_internal_id),
			KEY idx_sso_links_email (email),
			KEY idx_sso_links_created (created),
			KEY idx_sso_links_modified (modified),
			CONSTRAINT fk_sso_links_provider FOREIGN KEY (sso_providers_id) REFERENCES sso_providers (id) ON DELETE CASCADE ON UPDATE CASCADE,
			CONSTRAINT fk_sso_links_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
		  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);


		  
		await queryRunner.query(`CREATE TABLE clients (
            id int(11) NOT NULL AUTO_INCREMENT,
			user_id int(11) NOT NULL,
            name varchar(200) NOT NULL,
            first_name varchar(100) NOT NULL,
            last_name varchar(100) NOT NULL,
			email varchar(100) NOT NULL,
            comment longtext NOT NULL,
            PRIMARY KEY (id),
            CONSTRAINT fk_clients_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

		
		await queryRunner.query(`CREATE TABLE consults (
            id int(11) NOT NULL AUTO_INCREMENT,
			user_id int(11) NOT NULL,
            client_id int(11) NOT NULL,
            date datetime NOT NULL DEFAULT current_timestamp(),
            pre_consult longtext NOT NULL,
            report longtext NOT NULL,
            report_client longtext NOT NULL,
            report_client_post_consult mediumtext NOT NULL,
            PRIMARY KEY (id),
            CONSTRAINT fk_consults_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT fk_consults_client FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);



		await queryRunner.query(`CREATE TABLE dico (
            id int(11) NOT NULL AUTO_INCREMENT,
            ortho varchar(30) NOT NULL,
            lemme varchar(30) NOT NULL,
            cgram varchar(3) NOT NULL,
            cgram2 varchar(3) NOT NULL,
            genre varchar(1) NOT NULL,
            nombre varchar(1) NOT NULL,
            infos text NULL,
            PRIMARY KEY (id),
            INDEX idx_dico_ortho(ortho, cgram, cgram2),
            INDEX idx_dico_lemme(lemme),
            INDEX idx_dico_cgram(cgram, cgram2, ortho),
            INDEX idx_dico_cgram_l(cgram, cgram2, lemme)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

		  

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
