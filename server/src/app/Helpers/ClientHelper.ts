import { ClientCreate, ClientUpdate } from "src/http/api/Schemas";
import { AppBase } from "../AppBase";
import { AppException } from "../Exceptions/AppException";
import { Client } from "../Models/Client.entity";

export class ClientHelper extends AppBase {

	public async list(userId: number): Promise<any>
	{
		// User logged ?
		if (userId == null) userId = this.session.userId;

		if (userId == null) throw new AppException('No user given');

		let res = await this.queryRunner.query("SELECT * FROM client WHERE userId = ?", [ userId ]);

		return res;
	}


	public async get(clientId: number): Promise<any>
	{
		return await this.queryRunner.manager.findOne(Client, clientId);
	}


	async create(client: ClientCreate)
	{
		const name = client.firstName + " " + client.lastName;

		const data = {
			enneagramme: {
				enneatype: 0,
				aile: 0,
				variante: '',
				comment: ''
			}
		};

		let sql = 'INSERT INTO client(name, firstName, lastName, gender, userId, data) VALUES (?,?,?,?,?,?)';

		let res = await this.queryRunner.query(sql, [
			name, client.firstName, client.lastName, client.gender, this.session.userId, JSON.stringify(data)
		]);

		res = await this.queryRunner.query('SELECT LAST_INSERT_ID() as id');

		return res[0].id;
	}

	async update(clientUpdate: ClientUpdate)
	{
		let client = await this.queryRunner.manager.findOne(Client, clientUpdate.id);

		for (let field in clientUpdate)
		{
			let val = clientUpdate[field];
			if (val !== null) client[field] = clientUpdate[field];
		}

		return await this.app.queryRunner.manager.save(client);
	}

}
