import { ConsultCreate, ConsultUpdate } from "src/http/api/Schemas";
import { AppBase } from "../AppBase";
import { ApiException } from "../Exceptions/ApiException";
import { AppException } from "../Exceptions/AppException";
import { Consult } from "../Models/Consult.entity";

export class ConsultHelper extends AppBase {

	public async list(clientId: number): Promise<Consult[]>
	{
		if (clientId == null) throw new AppException('No Client given');

		let res = await this.queryRunner.query("SELECT id, userId, clientId, date FROM consult WHERE clientId = ?", [ clientId ]);

		return res;
	}


	public async get(id: number): Promise<Consult>
	{
		return await this.queryRunner.manager.findOne(Consult, id);
	}

	async create(consult: ConsultCreate):  Promise<number>
	{
		const client = await this.ClientHelper.get(consult.clientId);

		if (client == null) throw new ApiException("Client not found");

		let sql = 'INSERT INTO consult(userId, clientId, date) VALUES (?,?,?)';

		let res = await this.queryRunner.query(sql, [
			client.userId, consult.clientId, consult.date
		]);

		res = await this.queryRunner.query('SELECT LAST_INSERT_ID() as id');

		return res[0].id;
	}

	async update(consultUpdate: ConsultUpdate)
	{
		let consult = await this.queryRunner.manager.findOne(Consult, consultUpdate.id);

		for (let field in consultUpdate)
		{
			let val = consultUpdate[field];
			if (val !== null) consult[field] = consultUpdate[field];
		}

		return await this.app.queryRunner.manager.save(consult);
	}

}
