<template>
	
		<form class="" v-if="clientFile != null && cloneClient != null">

			<div class="row">
				<div class="form-group col-md-6">
					<label>Nom complet</label>
					<input v-model="cloneClient.name" type="text" class="form-control" :disabled="edit == false">
				</div>

				<div class="form-group col-md-6">
					<label>Genre</label>
					<select v-model="cloneClient.gender" class="form-control" :disabled="edit == false">
						<option value="m">Homme</option>
						<option value="f">Femme</option>
						<option value="o">Autre</option>
					</select>
				</div>

				<div class="form-group col-md-6">
					<label>Prénom</label>
					<input v-model="cloneClient.firstName" type="text" class="form-control" :disabled="edit == false">
				</div>

				<div class="form-group col-md-6">
					<label>Nom</label>
					<input v-model="cloneClient.lastName" type="text" class="form-control" :disabled="edit == false">
				</div>

				<div class="form-group col-md-6">
					<label>Email</label>
					<input v-model="cloneClient.email" type="email" class="form-control" :disabled="edit == false">
				</div>

				<div class="col-md-6">
					<label>Date de naissance</label>
					<b-input-group class="mb-3">
						<b-form-input
							id="birthday-input"
							v-model="birthday"
							:disabled="edit == false"
							type="text"
							placeholder="YYYY-MM-DD"
							autocomplete="off"
						></b-form-input>
						<b-form-datepicker
							button-only
							:disabled="edit == false"
							v-model="birthday"
							right
							locale="fr"
							aria-controls="birthday-input"
						></b-form-datepicker>
					</b-input-group>
				</div>

				<div class="form-group col-md-6">
					<label>Téléphone mobile</label>
					<input v-model="cloneClient.mobilePhone" type="text" class="form-control" :disabled="edit == false">
				</div>

				<div class="form-group col-md-6">
					<label>Téléphone fixe</label>
					<input v-model="cloneClient.phone" type="text" class="form-control" :disabled="edit == false">
				</div>

				<div class="form-group col-md-6">
					<label>Adresse</label>
					<textarea v-model="cloneClient.address" class="form-control" :disabled="edit == false" rows="2"></textarea>
				</div>

				<div class="form-group col-md-6">
					<label>Code postal</label>
					<input v-model="cloneClient.cp" type="text" class="form-control" :disabled="edit == false">
				</div>

				<div class="form-group col-md-6">
					<label>Ville</label>
					<input v-model="cloneClient.city" type="text" class="form-control" :disabled="edit == false">
				</div>

				<div class="form-group col-md-6">
					<label>Pays</label>
					<input v-model="cloneClient.country" type="text" class="form-control" :disabled="edit == false">
				</div>


				<div class="form-group col-md-12">
					<label>Commentaire</label>
					<ckeditor :editor="editor" v-model="cloneClient.comment" :config="editorConfig" :disabled="edit == false"></ckeditor>
				</div>
			</div>

			<p class="tar" v-if="edit">
				<button type="button" class="btn btn-success" @click="save">Enregistrer</button>
			</p>
			<p class="tar" v-else>
				<button type="button" class="btn btn-primary" @click="edit = true"><fa icon="edit"></fa> Modifier</button>
			</p>
		</form>
						
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Vue from 'vue';
// @ is an alias to /src

export default {

	components: {
	},

	data()
	{
		return {
			editor: ClassicEditor,
			editorConfig: {
				// The configuration of the editor.
			},
			cloneClient: null,

			edit: false
		};
	},

	mounted()
	{
		this.refresh();
	},

	watch:{
		clientFile() { this.refresh(); }
	},

	methods: {
		refresh()
		{
			if (this.cloneClient == null) this.cloneClient = {};
			for (let field in this.clientFile)
			{
				if (field == 'comment') continue;
				Vue.set(this.cloneClient, field, this.clientFile[field]);
			}
			
			let self = this;
			setTimeout(() => { Vue.set(this.cloneClient, 'comment', self.clientFile.comment); }, 10);
		},
		save()
		{
			let self = this;

			this.dialogWaiting(true);

			this.storeClientUpdate(this.cloneClient).then(function()
			{
				self.dialogSuccess();
			});
		},

		...mapActions({
			storeClientUpdate: 'client/update',
		}),
	},
	computed: {
		birthday:{
			get()
			{
				if (this.cloneClient == null || this.cloneClient.birthday == null) return null;
				if (isNaN(Date.parse(this.cloneClient.birthday)) == false && this.cloneClient.birthday.indexOf('T') > 0)
				{
					return new Date(this.cloneClient.birthday).toISOString().split('T')[0];
				}
				return this.cloneClient.birthday;
			},

			set(val)
			{
				this.cloneClient.birthday = val;
			}
		},
		...mapState({
			clientFile: state => state.client.clientFile,
		})
	}

}
</script>
