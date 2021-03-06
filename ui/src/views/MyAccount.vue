<template>
	<div class="page-home">
		<div class="container-fluid">
			<div class="row justify-content-center">
				
				<div class="col-lg-5">
					<div class="card">
						<div class="card-header">
							Mon compte
						</div>
						<div class="card-body">
							<form class="">
								<div class="form-group">
									<label>Prénom</label>
									<input v-model="first_name" type="text" class="form-control">
								</div>
								<div class="form-group">
									<label>Nom</label>
									<input v-model="last_name" type="text" class="form-control">
								</div>
								<div class="form-group">
									<label>Email</label>
									<input v-model="email" type="email" class="form-control">
								</div>
								<div class="form-group">
									<label>Changer mon mot de passe</label>
									<input v-model="pwd" type="password" class="form-control" placeholder="Nouveau mot de passe">
									<div class="text-danger fz-80" v-if="passwordLengthOk == false">Les mot de passe doit comporter au moins 8 caractères</div>
								</div>
								<div class="form-group">
									<input v-model="pwdConfirm" type="password" class="form-control" placeholder="Confirmation">
									<div class="text-danger fz-80" v-if="passwordOk == false">Les mots de passe sont différents</div>
								</div>

								<p class="tar">
									<button type="button" class="btn btn-primary" @click="save" :disabled="passwordOk == false">Enregistrer</button>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
// @ is an alias to /src

export default {

	name: 'MyAccount',

	components: {
	},

	data()
	{
		return {
			last_name: '',
			first_name: '',
			email: '',
			pwd: '',
			pwdConfirm : ''
		};
	},

	mounted()
	{
		this.last_name = this.user.last_name;
		this.first_name = this.user.first_name;
		this.email = this.user.email;
	},

	methods: {
		save()
		{
			let self = this;

			if (this.passwordOk == false) return;

			this.storeUpdate({
				id: this.user.id,
				first_name: this.first_name,
				last_name: this.last_name,
				email: this.email,
				pwd: this.pwd == '' ? null : this.pwd,
			}).then(function(){
				self.message("Vos informations ont bien été enregistrée.");
			});
		},

		...mapActions({
			storeUpdate: 'update',
			message: 'message'
		}),
	},
	computed: {
		passwordLengthOk()
		{
			if (this.pwd == '') return true;
			return this.pwd.length >= 8;
		},
		passwordOk()
		{
			if (this.pwd == '' && this.pwdConfirm == '') return true;
			if (this.pwd.length < 8) return false
			return this.pwd == this.pwdConfirm;
		},
		...mapState({
			user: state => state.user,
		})
	}

}
</script>
