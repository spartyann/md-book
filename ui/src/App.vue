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
@import "./styles/panel.scss";
@import "./styles/interactivity.scss";

</style>

<script>
	import { mapActions, mapState } from 'vuex';
	import PageTemplate from './template/PageTemplate';
	import ApiMsgModale from './components/MsgModal';
	import $ from 'jquery'

	export default {

		data()
		{
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

			$(document).keydown(function(event)
			{
				if (!(event.which == 83 && event.ctrlKey) && !(event.which == 19)) return true;

				let btns = $('.ctrl-s')
				let found = false;
				btns.each(function(index)
				{
					if (found == false && $(btns[index]).is(':visible'))
					{
						found = true;
						$(btns[index]).click();
					}
				});
				
				event.preventDefault();
				return false;
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
				user: state => state.user.loggedUser,
			})
		}
	}

</script>


