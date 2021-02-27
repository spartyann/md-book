import Vue from 'vue'
import Vuex from 'vuex'
import Communication from '../lib/Communication'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null
	},
	mutations: {

	},
	actions: {
		login(context, params)
		{
			return new Promise((resolve, reject) => {

				const apiParams = {
					email: params.email,
					pwd: params.pwd,
				};

				Communication.call("user", "login", apiParams).then(function(user)
				{
					context.state.data = user;
					resolve(user);

				}).catch(function(data){
					reject(data);
				});
			})
		}
	},
	modules: {
		
	}
})
