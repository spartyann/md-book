
import Communication from '../lib/Communication'

export default {
	namespaced: true,

	state: () => ({
		consults: null,

		consult: null,

		fieldsUpdating: [],
		updateStatus: false
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

				Communication.call("consult", "create", apiParams).then(function(consult)
				{
					resolve(consult);
					
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

				Communication.call("consult", id).then(function(consult)
				{
					context.state.consult = consult;
					resolve(consult);

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

				const fields = ['date','preConsult','hypothesis','report','reportClient','reportClientPostConsult','data'];
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
				Communication.call("consult", params.id +"/update", apiParams).then(function(consult)
				{
					context.state.updateStatus = 'updated';
					context.state.consult = consult;
					resolve(consult);

				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		
		}


	}

	
}
