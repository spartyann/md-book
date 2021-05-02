<template>
	<div class="page-login">
		<div class="container-fluid">
			<div class="row justify-content-center">
				
				<div class="col-lg-5">
					<div class="card">
						<div class="card-header">
							Créer mon compte
						</div>
						<div class="card-body">

							<div class="row">
								<div class="form-group col-6">
									<label>Nom</label>
									<input v-model="firstName" type="text" class="form-control">
								</div>
								<div class="form-group col-6">
									<label>Prénom</label>
									<input v-model="lastName" type="text" class="form-control">
								</div>
								<div class="form-group col-12">
									<label>Email</label>
									<input v-model="email" type="email" class="form-control">
								</div>
								<div class="form-group col-6">
									<label>Mot de passe</label>
									<input v-model="pwd" type="password" class="form-control">
									
								</div>
								<div class="form-group col-6">
									<label>Confirmez</label>
									<input v-model="confirmPwd" type="password" class="form-control">
									<small class="text-danger" v-if="passwordError"><i>Les deux mots de passe sont différents</i></small>
								</div>
								<div class="form-group col-12">
									<label>Code d'invitation</label>
									<input v-model="registrationCode" type="text" class="form-control">
								</div>
							</div>
						
							<button type="submit" class="btn btn-success" @click="register" :disabled="formValid == false">Créer mon compte</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
const isDebug = process.env.VUE_APP_ENV == "development";

export default {

	name: 'Register',

	components: {

	},

	data()
	{
		let rand = Math.floor(Math.random() * 1000000);
		const testEmail = rand + '@email.fr';
		const testName = rand + '';

		const code = this.$route.query.code == undefined ? '' : this.$route.query.code;

		return {
			firstName: isDebug ? testName : '',
			lastName: isDebug ? testName : '',
			registrationCode: code,
			email: isDebug ? testEmail : '',
			pwd: isDebug ? testEmail : '',
			confirmPwd: isDebug ? testEmail : ''
		};
	},

	mounted()
	{
		//let self = this;

	},

	methods: {
		register()
		{
			let self = this;

			if (this.formValid == false) return;

			this.storeUserRegister({
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				pwd: this.pwd,
				registrationCode: this.registrationCode,
			}).then(function(user)
			{
				if (user == null) return;
				self.$router.push({ name: 'Dashboard'});
			}).catch(function () {});
		},

		...mapActions({
			storeUserRegister: 'user/register',
		}),
	},
	computed: {
		passwordError()
		{
			if (this.pwd == '' && this.confirmPwd == '') return false;
			return this.pwd != this.confirmPwd;
		},

		formValid(){
			return this.passwordError == false && this.pwd != '' && this.firstName != '' && this.lastName != '' && this.email != '';
		},
		...mapState({
			user: state => state.user.user.loggedUser,
		})
	}
}
</script>
