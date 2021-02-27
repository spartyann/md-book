<template>
  <div id="app">
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
@import 'styles/variables/app';
@import "./styles/app.scss";
@import "./styles/tools.scss";
</style>

<script>
	import PageTemplate from './template/page_template';

	export default {

		components: {
			PageTemplate: PageTemplate
		},
	}

</script>

