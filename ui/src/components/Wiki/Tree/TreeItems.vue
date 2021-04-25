<template>
	<draggable
		@start="dragStart"
		@end="dragStop"
		v-bind="dragOptions"
		style=""
		@input="emitter"
		:list="list"
		>
		<transition-group type="transition" :name="'flip-list'" v-if="opened">
			<WikiTreeItem v-for="(item) in (list == null ? value : list)" 
				:item="item" :key="item.id" 
				:list="item.children" :deep="deep"></WikiTreeItem>
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
				animation: 200,
				//group: "wikiPage",
				//disabled: true,
				ghostClass: "ghost"
			};
		}
	},

	methods:{
		dragStart() { this.drag = true; },
		dragStop(evt) {
			this.drag = false;
			let self = this;

			//console.log(evt);
			let id = evt.item.attributes['data-page-id'].value;
			let oldIndex = evt.oldIndex;
			let newIndex = evt.newIndex;

			if (oldIndex != newIndex)
			{
				let newOrdering = 0;

				if (newIndex == 0) newOrdering = this.wikiPages[this.list[1].id].ordering - 5;
				else newOrdering = this.wikiPages[this.list[newIndex - 1].id].ordering + 5;

				let params = {
					id: id,
					ordering: newOrdering
				}

				this.storePageUpdateOrdering(params).then(() => {
					self.dialogSuccess();
				});
			}
			
		},

		emitter(value) {
			this.$emit("input", value);
		}
	},


}
</script>

