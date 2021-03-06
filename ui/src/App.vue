<template>
  <div id="app" v-if="loaded">

	<ApiMsgModale></ApiMsgModale>

    <PageTemplate>
		<router-view />
	</PageTemplate>
  </div>
</template>

<style lang="scss">
@import "node_modules/bootstrap/scss/functions";
@import 'styles/variables/base';
@import 'styles/variables/bootstrap';
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
@import 'styles/variables/app';
@import "./styles/app.scss";
@import "./styles/tools.scss";

</style>

<script>
	import { mapActions, mapState } from 'vuex';
	import PageTemplate from './template/page_template';
	import ApiMsgModale from './components/msg_modale';

	export default {

		data(){
			return {
				loaded: false
			}
		},
		components: {
			PageTemplate: PageTemplate,
			ApiMsgModale: ApiMsgModale
		},

		watch:
		{
			$route(){ if (this.loaded) { this.checkRoute(); } }
		},

		mounted()
		{
			let self = this;
			
			this.storeInit().then(function() {
				self.checkRoute();
				self.loaded = true;
			});
		},
		methods: {
			checkRoute()
			{
				let routeName = this.$route.name;
				if (this.user == null && routeName != 'Home' && routeName != 'Login' && routeName != 'Register')
				{
					this.$router.push({name: "Login"});
				}
			},
			...mapActions({
				storeInit: 'init'
			}),
		},
		computed: {
			...mapState({
				user: state => state.user,
			})
		}
	}

</script>

