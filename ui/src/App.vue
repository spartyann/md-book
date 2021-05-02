<template>
    <PageTemplate v-if="loaded">
		<ApiMsgModale></ApiMsgModale>
		<router-view />
	</PageTemplate>
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
@import "./styles/wiki.scss";

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
			$route(){
				if (this.loaded)
				{
					this.checkRoute();
					this.refreshPageHead();
				}
			},
			wikiPage() { this.refreshPageHead(); }
		},

		updated(){
			this.refreshPageHead();
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
				if (this.user == null 
					&& this.$route.meta.noUserLogged != true
					&& this.$route.meta.share != true )
				{
					this.$router.push({name: "Login"});
				}
			},
			refreshPageHead() {
				const meta = this.$route.meta;
		
				let pageTitle = null;
				let pageDescription = null

				if(meta != null && meta.pageHead != undefined) 
				{
					if (meta.pageHead.title != undefined)
					{
						pageTitle = typeof meta.pageHead.title == 'function' ? meta.pageHead.title(this) : meta.pageHead.title;
					}
					if (meta.pageHead.description != undefined)
					{
						pageDescription = typeof meta.pageHead.description == 'function' ? meta.pageHead.description(this) : meta.pageHead.description;
					}
				}

				if (pageTitle == null) pageTitle = "MD Book";
				if (pageDescription == null) pageDescription = "Application d'aide aux praticiens des médecines douces.";

				$("html>head>title").text(pageTitle);
				$("html>head>meta[name=description]").attr('content', pageDescription);

			},
			...mapActions({
				storeInit: 'init'
			}),
		},
		computed: {
			...mapState({
				user: state => state.user.loggedUser,
				wikiPage: state => state.wiki.page,
			})
		}
	}

</script>



