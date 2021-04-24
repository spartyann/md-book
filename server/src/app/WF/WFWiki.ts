import { ClientCreate, ClientUpdate, WikiPageCreate, WikiPageUpdate } from "src/http/api/Schemas";
import { AppBase } from "../AppBase";
import { AccessDeniedException } from "../Exceptions/AccessDeniedException";
import { ApiException } from "../Exceptions/ApiException";
import { UserException } from "../Exceptions/UserException";
import { Sanitizer } from "../Tools/Sanitizer";

export class WFWiki extends AppBase {

	async list()
	{
		// User logged ?
		if (this.session.userId == null) throw new AccessDeniedException();

		return await this.WikiHelper.listAll(this.session.userId);
	}

	async getPage(id: number)
	{
		// User logged ?
		if (this.session.userId == null) throw new AccessDeniedException();

		const page = await this.WikiHelper.getPage(id);

		// ACL
		if (page == null || this.session.userId != page.userId) throw new AccessDeniedException();

		return page;
	}

	async update(pageUpdate: WikiPageUpdate)
	{
		// User logged ?
		if (this.session.userId == null) throw new AccessDeniedException();

		// Get Page
		const page = await this.WikiHelper.getPage(pageUpdate.id);

		// ACL
		if (page.userId != this.session.userId) throw new AccessDeniedException();

		// Sanitize html
		if (pageUpdate.content != undefined) pageUpdate.content.text = Sanitizer.clean(pageUpdate.content.text);

		// Update
		return await this.WikiHelper.update(pageUpdate);
	}
	
	async create(pageCreate: WikiPageCreate)
	{
		// User logged ?
		if (this.session.userId == null) throw new AccessDeniedException();

		// Update Page
		const id = await this.WikiHelper.create(pageCreate);

		// Return Page
		return await this.WikiHelper.getPage(id);
	}
	
}
