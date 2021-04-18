<template>
	<div :class="'wiki-tree-item ' + (item.children.length > 0 ? 'has-children' : 'no-children')">
		<div @click="toogle" class="label">
			<span :style="marginLeft">
				<fa v-if="opened" icon="chevron-down"></fa>
				<fa v-else icon="chevron-right"></fa>
				{{ item.name }}
			</span>
		</div>
		<div v-if="opened" class="">
			<template v-for="(item) in item.children">
				<TreeItem :item="item" :key="item.id" :deep="deep + 1"></TreeItem>
			</template>

			<template v-for="(page) in pages">
				<div :key="page.id"
					:class="'wiki-tree-page ' + (wikiPage != null && wikiPage.id == page.id ? 'active' : '')"
					@click="pageClick(page)">
					<span :style="marginLeftPage">
						<fa :icon="['fas', 'file-alt']"></fa> {{ page.title }}
						<fa v-if="wikiLoadingPageId == page.id" icon="spinner" pulse></fa>				
					</span>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

import WikiBaseComponent from "@/store/tools/wikiBaseComponent";
import TreeItem from './TreeItem';

export default {

	name: 'WikiTreeItem',

	extends: WikiBaseComponent,

	beforeCreate: function () {
		// Using asynchronous import for :
		// https://vuejs.org/v2/guide/components-edge-cases.html#Recursive-Components
		this.$options.components.TreeItem = TreeItem;
	},

	props: {
		item: {},
		deep: { type: Number }
	},

	components: {
		
	},

	data()
	{
		let openedItems = this.localStorageGet('wiki.tree.opened', {});

		return {
			opened: openedItems[this.item.id] === true
		};
	},

	mounted()
	{
	},

	computed:{
		marginLeft(){ return 'margin-left: ' + (this.deep * 20) + 'px'; },
		marginLeftPage(){ return 'margin-left: ' + ((this.deep + 1) * 20) + 'px'; },

		pages(){
			let res = [];
			const map = this.wikiCatPageMaps[this.item.id];
			
			for (let i in map)
			{
				res.push(this.wikiPages[map[i]]);
			}

			return res;
		}
	},

	methods:{
		toogle(){
			this.opened = !this.opened;

			let openedItems = this.localStorageGet('wiki.tree.opened', {});
			openedItems[this.item.id] = this.opened;
			this.localStorageSet('wiki.tree.opened', openedItems);
		},

		pageClick(page)
		{
			if (this.wikiPage != null && this.wikiPage.id == page.id) return;
			this.$router.push({ name: "WikiPage", params :{pageId: page.id }});
		}
	}
}
</script>
