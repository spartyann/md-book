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

					<DateTime v-model="date"></DateTime>

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
		clientId: { type: Number}
	},
	components: {
	},

	data()
	{
		return {
			modalVisible: false,
			date: new Date(),
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

			this.storeConsultCreate({
				clientId: this.clientId,
				date: this.date.toISOString(),
			}).then(function(consult)
			{
				self.dialogHide();
				self.modalVisible = false;

				self.$router.push({ name: 'Consult', params: { consultId: consult.id }});
			});
			
		},

		...mapActions({
			storeConsultCreate: "consult/create"
		}),
	},

	computed: {
		...mapState({
		})
	}
}
</script>
