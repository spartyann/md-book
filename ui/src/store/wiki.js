
import Communication from '../lib/Communication'

export default {
	namespaced: true,

	state: () => ({
		tree: null,
		pages: null,
		orderedPageIds: [],

		page: null,

		loadingPageId: null,

		fieldsUpdating: [],
		updateStatus: null
	}),
	mutations: {

	},
	actions: {
		apiError(context, apiError)
		{
			context.dispatch("apiError", apiError, { root: true });
		},

		list(context)
		{
			return new Promise((resolve, reject) => {

				const apiParams = { };

				Communication.call("wiki", "list", apiParams).then(function(data)
				{
					context.state.tree= data.tree;
					context.state.pages = data.pages;
					context.state.orderedPageIds = data.orderedPageIds;
					
					resolve(data);

				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		
		},

		resetPage(context){
			context.state.page = null;
		},

		getPage(context, id)
		{
			return new Promise((resolve, reject) => {

				const apiParams = { };
				context.state.loadingPageId = id;

				Communication.call("wiki", "page/" + id, apiParams).then(function(page)
				{
					context.state.page = page;
					context.state.loadingPageId = null;
					resolve(page);

				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		},

		getPageByShareAlias(context, alias)
		{
			return new Promise((resolve, reject) => {

				const apiParams = { };

				Communication.call("wiki", "page/share_alias/" + alias, apiParams).then(function(page)
				{
					context.state.page = page;
					resolve(page);

				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		},

		pageUpdate(context, params)
		{
			return new Promise((resolve, reject) => {

				const fields = ['ordering', 'parentId', 'title', 'subTitle', 'summary', 'keyWords', 'content', 'image'];
				context.state.fieldsUpdating = [];

				const apiParams = { };
				for (let i in fields)
				{
					const field = fields[i];
					if (params[field] === undefined) continue;
					context.state.fieldsUpdating.push(field);
					apiParams[field] = params[field];
				}

				context.state.updateStatus = 'updating';
				Communication.call("wiki", "page/" + params.id +"/update", apiParams).then(function(data)
				{
					context.state.updateStatus = 'updated';

					context.state.tree = data.tree;
					context.state.pages = data.pages;
					context.state.orderedPageIds = data.orderedPageIds;
					context.state.page = data.page;

					resolve(data.page);

				}).catch(function(data)
				{
					context.state.updateStatus = null;
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		
		},

		pageUpdateOrdering(context, params)
		{
			return new Promise((resolve, reject) => {

				const apiParams = {
					ordering: params.ordering,
				};

				Communication.call("wiki", "page/" + params.id +"/update", apiParams).then(function(data)
				{
					context.state.tree = data.tree;
					context.state.pages = data.pages;
					context.state.orderedPageIds = data.orderedPageIds;
					if (context.state.page.id == data.page.id) context.state.page = data.page;

					resolve(data.page);

				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		
		},


		createPage(context, params)
		{
			return new Promise((resolve, reject) => {

				const fields = ['parentId', 'title'];
				
				const apiParams = { };
				for (let i in fields)
				{
					const field = fields[i];
					if (params[field] == undefined) continue;
					apiParams[field] = params[field];
				}

				Communication.call("wiki", "page/create", apiParams).then(function(data)
				{
					context.state.tree = data.tree;
					context.state.pages = data.pages;
					context.state.orderedPageIds = data.orderedPageIds;
					context.state.page = data.page;

					resolve(data.page);

				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		
		}
		

	}
}
