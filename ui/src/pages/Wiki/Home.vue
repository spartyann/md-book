<template>
	<div class="page-wiki container-fluid" v-if="wikiPages !== null">
		<WikiNewPageModal ref="wikiNewPageModal"></WikiNewPageModal>
		<div class="row">
			<div class="wiki-sidebar col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
				<div class="float-right">
					<a @click="newPage">Nouvelle page</a>
				</div>
				<WikiTree></WikiTree>
			</div>
			<div class="wiki-content col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12">
				<template v-if="currentPageId != null">
					<WikiPage v-if="wikiPage != null" :page="wikiPage" :key="wikiPage.id"></WikiPage>
				</template>
			</div>
		</div>
		
	</div>
</template>

<script>
// @ is an alias to /src

import WikiBaseComponent from "@/store/tools/wikiBaseComponent";
import WikiTree from '../../components/Wiki/Tree/Tree';
import WikiPage from '../../components/Wiki/Page';
import WikiNewPageModal from '../../components/Wiki/NewPageModal';

export default {

	name: 'WikiHome',

	extends: WikiBaseComponent,

	components: {
		WikiPage,
		WikiTree,
		WikiNewPageModal
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

			if (this.currentPageId == null)
			{
				this.storeResetPage()
			}
		},

		newPage(){
			this.$refs.wikiNewPageModal.open();
		}
	},

	computed:{
		currentPageId() {
			return this.$route.params.pageId !== undefined ? this.$route.params.pageId : null
		}
	}
}
</script>
