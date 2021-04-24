import { WikiPageCreate, WikiPageUpdate } from "src/http/api/Schemas";
import { AppBase } from "../AppBase";
import { AppException } from "../Exceptions/AppException";
import { UserException } from "../Exceptions/UserException";
import { WikiPage } from "../Models/WikiPage.entity";

export class WikiHelper extends AppBase {

	public async listAll(userId: number): Promise<any>
	{
		// User logged ?
		if (userId == null) userId = this.session.userId;

		if (userId == null) throw new AppException('No user given');
		
		const pages: any = await this.findIndexedById(WikiPage, 
			{ select: ["id", "ordering", "parentId", "title", "subTitle", "summary", "keyWords", "shareAlias"],
			where: { userId },
		});
		
		let tree = [];

		//
		// Tree
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

			parent.children.sort(function(pa, pb) {
				if (pa.ordering < pb.ordering) return -1;
				if (pa.ordering > pb.ordering) return 1;
				return 0;
			});
	
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

		tree.sort(function(pa, pb) {
			if (pa.ordering < pb.ordering) return -1;
			if (pa.ordering > pb.ordering) return 1;
			return 0;
		});

		// 4 Sort
		let orderedPageIds = Object.keys(pages);
		orderedPageIds.sort(function(a, b) {
			let pa = pages[a];
			let pb = pages[b];
			if (pa.ordering < pb.ordering) return -1;
			if (pa.ordering > pb.ordering) return 1;
			return 0;
		});

		return {
			tree: tree,
			pages: pages,
			orderedPageIds: orderedPageIds
		};
	}


	async getPage(id: number): Promise<WikiPage>
	{
		return await this.queryRunner.manager.findOne(WikiPage, id);
	}
	
	async update(pageUpdate: WikiPageUpdate)
	{
		let page = await this.queryRunner.manager.findOne(WikiPage, pageUpdate.id);

		for (let field in pageUpdate)
		{
			let val = pageUpdate[field];
			if (val !== undefined) page[field] = pageUpdate[field];
		}

		// Check parent
		if (page.id == page.parentId) throw new UserException("La page ne peut pas être parente d'elle même");

		let pages = await this.queryIndexedById("SELECT id, parentId FROM wiki_page WHERE userId = ?", [page.userId]);
		let countTraversed = 0;
		let rootFound = false;
		let current = page;
		const max = Object.keys(pages).length;

		// Update new !
		pages[page.parentId.toString()].parentId = page.parentId;

		while(countTraversed < max)
		{
			countTraversed++;
			if (current.parentId == null) { rootFound = true; break; }
			current = pages[current.parentId.toString()];
		}
		if (rootFound == false) throw new UserException("Erreur de hiérarchie. Un enfant ne peut pas être son propre parent.");


		return await this.app.queryRunner.manager.save(page);
	}

	async create(pageCreate: WikiPageCreate)
	{
		const content = {
			text: '',
			media_links: [],
		};

		const keyWords = [];

		let sql = 'INSERT INTO wiki_page(userId, title, parentId, keyWords, content) VALUES (?,?,?,?,?)';

		let res = await this.queryRunner.query(sql, [
			this.session.userId, pageCreate.title, pageCreate.parentId, JSON.stringify(keyWords), JSON.stringify(content)
		]);

		res = await this.queryRunner.query('SELECT LAST_INSERT_ID() as id');

		return res[0].id;
	}
}
