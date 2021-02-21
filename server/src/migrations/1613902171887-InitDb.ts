import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDb1613902171887 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		
		// npx typeorm migration:create -n InitDb -d src/migrations

		// TODO
		// User
		// Office
		// ACLS

		await queryRunner.query("CREATE TABLE clients (\
            id int(11) NOT NULL AUTO_INCREMENT,\
            full_name varchar(200) NOT NULL,\
            first_namme varchar(100) NOT NULL,\
            last_name varchar(100) NOT NULL,\
            comment longtext NOT NULL,\
            PRIMARY KEY (id)\
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8");

		
		await queryRunner.query("CREATE TABLE md_sessions (\
            id int(11) NOT NULL AUTO_INCREMENT,\
            client_id int(11) NOT NULL,\
            date datetime NOT NULL DEFAULT current_timestamp(),\
            pre_session longtext NOT NULL,\
            report longtext NOT NULL,\
            report_client longtext NOT NULL,\
            report_client_post_session mediumtext NOT NULL,\
            PRIMARY KEY (id),\
            CONSTRAINT fk_client FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE ON UPDATE CASCADE\
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8");

		await queryRunner.query("CREATE TABLE dico (\
            id int(11) NOT NULL AUTO_INCREMENT,\
            ortho varchar(30) NOT NULL,\
            lemme varchar(30) NOT NULL,\
            cgram varchar(3) NOT NULL,\
            cgram2 varchar(3) NOT NULL,\
            genre varchar(1) NOT NULL,\
            nombre varchar(1) NOT NULL,\
            infos text NULL,\
            PRIMARY KEY (id),\
            INDEX idx_dico_ortho(ortho, cgram, cgram2),\
            INDEX idx_dico_lemme(lemme),\
            INDEX idx_dico_cgram(cgram, cgram2, ortho),\
            INDEX idx_dico_cgram_l(cgram, cgram2, lemme)\
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8");

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
