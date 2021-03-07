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

}
