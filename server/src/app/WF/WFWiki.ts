import { ClientCreate, ClientUpdate } from "src/http/api/Schemas";
import { AppBase } from "../AppBase";
import { AccessDeniedException } from "../Exceptions/AccessDeniedException";
import { ApiException } from "../Exceptions/ApiException";
import { UserException } from "../Exceptions/UserException";
import { Sanitizer } from "../Tools/Sanitizer";

export class WFWiki extends AppBase {

	async list()
	{
		// User logged ?
		if (this.session.userId == null) throw new AccessDeniedException();;

		return this.WikiHelper.listAll(this.session.userId);
	}

	

}
