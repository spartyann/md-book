<template>
	<div class="page-wiki container-fluid">
		<div class="row">
			<div class="wiki-content col-12">
				<WikiPage v-if="wikiPage != null" :page="wikiPage" :key="wikiPage.id"></WikiPage>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

import WikiBaseComponent from "@/store/tools/wikiBaseComponent";
import WikiPage from '../../components/Wiki/Page';

export default {

	name: 'WikiSharePage',

	extends: WikiBaseComponent,

	components: {
		WikiPage,
	},

	data()
	{
		return {

		};
	},

	mounted()
	{
		this.update();
		//const currentPageId = this.localStorageGet('wiki.current.page', null);
		//if (currentPageId !== null && this.wikiPages[currentPageId] != undefined) this.storeGetPage(currentPageId);
	},

	watch: {
		currentPageAlias() { this.update(); }
	},

	methods: {
		update()
		{
			this.storeGetPageByShareAlias(this.currentPageAlias)
		},
	},

	computed:{
		currentPageAlias()
		{
			return this.$route.params.alias !== undefined ? this.$route.params.alias : null
		}
	}
}
</script>
