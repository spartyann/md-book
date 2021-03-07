import { AppBase } from "../AppBase";
import { AppException } from "../Exceptions/AppException";

export class ConsultHelper extends AppBase {

	public async list(clientId: Number): Promise<any>
	{
		if (clientId == null) throw new AppException('No Client given');

		let res = await this.queryRunner.query("SELECT * FROM consults WHERE client_id = ?", [ clientId ]);
		
		return res;
	}

}
