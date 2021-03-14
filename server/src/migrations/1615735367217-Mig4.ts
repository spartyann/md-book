import {MigrationInterface, QueryRunner} from "typeorm";

export class Mig41615735367217 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

		const poulMain = {
			regularite: null,
			force: null,
			profondeur: null,
			diametre: null,
			tension: null,
			longueur: null,
			racine: null,
			glissant: null,
			rugueux: null,
			index: '',
			majeur: '',
			annulaire: ''
		}

		const langueZone = {
			humidite: null,
			couleur: null,
			enduit: null,
			enduitCouleur: null,
			pointsRouges: null
		}

		const data = {
			mtc: {
				poul: {
					vitesse: null,
					vitesseEval: null,
					commentaire: null,

					gauche: poulMain,
					droit: poulMain
				},
				langue: {
					global: {
						epaisseur: null,
						longueur: null,
						durete: null,
						indentee: null,
						humidite: null,
						couleur: null,
						enduit: null,
						enduitCouleur: null,
						pointsRouges: null,
						commentaire: null,
					},
					fissure: {
						profondeur: null,
						zones: {
							rein: null,
							rate: null,
							poumon: null,
							coeur: null,
						}
					},
					zones: {
						rein: langueZone,
						vb: langueZone,
						rate: langueZone,
						foie: langueZone,
						poumon: langueZone,
						coeur: langueZone,
					}

				}
			}
		};
		
		await queryRunner.query(`UPDATE consult SET data = ?`, [ JSON.stringify(data) ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
