
import Communication from '../lib/Communication'

export default {
	namespaced: true,

	state: () => ({
		clients: null,
		clientFile: null,
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

		file(context, id)
		{
			return new Promise((resolve, reject) => {


				Communication.call("client", id + "/file").then(function(clientFile)
				{
					context.state.clientFile = clientFile;
					resolve(clientFile);

				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		
		},

		create(context, params)
		{
			return new Promise((resolve, reject) => {

				const apiParams = {
					firstName: params.firstName,
					lastName: params.lastName,
				};

				Communication.call("client", "create", apiParams).then(function(user)
				{
					context.dispatch("list").then(function(){
						resolve(user);
					}).catch(function(data)
					{
						reject(data);
					});
					
					
				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		
		},

		update(context, params)
		{
			return new Promise((resolve, reject) => {

				const fields = ['name','firstName','lastName','email','comment','mobilePhone','phone','address','cp','city','country'];

				const apiParams = { };
				for (let i in fields)
				{
					const field = fields[i];
					apiParams[field] = params[field];
				}

				Communication.call("client", params.id +"/update", apiParams).then(function()
				{
					context.dispatch("file", params.id).then(function(user){
						resolve(user);
					}).catch(function(data)
					{
						reject(data);
					});
					
				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		
		}
	}

	
}
