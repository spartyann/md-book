<template>
	<div class="wiki-tree">
		
		<template v-for="(item) in wikiTree">
			<TreeItem :item="item" :key="item.id" :deep="0"></TreeItem>
		</template>
	</div>
</template>

<script>
// @ is an alias to /src

import WikiBaseComponent from "@/store/tools/wikiBaseComponent";
import TreeItem from './TreeItem';

export default {

	name: 'WikiTree',

	extends: WikiBaseComponent,

	components: {
		TreeItem
	},

	data()
	{
		return {

		};
	},

	mounted()
	{

	}
}
</script>
