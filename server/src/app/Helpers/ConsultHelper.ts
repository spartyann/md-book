import { AppBase } from "../AppBase";
import { ApiException } from "../Exceptions/ApiException";
import { AppException } from "../Exceptions/AppException";

export class ConsultHelper extends AppBase {

	public async list(clientId: number): Promise<any>
	{
		if (clientId == null) throw new AppException('No Client given');

		let res = await this.queryRunner.query("SELECT * FROM consult WHERE clientId = ?", [ clientId ]);
		
		return res;
	}


	public async get(id: number): Promise<any>
	{
		let res = await this.queryRunner.query("SELECT * FROM consult WHERE id = ?", [ id ]);
		if (res.length != 1) return null;
		return res[0];
	}


	async create(clientId: number, date: string)
	{
		const client = await this.ClientHelper.get(clientId);

		if (client == null) throw new ApiException("Client not found");

		let sql = 'INSERT INTO consult(userId, clientId, date) VALUES (?,?,?)';

		let res = await this.queryRunner.query(sql, [
			client.user_id, clientId, date
		]);

		res = await this.queryRunner.query('SELECT LAST_INSERT_ID() as id');

		return res[0].id;
	}


}
