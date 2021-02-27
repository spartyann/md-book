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
							</div>
							<div class="form-group">
								<input v-model="pwd" type="password" class="form-control" placeholder="Confirmation">
							</div>

							<p class="tar">
								<button type="submit" class="btn btn-primary" @click="save">Enregistrer</button>
							</p>
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
			pwd: ''
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

			this.storeLogin({
				email: this.email,
				pwd: this.pwd
			}).then(function(user)
			{
				if (user == null) return;
				self.$router.push({ name: 'Dashboard'});
			}).catch(function () {});
		},

		...mapActions({
			storeLogin: 'login',
		}),
	},
	computed: {
		...mapState({
			user: state => state.user,
		})
	}

}
</script>
