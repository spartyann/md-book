import { mapActions, mapState } from 'vuex';

export default {
	methods: {
		...mapActions({
			storeWikiList: 'wiki/list',
			storeGetPage: 'wiki/getPage',
			storePageUpdate: 'wiki/pageUpdate',
			storeResetPage: 'wiki/resetPage',
			storeCreatePage: 'wiki/createPage',
			
		}),
	},
	computed: {
		...mapState({
			wikiTree: state => state.wiki.tree,
			wikiPages: state => state.wiki.pages,
			wikiOrderedPageIds: state => state.wiki.orderedPageIds,
			
			wikiPage: state => state.wiki.page,
			wikiLoadingPageId: state => state.wiki.loadingPageId,

			wikiFieldsUpdating: state => state.wiki.fieldsUpdating,
			wikiUpdateStatus: state => state.wiki.updateStatus,


		})
	}
}