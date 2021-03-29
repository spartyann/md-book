import { ConsultCreate, ConsultUpdate } from "src/http/api/Schemas";
import { AppBase } from "../AppBase";
import { AccessDeniedException } from "../Exceptions/AccessDeniedException";
import { Consult } from "../Models/Consult.entity";
import { Sanitizer } from "../Tools/Sanitizer";

export class WFConsult extends AppBase {

	async list(clientId: number)
	{
		// User logged ?
		if (this.session.userId == null) throw new AccessDeniedException();;

		// ACL
		let client = await this.ClientHelper.get(clientId);

		if (client.userId != this.session.userId) throw new AccessDeniedException();

		return this.ConsultHelper.list(clientId);
	}

	async create(consult: ConsultCreate)
	{
		// User logged ?
		if (this.session.userId == null) throw new AccessDeniedException();

		// ACL
		let client = await this.ClientHelper.get(consult.clientId);

		if (client.userId != this.session.userId) throw new AccessDeniedException();

		// Update User
		const id = await this.ConsultHelper.create(consult);

		// Return Consult
		return await this.ConsultHelper.get(id);
	}


	public async get(id: number): Promise<Consult>
	{
		// Get consult
		const consult = await this.ConsultHelper.get(id);

		// ACL
		if (consult.userId != this.session.userId) throw new AccessDeniedException();

		// Return consult
		return consult;
	}


	async update(consultUpdate: ConsultUpdate)
	{
		// Get consult
		const consult = await this.ConsultHelper.get(consultUpdate.id);

		// ACL
		if (consult.userId != this.session.userId) throw new AccessDeniedException();

		// Sanitize html
		if (consultUpdate.preConsult != undefined) consultUpdate.preConsult = Sanitizer.clean(consultUpdate.preConsult);
		if (consultUpdate.hypothesis != undefined) consultUpdate.hypothesis = Sanitizer.clean(consultUpdate.hypothesis);
		if (consultUpdate.report != undefined) consultUpdate.report = Sanitizer.clean(consultUpdate.report);
		if (consultUpdate.reportClient != undefined) consultUpdate.reportClient = Sanitizer.clean(consultUpdate.reportClient);
		if (consultUpdate.reportClientPostConsult != undefined) consultUpdate.reportClientPostConsult = Sanitizer.clean(consultUpdate.reportClientPostConsult);

		//consultUpdate.data.langue.global.commentaire = Sanitizer.clean(consultUpdate.data.langue.global.commentaire);

		// Update
		return await this.ConsultHelper.update(consultUpdate);
	}


}
