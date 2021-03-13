import Vue from 'vue'
import Vuex from 'vuex'
//import Communication from '../lib/Communication'
import UserModule from './user';
import ClientModule from './client';
import ConsultModule from './consult';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		dialog: null
	},
	mutations: {

	},
	actions: {
		apiError(context, apiError)
		{
			if (apiError.statusCode == 400)
			{
				apiError.type = 'warning';				
			}

			if (Array.isArray(apiError.message)) apiError.message = apiError.message.join('\n')

			context.state.dialog = {
				type: apiError.error == 'ApiException' ? 'ApiException' : apiError.type,
				message: apiError.message
			};
		},

		dialog(context, dialog)
		{
			if (dialog == null) context.state.dialog = null;
			else context.state.dialog = {
				message: dialog.message,
				type: dialog.type,
				buttons: dialog.buttons == undefined ? null : dialog.buttons,
			};
		},

		async init(context)
		{
			return new Promise((resolve, reject) => {

				context.dispatch('user/init').then(() => {
					resolve();
				}).catch((reason) => {
					reject(reason);
				});
			})
		},
	},
	modules: {
		user: UserModule,
		client: ClientModule,
		consult: ConsultModule
	}
})
