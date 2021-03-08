import { AppBase } from "../AppBase";
import { AccessDeniedException } from "../Exceptions/AccessDeniedException";
import { ApiException } from "../Exceptions/ApiException";

export class WFClient extends AppBase {

	async list()
	{
		// User logged ?
		if (this.session.userId == null) throw new AccessDeniedException();;

		return this.ClientHelper.list(this.session.userId);
	}


	async get(id)
	{
		// User logged ?
		if (this.session.userId == null) throw new AccessDeniedException();;

		// ACL
		let client = await this.ClientHelper.get(id);
		
		if (client == null) throw new ApiException("Client not found");

		if (client.user_id != this.session.userId) throw new AccessDeniedException();

		return client;
	}


	async create(firstName: string, lastName: string)
	{
		// User logged ?
		if (this.session.userId == null) throw new AccessDeniedException();

		let name = firstName + " " + lastName;

		// Update User
		const id = await this.ClientHelper.create(name, firstName, lastName);

		// Return user
		return await this.ClientHelper.get(id);
	}

}
