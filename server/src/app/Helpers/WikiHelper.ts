import { AppBase } from "../AppBase";
import { AppException } from "../Exceptions/AppException";
import { WikiCat } from "../Models/WikiCat.entity";
import { WikiPage } from "../Models/WikiPage.entity";
import { WikiPageCat } from "../Models/WikiPageCat.entity";
import { ObjectTools } from "../Tools/ObjectTools";

export class WikiHelper extends AppBase {

	public async listAll(userId: number): Promise<any>
	{
		// User logged ?
		if (userId == null) userId = this.session.userId;

		if (userId == null) throw new AppException('No user given');
		
		const pages = await this.findIndexedById(WikiPage, { select: ["id", "title", "shareAlias"], where: { userId } });
		const cats = await this.findIndexedById(WikiCat, { where: { userId } });
		const maps = await this.find(WikiPageCat, { where: "catId IN (" + Object.keys(cats).join(',') + ")" });

		let pageCatMap = {};
		let catPageMap = {};
		
		for (let i in maps)
		{
			const map = maps[i];
			let pageId = map.pageId.toString();
			let catId = map.catId.toString();

			if (pageCatMap[pageId] == undefined) pageCatMap[pageId] = [];
			if (catPageMap[catId] == undefined) catPageMap[catId] = [];
			
			pageCatMap[pageId].push(map.catId);
			catPageMap[catId].push(map.pageId);
		}
		
		let tree = [];

		//
		// Tre
		//

		// 1- Clone object
		// Important to avoid cyclique depedences
		let catsClone = {};
		for (let id in cats)
		{	
			let cat = cats[id];
			catsClone[cat.id.toString()] = { ...cat };
		}

		// 2 Function Children build
		let fillChidren = function(parent: any): any {
			if (parent.children !== undefined) return parent; // Already done => cyclique
			parent.children = [];

			for (let id in catsClone)
			{	
				let child = catsClone[id];
				
				if (child.parentId == parent.id) {
					child = fillChidren(child);
					parent.children.push(child);
				}
			}

			return parent;
		}

		// 3 Buils tree
		for (let id in catsClone)
		{	
			let cat = catsClone[id];
			
			if (cat.parentId == null) {
				cat = fillChidren(cat);
				tree.push(cat);
			}
		}

		// 4 Sort


		return {
			tree: tree,
			cats: cats,
			page_cat_maps: pageCatMap,
			cat_page_maps: catPageMap,
			pages: pages,
		};
	}


}
