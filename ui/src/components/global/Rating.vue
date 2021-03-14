<template>
	<div class="d-inline-block mb-2">
		<b-button-group :size="size">
			<b-button v-if="allowNull"
				@click="click(null)"
				:pressed="level === null"
				variant="light"
				class="btn-level">
				?
			</b-button>
			<b-button
				v-for="(levelDesc, idx) in levelsDesc"
				:key="idx"
				:pressed="level == idx"
				@click="click(idx)"
				variant="light"
				class="btn-level"
				:style="'border-bottom-color:' + levelDesc.color">
				{{ levelDesc.level }}
			</b-button>
		</b-button-group>

		<div class="tbl-100 fz-80" v-if="texts != null">
			<template v-if="texts.length == 2">
				<div class="td-50">{{ texts[0] }}</div>
				<div class="td-50 tar">{{ texts[1] }}</div>
			</template>
			<template v-if="texts.length == 3">
				<div class="td-30">{{ texts[0] }}</div>
				<div class="td tac">{{ texts[1] }}</div>
				<div class="td-30 tar">{{ texts[2] }}</div>
			</template>
		</div>
	</div>
				
</template>

<script>

export default {

	props: {
		levels: { default: () => { return [[0,1,2,3], [4,5,6], [7,8,9,10]] }, type: Array },
		allowNull: { default: true, type: Boolean },
		texts: { default: null, type: Array },
		level: { default: null },
		size: { default: "sm", type: String },
	},

	model: {
		prop: 'level',
		event: 'change'
	},

	data()
	{
		return {
			
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
		levelsDesc()
		{
			const colors = ['#d6e7ff', '#85b6ff', '#3385ff', '#005ae0', '#00317a'];
			let colorStartIndex = this.levels.length == 3 ? 1 : 0;
			let levelsDesc = [];
			
			for(let i in this.levels) for (let j in this.levels[i])
			{
				i = parseInt(i);
				levelsDesc.push({
					level: this.levels[i][j],
					color: colors[colorStartIndex + i]
				});			
			}
			
			return levelsDesc;
		},

		currentIconDef()
		{
			if (this.level === null) return null;
			if (this.emojies[this.level] == undefined) return null;
			return this.emojies[this.level];
		}
	}
}
</script>
