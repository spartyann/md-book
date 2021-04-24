<template>
	<draggable
		@start="dragStart"
		@end="dragStop"
		v-bind="dragOptions"
		style=""
		@input="emitter"
		:list="list"
		:value="value"
		>
		<transition-group type="transition" :name="'flip-list'" v-if="opened">
			<WikiTreeItem v-for="(item) in (list == null ? value : list)" 
			:item="item" :key="item.id" 
			:list="item.children"  :deep="deep"></WikiTreeItem>
		</transition-group>
	</draggable>
</template>

<script>
// @ is an alias to /src

import WikiBaseComponent from "@/store/tools/wikiBaseComponent";
import WikiTreeItem from './TreeItem';
import draggable from "vuedraggable";

export default {

	name: 'WikiTreeItems',

	extends: WikiBaseComponent,

	beforeCreate: function () {
		// Using asynchronous import for :
		// https://vuejs.org/v2/guide/components-edge-cases.html#Recursive-Components
		this.$options.components.WikiTreeItem = WikiTreeItem;
		this.$options.components.draggable = draggable;
	},


	props: {
		value: {
			required: false,
			type: Array,
			default: null
		},

		list: {
			required: false,
			type: Array,
			default: null
		},
		deep: { type: Number },
		opened: { type: Boolean }
	},


	data()
	{
		return {
			drag: false
		};
	},

	mounted()
	{
	},

	computed:{
		dragOptions() {
			return {
				//animation: 200,
				group: "wikiPage",
				disabled: true,
				ghostClass: "ghost"
			};
		}
	},

	methods:{
		dragStart() { this.drag = true; },
		dragStop() { this.drag = false; },

		emitter(value) {
			this.$emit("input", value);
		}
	},


}
</script>

