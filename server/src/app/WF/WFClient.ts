import { ClientCreate } from "src/http/api/Schemas";
import { AppBase } from "../AppBase";
import { AccessDeniedException } from "../Exceptions/AccessDeniedException";
import { ApiException } from "../Exceptions/ApiException";
import { UserException } from "../Exceptions/UserException";
const sanitizeHtml = require('sanitize-html');

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

		if (client.userId != this.session.userId) throw new AccessDeniedException();

		return client;
	}


	async create(client: ClientCreate)
	{
		// User logged ?
		if (this.session.userId == null) throw new AccessDeniedException();

		// Check length
		if (client.firstName.length < 1 || client.lastName.length < 1) throw new UserException("Veuillez indiquer un nom et un prénom.");

		// Update User
		const id = await this.ClientHelper.create(client);

		// Return user
		return await this.ClientHelper.get(id);
	}

	async update(id: number, name: string, firstName: string, lastName: string, email: string, comment: string)
	{
		// User logged ?
		if (this.session.userId == null) throw new AccessDeniedException();

		// Update User
		const client = await this.ClientHelper.get(id);

		// Acl
		if (client.userId != this.session.userId) throw new AccessDeniedException();

		// Check length
		if (firstName.length < 1 || lastName.length < 1 || name.length < 1) throw new UserException("Veuillez indiquer un nom et un prénom.");

		// Sanitize comment
		comment = sanitizeHtml(comment);

		// Update
		await this.ClientHelper.update(id, name, firstName, lastName, email, comment);

		// Retur client
		return await this.ClientHelper.get(id);
	}

	

}
