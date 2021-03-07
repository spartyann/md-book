import { AppBase } from "../AppBase";
import { AccessDeniedException } from "../Exceptions/AccessDeniedException";

export class WFConsult extends AppBase {

	async list(clientId: Number)
	{
		// User logged ?
		if (this.session.userId == null) throw new AccessDeniedException();;

		// ACL
		let client = await this.ClientHelper.get(clientId);

		if (client.user_id != this.session.userId) throw new AccessDeniedException();

		return this.ConsultHelper.list(clientId);
	}


}
