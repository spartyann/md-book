import { AppBase } from "../AppBase";
import { AppException } from "../Exceptions/AppException";

export class ClientHelper extends AppBase {

	public async list(userId: Number): Promise<any>
	{
		// User logged ?
		if (userId == null) userId = this.session.userId;

		if (userId == null) throw new AppException('No user given');

		let res = await this.queryRunner.query("SELECT * FROM clients WHERE user_id = ?", [ userId ]);
		
		return res;
	}


	public async get(clientId: Number): Promise<any>
	{
		let res = await this.queryRunner.query("SELECT * FROM clients WHERE id = ?", [ clientId ]);
		if (res.length != 1) return null;
		return res[0];
	}


	async create(name: string, firstName: string, lastName: string)
	{
		let sql = 'INSERT INTO clients(name, first_name, last_name, user_id) VALUES (?,?,?,?) RETURNING id';

		let res = await this.queryRunner.query(sql, [
			name, firstName, lastName, this.session.userId
		]);

		return res[0].id;
	}

	async update(id: Number, name: string, firstName: string, lastName: string, email: string, comment: string)
	{

		let values = [];
		let strings = [];

		if (name !== null) { values.push("name = ?"); strings.push(name); }
		if (firstName !== null) { values.push("first_name = ?"); strings.push(firstName); }
		if (lastName !== null) { values.push("last_name = ?"); strings.push(lastName); }
		if (email !== null) { values.push("email = ?"); strings.push(email); }
		if (comment !== null) { values.push("comment = ?"); strings.push(comment); }
		
		if (values.length == 0) return;

		let sql = 'UPDATE clients SET ' + values.join(',') + " WHERE id = " + id;

		await this.queryRunner.query(sql, strings);

	}

}
