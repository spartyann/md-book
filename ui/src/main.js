import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MixinModal from './MixinModal'


import 'bootstrap';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

library.add( fas )
Vue.component('fa', FontAwesomeIcon);

Vue.config.productionTip = false

Vue.mixin(MixinModal);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
