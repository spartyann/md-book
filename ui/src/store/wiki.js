
import Communication from '../lib/Communication'

export default {
	namespaced: true,

	state: () => ({
		tree: null,
		cats: null,
		pages: null,
		page_cat_maps: null,
		cat_page_maps: null,

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
					context.state.cats = data.cats;
					context.state.pages = data.pages;
					context.state.page_cat_maps = data.page_cat_maps;
					context.state.cat_page_maps = data.cat_page_maps;

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

		pageUpdate(context, params)
		{
			return new Promise((resolve, reject) => {

				const fields = ['ordering','title', 'content'];
				context.state.fieldsUpdating = [];

				const apiParams = { };
				for (let i in fields)
				{
					const field = fields[i];
					if (params[field] == undefined) continue;
					context.state.fieldsUpdating.push(field);
					apiParams[field] = params[field];
				}

				context.state.updateStatus = 'updating';
				Communication.call("wiki", "page/" + params.id +"/update", apiParams).then(function(page)
				{
					context.state.updateStatus = 'updated';

					context.state.page = page;
					resolve(page);

				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		
		}



	}
}
