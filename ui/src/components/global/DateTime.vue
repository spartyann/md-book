<template>
	<div v-if="date != null">
		<b-input-group class="mb-3">
			<b-form-datepicker
				v-model="partDate"
				:date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
				locale="fr"
			></b-form-datepicker>
		</b-input-group>
		<b-input-group class="mb-3">
			<b-form-input
				v-model="partTime"
				type="time"
				placeholder="HH:mm"
			></b-form-input>
			<b-input-group-append>
				<b-form-timepicker
				v-model="partTime"
				button-only
				right
				locale="fr"
				></b-form-timepicker>
			</b-input-group-append>
		</b-input-group>
	</div>
				
</template>

<script>

export default {

	props: {
		date: { default: null, type: Date }
	},

	model: {
		prop: 'date',
		event: 'change'
	},

	data()
	{
		return {
			partDate: null,
			partTime: null
		};
	},

	mounted() { this.refresh(); },

	watch:{
		date() { this.refresh(); },
		partDate() { this.change(); },
		partTime() { this.change(); }
	},
	methods: {
		refresh()
		{
			if (this.date == null) return;

			const times = this.date.toLocaleTimeString().split(':');

			this.partDate = this.date.toISOString().split('T')[0];
			this.partTime = times[0] + ":" + times[1];
		},

		change()
		{
			this.$emit('input', new Date(this.partDate + " " + this.partTime));
			this.$emit('change', new Date(this.partDate + " " + this.partTime));
		}

	},

	computed: {
		
	}
}
</script>
