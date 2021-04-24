
import Communication from '../lib/Communication'

export default {
	namespaced: true,

	state: () => ({
		tree: null,
		pages: null,

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

				const fields = ['ordering', 'parentId', 'title', 'subTitle', 'summary', 'keyWords', 'content'];
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
