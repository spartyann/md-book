<template>
	<b-modal id="MsgModale" centered v-model="modalVisible" data-keyboard="false"
		no-close-on-esc
		hide-header-close
		>
		<template #modal-header >
			<h5><fa icon="plus-circle" class="text-primary"></fa> Nouvelle consultation</h5>
		</template>
		<template #default >
			<div>
				<form class="">
					<div>
						<label>Date</label>
						<b-input-group class="mb-3">
							<b-form-datepicker
								v-model="date"
								:date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
								locale="fr"
							></b-form-datepicker>
						</b-input-group>
						<b-input-group class="mb-3">
							<b-form-input
								v-model="time"
								type="time"
								placeholder="HH:mm"
							></b-form-input>
							<b-input-group-append>
								<b-form-timepicker
								v-model="time"
								button-only
								right
								locale="fr"
								></b-form-timepicker>
							</b-input-group-append>
						</b-input-group>
					</div>
				</form>
			</div>
		</template>
		<template #modal-footer="">
			<b-button size="sm" variant="success" @click="create">Créer la consultation</b-button>
			<b-button size="sm" variant="secondary" @click="cancel">Annuler</b-button>
			
		</template>
	</b-modal>

</template>

<script>
import { mapActions, mapState } from 'vuex';
// @ is an alias to /src

export default {

	props: {

	},
	components: {
	},

	data()
	{
		const date = new Date();
		const times = date.toLocaleTimeString().split(':');

		return {
			modalVisible: false,
			date: date.toISOString().split('T')[0],
			time: times[0] + ":" + times[1]
		};
	},

	mounted()
	{
		
	},
	methods: {
		open()
		{
			this.modalVisible = true;
		},
		cancel()
		{
			this.modalVisible = false;
		},
		create()
		{
			let self = this;

			
			this.dialogWaiting(true);

			this.storeClientCreate({
				firstName: this.firstName,
				lastName: this.lastName,
			}).then(function()
			{
				self.dialogSuccess();
				self.modalVisible = false;
			});
			
		},

		...mapActions({
			storeClientCreate: "client/create"
		}),
	},

	computed: {
		...mapState({
		})
	}
}
</script>
