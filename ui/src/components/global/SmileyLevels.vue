<template>
	<span v-if="readonly">
		<span v-if="currentIconDef != null" :style="currentIconDef.color != undefined ? 'color:' + currentIconDef.color : ''">
			<fa regular :icon="currentIconDef.icon"></fa>
		</span>
	</span>
	<b-button-group size="lg" v-else>
		<b-button
			v-for="(iconDef, idx) in emojies"
			:key="idx"
			:pressed="level == idx"
			@click="click(idx)"
			variant="light"
			:style="iconDef.color != undefined ? 'color:' + iconDef.color : ''"
		>
			<fa regular :icon="iconDef.icon"></fa>
		</b-button>
	</b-button-group>
				
</template>

<script>

export default {

	props: {
		level: { default: null },
		readonly: { default: false, type: Boolean }
	},

	model: {
		prop: 'level',
		event: 'change'
	},

	data()
	{
		return {
			emojies: [
				{ icon: 'question' },
				{ icon: 'frown-open', color: '#ef6f00' },
				{ icon: 'meh', color: '#3569ff' },
				{ icon: 'smile', color: '#4ec558' },
				{ icon: 'laugh-beam', color: '#03c314' },
			]
		}
	},

	methods: {
		click(idx)
		{
			this.$emit('input', idx);
			this.$emit('change', idx);
		}
	},

	computed: {
		currentIconDef()
		{
			if (this.level === null) return null;
			if (this.emojies[this.level] == undefined) return null;
			return this.emojies[this.level];
		}
	}
}
</script>
