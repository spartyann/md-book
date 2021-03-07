
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

		list(context, client_id)
		{
			return new Promise((resolve, reject) => {

				const apiParams = {
					client_id: client_id
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
		
		}
	}

	
}
