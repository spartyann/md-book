import { mapActions, mapState } from 'vuex';

export default {
	methods: {
		...mapActions({
			storeWikiList: 'wiki/list',
			storeGetPage: 'wiki/getPage',
			storePageUpdate: 'wiki/pageUpdate',
			
		}),
	},
	computed: {
		...mapState({
			wikiTree: state => state.wiki.tree,
			wikiCats: state => state.wiki.cats,
			wikiPages: state => state.wiki.pages,
			wikiPageCatMaps: state => state.wiki.page_cat_maps,
			wikiCatPageMaps: state => state.wiki.cat_page_maps,
			wikiPage: state => state.wiki.page,
			wikiLoadingPageId: state => state.wiki.loadingPageId,

			wikiFieldsUpdating: state => state.wiki.fieldsUpdating,
			wikiUpdateStatus: state => state.wiki.updateStatus,


		})
	}
}