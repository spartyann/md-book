<template>
	<div  :class="'wiki-tree-page-container '
		+ (item.children.length > 0 ? 'has-children ' : 'no-children ')">
		
		<div :class="'wiki-tree-page '
			+ (wikiLoadingPageId == item.id || (wikiPage != null && wikiPage.id == item.id) ? ' active' : '')">
			<div>
				<div class="tbl-100">
					<div :style="paddingLeft" class="td icon" @click="clickItem(true)">
						<template v-if="item.children.length">
							<fa v-if="opened" :icon="['far', 'minus-square']"></fa>
							<fa v-else :icon="['fas', 'plus-square']"></fa>
						</template>
						<template v-else>
							<fa :icon="['far', 'file-alt']"></fa>
						</template>
					</div>
					<div class="td-100"  @click="clickItem(false)">
						<div class="label">
							{{ item.title }}
							<fa v-if="wikiLoadingPageId == item.id" icon="spinner" pulse></fa>
							<div v-if="item.subTitle != ''" class="page-sub-title">
								{{ item.subTitle }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<WikiTreeItems :list="item.children" :deep="deep + 1" :opened="opened"></WikiTreeItems>
		
	</div>
</template>

<script>
// @ is an alias to /src

import WikiBaseComponent from "@/store/tools/wikiBaseComponent";
import WikiTreeItems from './TreeItems'

export default {

	name: 'WikiTreeItem',

	extends: WikiBaseComponent,

	beforeCreate: function () {
		// Using asynchronous import for :
		// https://vuejs.org/v2/guide/components-edge-cases.html#Recursive-Components
		this.$options.components.WikiTreeItems = WikiTreeItems;
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
		paddingLeft(){
			//return 'padding-left: 20px';
			return 'padding-left: ' + (this.deep * 20) + 'px';
		},
	},

	methods:{
		clickItem(onlyToogle)
		{
		
			if (onlyToogle == false)
			{
				if (this.wikiPage != null && this.wikiPage.id == this.item.id) return;
				this.$router.push({ name: "WikiPage", params: {pageId: this.item.id }});
			}
			else
			{
				this.opened = !this.opened;

				let openedItems = this.localStorageGet('wiki.tree.opened', {});
				openedItems[this.item.id] = this.opened;
				this.localStorageSet('wiki.tree.opened', openedItems);
			}
		},

	}
}
</script>
