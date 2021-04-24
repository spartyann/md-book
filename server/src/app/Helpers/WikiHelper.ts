import { wikiPageUpdate } from "src/http/api/Schemas";
import { AppBase } from "../AppBase";
import { AppException } from "../Exceptions/AppException";
import { WikiPage } from "../Models/WikiPage.entity";
import { ObjectTools } from "../Tools/ObjectTools";

export class WikiHelper extends AppBase {

	public async listAll(userId: number): Promise<any>
	{
		// User logged ?
		if (userId == null) userId = this.session.userId;

		if (userId == null) throw new AppException('No user given');
		
		const pages: any = await this.findIndexedById(WikiPage, { select: ["id", "parentId", "title", "subTitle", "summary", "keyWords", "shareAlias"], where: { userId } });
		
		let tree = [];

		//
		// Tre
		//

		// 1- Clone object
		let lightPages = { };
		for (let id in pages)
		{	
			let page: any = pages[id];
			page.fullNames = [ page.title ];

			// Clone
			lightPages[page.id.toString()] = { ...page };
		}

		// 2 Function Children build
		let fillChidren = function(parent: any): any {
			if (parent.children !== undefined) return parent; // Already done => cyclique
			parent.children = [];

			for (let id in lightPages)
			{
				let child = lightPages[id];
				
				if (child.parentId == parent.id)
				{
					let fullNames = [ ...parent.fullNames];
					fullNames.push(child.title);

					child.fullNames = fullNames;
					pages[child.id].fullNames = fullNames;

					child = fillChidren(child);
					parent.children.push(child);
				}
			}

			return parent;
		}

		// 3 Buils tree
		for (let id in lightPages)
		{	
			let page = lightPages[id];
			
			if (page.parentId == null)
			{
				page = fillChidren(page);
				tree.push(page);
			}
		}

		// 4 Sort


		return {
			tree: tree,
			pages: pages,
		};
	}


	async getPage(id: number): Promise<WikiPage>
	{
		return await this.queryRunner.manager.findOne(WikiPage, id);
	}
	
	async update(pageUpdate: wikiPageUpdate)
	{
		let page = await this.queryRunner.manager.findOne(WikiPage, pageUpdate.id);

		for (let field in pageUpdate)
		{
			let val = pageUpdate[field];
			if (val !== null && val !== undefined) page[field] = pageUpdate[field];
		}

		return await this.app.queryRunner.manager.save(page);
	}

}
