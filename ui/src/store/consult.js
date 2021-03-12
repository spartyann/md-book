
import Communication from '../lib/Communication'

export default {
	namespaced: true,

	state: () => ({
		consults: null
	}),
	mutations: {

	},
	actions: {
		apiError(context, apiError)
		{
			context.dispatch("apiError", apiError, { root: true });
		},

		list(context, clientId)
		{
			return new Promise((resolve, reject) => {

				const apiParams = {
					clientId: clientId
				};

				Communication.call("consult", "list", apiParams).then(function(consults)
				{
					context.state.consults = consults;
					resolve(consults);

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
					clientId: params.clientId,
					date: params.date,
				};

				Communication.call("consult", "create", apiParams).then(function(user)
				{
					context.dispatch("list", params.clientId).then(function(){
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


	}

	
}
