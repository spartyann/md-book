
import Communication from '../lib/Communication'

export default {
	namespaced: true,

	state: () => ({
		clients: null,
		client: null
	}),
	mutations: {

	},
	actions: {
		apiError(context, apiError)
		{
			context.dispatch("apiError", apiError, { root: true });
		},

		list(context, params)
		{
			return new Promise((resolve, reject) => {

				const apiParams = {
					search: (params != undefined && params.search == undefined) ? params.search : null
				};

				Communication.call("client", "list", apiParams).then(function(clients)
				{
					context.state.clients = clients;
					resolve(clients);

				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		
		},

		get(context, id)
		{
			return new Promise((resolve, reject) => {

				const apiParams = {
					id: id
				};

				Communication.call("client", "get", apiParams).then(function(client)
				{
					context.state.client = client;
					resolve(client);

				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		
		}
	}

	
}
