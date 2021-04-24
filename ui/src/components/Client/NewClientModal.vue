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
					<div class="form-group">
						<label>Genre</label>
						<select v-model="gender" class="form-control">
							<option value="m">Homme</option>
							<option value="f">Femme</option>
							<option value="o">Autre</option>
						</select>
					</div>
				</form>
			</div>
		</template>
		<template #modal-footer="">
			<b-button size="sm" variant="secondary" @click="cancel">Annuler</b-button>
			<b-button size="sm" variant="success" @click="create">Créer le client</b-button>
			
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
			gender: ""
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
				gender: this.gender,
			}).then(function(client)
			{
				self.dialogSuccess();
				self.modalVisible = false;

				self.$router.push({ name: 'Client', params: { clientId: client.id }, query: { tab : 0 } });
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
