import { ClientCreate } from "src/http/api/Schemas";
import { AppBase } from "../AppBase";
import { AppException } from "../Exceptions/AppException";

export class ClientHelper extends AppBase {

	public async list(userId: number): Promise<any>
	{
		// User logged ?
		if (userId == null) userId = this.session.userId;

		if (userId == null) throw new AppException('No user given');

		let res = await this.app.clientRepository.query("SELECT * FROM client WHERE userId = ?", [ userId ]);

		return res;
	}


	public async get(clientId: number): Promise<any>
	{
		return await this.app.clientRepository.findOne(clientId);
	}


	async create(client: ClientCreate)
	{
		const name = client.firstName + " " + client.lastName;

		let sql = 'INSERT INTO client(name, firstName, lastName, userId) VALUES (?,?,?,?)';

		let res = await this.queryRunner.query(sql, [
			name, client.firstName, client.lastName, this.session.userId
		]);

		res = await this.queryRunner.query('SELECT LAST_INSERT_ID() as id');

		return res[0].id;
	}

	async update(id: number, name: string, firstName: string, lastName: string, email: string, comment: string)
	{
		let values = [];
		let strings = [];

		if (name !== null) { values.push("name = ?"); strings.push(name); }
		if (firstName !== null) { values.push("firstName = ?"); strings.push(firstName); }
		if (lastName !== null) { values.push("lastName = ?"); strings.push(lastName); }
		if (email !== null) { values.push("email = ?"); strings.push(email); }
		if (comment !== null) { values.push("comment = ?"); strings.push(comment); }
		
		if (values.length == 0) return;

		
		let sql = 'UPDATE client SET ' + values.join(',') + " WHERE id = " + id;

		await this.queryRunner.query(sql, strings);

	}

}
