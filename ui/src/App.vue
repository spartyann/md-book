<template>
  <div id="app">

	<ApiErrorModale></ApiErrorModale>

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
	import { mapActions } from 'vuex';
	import PageTemplate from './template/page_template';
	import ApiErrorModale from './components/modale_api_error';

	export default {

		components: {
			PageTemplate: PageTemplate,
			ApiErrorModale: ApiErrorModale
		},

		mounted(){
			this.storeInit();
		},
		methods: {

			...mapActions({
				storeInit: 'init',
			}),
		},
		computed: {

		}
	}

</script>

