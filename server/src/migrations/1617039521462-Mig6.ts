import {MigrationInterface, QueryRunner} from "typeorm";

export class Mig61617039521462 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query(`UPDATE consult 
			SET data = JSON_SET(data, '$.mtc.poul.regularite', JSON_EXTRACT(data, '$.mtc.poul.gauche.regularite'))
		`);

		await queryRunner.query(`UPDATE consult 
			SET data = JSON_REMOVE(JSON_REMOVE(data, '$.mtc.poul.droit.regularite'), '$.mtc.poul.gauche.regularite')
		`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
