<template>
	
		<form class="" v-if="clientFile != null">
			<div class="form-group">
				<label>Nom complet</label>
				<input v-model="name" type="text" class="form-control" :disabled="edit == false">
			</div>
			<div class="form-group">
				<label>Prénom</label>
				<input v-model="firstName" type="text" class="form-control" :disabled="edit == false">
			</div>
			<div class="form-group">
				<label>Nom</label>
				<input v-model="lastName" type="text" class="form-control" :disabled="edit == false">
			</div>
			<div class="form-group">
				<label>Email</label>
				<input v-model="email" type="email" class="form-control" :disabled="edit == false">
			</div>
			<div class="form-group">
				<label>Commentaire</label>
				<ckeditor :editor="editor" v-model="comment" :config="editorConfig" :disabled="edit == false"></ckeditor>
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

			name: '',
			lastName: '',
			firstName: '',
			email: '',
			comment: '',

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
			this.name = this.clientFile.name;
			this.lastName = this.clientFile.lastName;
			this.firstName = this.clientFile.firstName;
			this.email = this.clientFile.email;

			let self = this;
			
			setTimeout(() => {self.comment = self.clientFile.comment;}, 10);
		},
		save()
		{
			let self = this;

			this.dialogWaiting(true);

			this.storeClientUpdate({
				id: this.clientFile.id,
				name: this.name,
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				comment: this.comment,
			}).then(function()
			{
				self.dialogSuccess();
			});
		},

		...mapActions({
			storeClientUpdate: 'client/update',
		}),
	},
	computed: {
		...mapState({
			clientFile: state => state.client.clientFile,
		})
	}

}
</script>
