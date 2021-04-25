<template>
	<div class="wiki-tree">
		<WikiTreeItems :list="tree" :deep="0" :opened="true"></WikiTreeItems>
	</div>
</template>

<script>
// @ is an alias to /src

import WikiBaseComponent from "@/store/tools/wikiBaseComponent";
import WikiTreeItems from './TreeItems';

export default {

	name: 'WikiTree',

	extends: WikiBaseComponent,

	components: {
		WikiTreeItems,
	},

	data()
	{
		return {

		};
	},

	mounted()
	{

	},
	computed:{
		tree:{
			get() { return this.wikiTree; },
			set() { 
				// UPDATE

			}
		}
	},	
}
</script>

