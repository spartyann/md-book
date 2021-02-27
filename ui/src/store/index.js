import Vue from 'vue'
import Vuex from 'vuex'
import Communication from '../lib/Communication'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,

		apiError: null
	},
	mutations: {

	},
	actions: {
		error(context, apiError)
		{
			context.state.apiError = apiError;
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
					context.state.user = user;
					resolve(user);

				}).catch(function(data)
				{
					context.dispatch("error", data);
					reject(data);
				});
			})
		},
		logout(context)
		{
			return new Promise((resolve, reject) => {

				Communication.call("user", "logout").then(function(data)
				{
					context.state.user = null;
					resolve(data);

				}).catch(function(data)
				{
					context.dispatch("error", data);
					reject(data);
				});
			})
		},

		init(context)
		{
			return new Promise((resolve) => {

				Communication.call("user", "get_user").then(function(user)
				{
					context.state.user = user;
					resolve(user);

				}).catch(function(data)
				{
					context.state.user = null;
					resolve(data);
				});
			})
		},
	},
	modules: {
		
	}
})
