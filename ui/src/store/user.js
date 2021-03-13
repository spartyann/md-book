
import Communication from '../lib/Communication'

export default {
	namespaced: true,
	state: () => ({
		loggedUser: null,
	}),
	mutations: {

	},
	actions: {
		apiError(context, apiError)
		{
			context.dispatch("apiError", apiError, { root: true });
		},

		async init(context)
		{
			return new Promise((resolve) => {

				Communication.call("user", "get_user").then(function(user)
				{
					context.state.loggedUser = user;
					resolve(user);

				}).catch(function(data)
				{
					context.state.loggedUser = null;
					resolve(data);
				});
			})
		},

		login(context, params)
		{
			return new Promise((resolve, reject) => {

				const apiParams = {
					email: params.email,
					pwd: params.pwd,
				};

				Communication.call("user", "login", apiParams).then(function(user)
				{
					context.state.loggedUser = user;
					resolve(user);

				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		},
		logout(context)
		{
			return new Promise((resolve, reject) => {

				Communication.call("user", "logout").then(function(data)
				{
					context.state.loggedUser = null;
					resolve(data);

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

				const apiParams = {
					id: params.id,
					firstName: params.firstName,
					lastName: params.lastName,
					email: params.email,
				};

				if (params.pwd != null) apiParams.pwd = params.pwd;

				Communication.call("user", "update", apiParams).then(function(user)
				{
					// Update current user
					if (context.state.loggedUser.id == user.id) context.state.loggedUser = user;
					resolve(user);

				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		
		}
	}

	
}
