import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MixinModal from './MixinModal'
import MixinTools from './MixinTools'
import VueI18n from 'vue-i18n'
import I18nParam from './i18n'
import CKEditor from '@ckeditor/ckeditor5-vue2'


import 'bootstrap';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Directives from "./Directives"
import GlobalComponents from "./components/global/register"


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use( CKEditor );

// I18n
Vue.use(VueI18n)

library.add( fas )
library.add( far )
Vue.component('fa', FontAwesomeIcon);


Vue.config.productionTip = false

Vue.mixin(MixinModal);
Vue.mixin(MixinTools);

Directives.registerDirectives();
GlobalComponents.registerGlobalComponents();


// I18n
const i18n = new VueI18n(I18nParam);

new Vue({
	i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app')
