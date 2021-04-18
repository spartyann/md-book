<template>
	<div class="page-wiki" v-if="wikiPages !== null">
		
		<div class="wiki-sidebar">
			<WikiTree></WikiTree>
		</div>
		<div class="wiki-content">
			<template v-if="currentPageId != null">
				<WikiPage v-if="wikiPage != null" :page="wikiPage" :key="wikiPage.id"></WikiPage>
			</template>
		</div>
		
	</div>
</template>

<script>
// @ is an alias to /src

import WikiBaseComponent from "@/store/tools/wikiBaseComponent";
import WikiTree from '../../components/Wiki/Tree';
import WikiPage from '../../components/Wiki/Page';

export default {

	name: 'WikiHome',

	extends: WikiBaseComponent,

	components: {
		WikiPage,
		WikiTree
	},

	data()
	{
		return {

		};
	},

	mounted()
	{
		this.storeWikiList();
		this.update();
		//const currentPageId = this.localStorageGet('wiki.current.page', null);
		//if (currentPageId !== null && this.wikiPages[currentPageId] != undefined) this.storeGetPage(currentPageId);
	},

	watch: {
		currentPageId() { this.update(); }
	},

	methods: {
		update()
		{
			if (this.currentPageId != null && (this.wikiPage == null || this.wikiPage.id != this.currentPageId))
			{
				this.storeGetPage(this.currentPageId)
			}
		}
	},

	computed:{
		currentPageId() {
			return this.$route.params.pageId !== undefined ? this.$route.params.pageId : null
		}
	}
}
</script>
