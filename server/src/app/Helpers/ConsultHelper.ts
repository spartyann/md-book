import { AppBase } from "../AppBase";
import { ApiException } from "../Exceptions/ApiException";
import { AppException } from "../Exceptions/AppException";

export class ConsultHelper extends AppBase {

	public async list(clientId: Number): Promise<any>
	{
		if (clientId == null) throw new AppException('No Client given');

		let res = await this.queryRunner.query("SELECT * FROM consults WHERE client_id = ?", [ clientId ]);
		
		return res;
	}


	public async get(id: Number): Promise<any>
	{
		let res = await this.queryRunner.query("SELECT * FROM consults WHERE id = ?", [ id ]);
		if (res.length != 1) return null;
		return res[0];
	}


	async create(clientId: Number, date: string)
	{
		const client = await this.ClientHelper.get(clientId);

		if (client == null) throw new ApiException("Client not found");

		let sql = 'INSERT INTO consults(user_id, client_id, date) VALUES (?,?,?)';

		let res = await this.queryRunner.query(sql, [
			client.user_id, clientId, date
		]);

		res = await this.queryRunner.query('SELECT LAST_INSERT_ID() as id');

		return res[0].id;
	}


}
