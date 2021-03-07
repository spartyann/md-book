<template>
	<div class="page-login">
		<div class="container-fluid">
			<div class="row justify-content-center">
				
				<div class="col-lg-5">
					<div class="card">
						<div class="card-header">
							Se connecter
						</div>
						<div class="card-body">

							<div class="form-group">
								<label>Email</label>
								<input v-model="email" type="email" class="form-control">
							</div>
							<div class="form-group">
								<label>Mot de passe</label>
								<input v-model="pwd" type="password" class="form-control">
							</div>

							<button type="submit" class="btn btn-primary" @click="login">Se connecter</button>
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

	name: 'Login',

	components: {

	},

	data()
	{
		return {
			email: isDebug ? 'admin@admin.fr' : '',
			pwd: isDebug ? 'admin@admin.fr' : ''
		};
	},

	mounted()
	{
		//let self = this;

	},

	methods: {
		login()
		{
			let self = this;

			this.storeUserLogin({
				email: this.email,
				pwd: this.pwd
			}).then(function(user)
			{
				if (user == null) return;
				self.$router.push({ name: 'Dashboard'});
			}).catch(function () {});
		},

		...mapActions({
			storeUserLogin: 'user/login',
		}),
	},
	computed: {
		...mapState({
			user: state => state.user.user.loggedUser,
		})
	}
}
</script>
