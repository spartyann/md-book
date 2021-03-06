import Vue from 'vue'
import Vuex from 'vuex'
import Communication from '../lib/Communication'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,

		message: null
	},
	mutations: {

	},
	actions: {
		apiError(context, apiError)
		{
			context.state.message = {
				type: apiError.error == 'ApiException' ? 'ApiException' : apiError.type,
				message: apiError.message
			};
		},
		message(context, message)
		{
			if (message == null) context.state.message = null;
			else context.state.message = {
				type: 'message',
				message: message
			};
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
					context.state.user = null;
					resolve(data);

				}).catch(function(data)
				{
					context.dispatch("apiError", data);
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

		update(context, params)
		{
			return new Promise((resolve, reject) => {

				const apiParams = {
					id: params.id,
					first_name: params.first_name,
					last_name: params.last_name,
					email: params.email,
					pwd: params.pwd,
				};

				Communication.call("user", "update", apiParams).then(function(user)
				{
					context.state.user = user;
					resolve(user);

				}).catch(function(data)
				{
					context.dispatch("apiError", data);
					reject(data);
				});
			})
		
		}
	},
	modules: {
		
	}
})
