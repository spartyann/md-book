import { WikiPageCreate, WikiPageUpdate } from "src/http/api/Schemas";
import { AppBase } from "../AppBase";
import { AppException } from "../Exceptions/AppException";
import { UserException } from "../Exceptions/UserException";
import { WikiPage } from "../Models/WikiPage.entity";
let generator = require('generate-password');

export class WikiHelper extends AppBase {


	/**
	 * Generate Tree of all wiki Pages of given user
	 * 
	 * @param userId 
	 */
	public async getTree(userId: Number): Promise<Array<any>>
	{
		// User given ?
		if (userId == null) throw new AppException('No user given');

		const pages: any = await this.findIndexedById(WikiPage, 
			{ select: ["id", "ordering", "parentId"],
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

			// Clone
			lightPages[page.id.toString()] = { 
				id: page.id,
			};
		}

		// 2 Function Children build
		let fillChidren = function(parent: any): any {
			if (parent.children !== undefined) return parent; // Already done => cyclique
			parent.children = [];

			for (let id in lightPages)
			{
				let child = lightPages[id];
				const parentId = pages[child.id].parentId;
				
				if (parentId == parent.id)
				{

					child = fillChidren(child);
					parent.children.push(child);
				}
			}

			parent.children.sort(function(pa, pb) {
				const oa = pages[pa.id].ordering;
				const ob = pages[pb.id].ordering;
				if (oa < ob) return -1;
				if (oa > ob) return 1;
				return 0;
			});

			return parent;
		}

		// 3 Buils tree
		for (let id in lightPages)
		{	
			let page = lightPages[id];
			const parentId = pages[page.id].parentId;

			if (parentId == null)
			{
				page = fillChidren(page);
				tree.push(page);
			}
		}

		tree.sort(function(pa, pb) {
			const oa = pages[pa.id].ordering;
			const ob = pages[pb.id].ordering;
			if (oa < ob) return -1;
			if (oa > ob) return 1;
			return 0;
		});

		return tree;
	}

	/**
	 * Add fullNames to all object of given pages by given tree
	 * 
	 * @param pages 
	 * @param tree 
	 */
	public buildFullNames(pages, tree)
	{
		const processItem = function(item, parent)
		{
			const page = pages[item.id];

			if (parent == null)
			{
				page.fullNames = [ page.title ];
			}
			else
			{
				let fullNames = [ ...parent.fullNames ];
				fullNames.push(page.title);
				page.fullNames = fullNames;
			}

			for (let i in item.children) processItem(item.children[i], page);
		}
		
		for (let i in tree)
		{
			processItem(tree[i], null);
		}
	}

	/**
	 * Correct ordering field, using existing ordering field and Tree
	 * 
	 * @param userId 
	 */
	async correctOrderingField(userId: Number, tree: any[] = null): Promise<any>
	{
		// User logged ?
		if (userId == null) throw new AppException('No user given');
		
		// If null get Tree
		if (tree == null) tree = await this.getTree(userId);

		if (tree.length == 0) return; // Nothing to do

		let currentOrdering = 0;
		let correctionsToApply = {};

		const processItem = function(page)
		{
			currentOrdering += 10;
			correctionsToApply[page.id.toString()] = currentOrdering;
			for (let i in page.children) processItem(page.children[i]);
		}
		
		for (let i in tree)
		{
			processItem(tree[i]);
		}

		let sql = 'UPDATE wiki_page SET ordering = CASE id ';
		for(let id in correctionsToApply) sql += " WHEN " + id + " THEN " + correctionsToApply[id]
		sql += " ELSE ordering END WHERE id IN (" + Object.keys(correctionsToApply).join(",") + ")";

		await this.queryRunner.query(sql);
	}

	/**
	 * Get Tree, pages by id and ordering page Ids
	 * @param userId 
	 * @returns 
	 */
	public async listAll(userId: number): Promise<any>
	{
		// User logged ?
		if (userId == null) throw new AppException('No user given');
		
		const pages: any = await this.findIndexedById(WikiPage, 
			{ select: ["id", "ordering", "parentId", "title", "subTitle", "summary", "keyWords", "shareAlias"],
			where: { userId },
		});
		
		let tree = await this.getTree(userId);

		this.buildFullNames(pages, tree);

		//
		// Tree
		//

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


	/**
	 * Get page
	 * 
	 * @param id 
	 */
	async getPage(id: number): Promise<WikiPage>
	{
		let page = await this.queryRunner.manager.findOne(WikiPage, id);

		if (page == null) return null;

		page.acl = {
			update: this.session.userId == page.userId
		};

		return page
	}

	/**
	 * Get page
	 * 
	 * @param alias
	 */
	async getPageByShareAlias(alias: string): Promise<WikiPage>
	{
		let page = await this.queryRunner.manager.findOne(WikiPage, null, { where: { shareAlias: alias }});

		if (page == null) return null;
		
		page.acl = {
			update: this.session.userId == page.userId
		};

		return page
	}
	
	/**
	 * Update a page
	 * 
	 * @param pageUpdate 
	 */
	async update(pageUpdate: WikiPageUpdate): Promise<WikiPage>
	{
		let page = await this.queryRunner.manager.findOne(WikiPage, pageUpdate.id);

		await this.RecoveryHelper.add('WikiPage_' + pageUpdate.id, pageUpdate);

		let orderingFieldUpdated = false;

		for (let field in pageUpdate)
		{
			let val = pageUpdate[field];
			if (val !== undefined)
			{
				if (field == 'ordering' && page[field] != pageUpdate[field]) orderingFieldUpdated = true;
				page[field] = pageUpdate[field];
			}
		}

		// Check parent
		if (page.id == page.parentId) throw new UserException("La page ne peut pas être parente d'elle même");

		let pages = await this.queryIndexedById("SELECT id, parentId FROM wiki_page WHERE userId = ?", [page.userId]);
		let countTraversed = 0;
		let rootFound = false;
		let current = page;
		const max = Object.keys(pages).length;

		// Update new !
		pages[page.id.toString()].parentId = page.parentId;

		while(countTraversed < max)
		{
			countTraversed++;
			if (current.parentId == null) { rootFound = true; break; }
			current = pages[current.parentId.toString()];
		}
		if (rootFound == false) throw new UserException("Erreur de hiérarchie. Un enfant ne peut pas être son propre parent.");

		// Save Page
		await this.app.queryRunner.manager.save(page);

		// If Ordering field updated then Correct all ordering fiels
		if (orderingFieldUpdated) this.correctOrderingField(page.userId);
	
		// Return Page
		return await this.getPage(page.id);
	}


	/**
	 * Create a Page
	 * 
	 * @param pageCreate
	 */
	async create(pageCreate: WikiPageCreate): Promise<number>
	{
		const content = {
			text: '',
			media_links: [],
		};

		const keyWords = [];

		let alias = generator.generate({
			length: 20,
			uppercase: false,
			numbers: true,
			excludeSimilarCharacters: true
		});


		let sql = 'INSERT INTO wiki_page(userId, shareAlias, title, parentId, ordering, keyWords, content) VALUES (?,?,?,?,?,?,?)';

		let res = await this.queryRunner.query(sql, [
			this.session.userId, alias, pageCreate.title, pageCreate.parentId, 100000, JSON.stringify(keyWords), JSON.stringify(content)
		]);

		// Create Page
		res = await this.queryRunner.query('SELECT LAST_INSERT_ID() as id');

		// Correct Ordering fields
		this.correctOrderingField(this.session.userId);

		// Return ID
		return res[0].id;
	}


}
