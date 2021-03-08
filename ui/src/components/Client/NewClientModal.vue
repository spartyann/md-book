<template>
	<b-modal id="MsgModale" centered v-model="modalVisible" data-keyboard="false"
		no-close-on-esc
		hide-header-close
		>
		<template #modal-header >
			<h5><fa icon="plus-circle" class="text-primary"></fa> Nouveau client</h5>
		</template>
		<template #default >
			<div>
				<form class="">
					<div class="form-group">
						<label>Prénom</label>
						<input v-model="firstName" type="text" class="form-control">
					</div>
					<div class="form-group">
						<label>Nom</label>
						<input v-model="lastName" type="text" class="form-control">
					</div>
				</form>
			</div>
		</template>
		<template #modal-footer="">
			<b-button size="sm" variant="success" @click="create">Créer le client</b-button>
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
		return {
			modalVisible: false,
			firstName: "",
			lastName: "",
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

			if (this.passwordOk == false) return;

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
