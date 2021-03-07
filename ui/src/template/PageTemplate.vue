<template>
	<div>
		<nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
			<div class="container">

				<a class="navbar-brand" href="/">
					<img alt="Vue logo" src="@/assets/logo.png" height="100%"> MD-Book
				</a>

				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<template v-if="user != null">
						<ul class="navbar-nav mr-auto">
							<li class="nav-item" >
								<router-link :to="{ name: 'Clients' }" class="nav-link"><fa icon="users"></fa> Clients</router-link>
							</li>
							<li class="nav-item" v-if="isDebug">
								<router-link :to="{ name: 'Test' }" class="nav-link"><fa icon="cogs"></fa>  Test</router-link>
							</li>
							
						</ul>
					</template>
					<!-- Right Side Of Navbar -->
					<ul class="navbar-nav ml-auto">
					<!-- Authentication Links -->
					
						<template v-if="user == null">
							<li class="nav-item">
								<router-link :to="{ name: 'Login' }" class="nav-link">Se connecter</router-link>
							</li>
							<li class="nav-item">
								<router-link :to="{ name: 'Register' }" class="nav-link">S'inscire</router-link>
							</li>
						</template>
					
						<template v-else>
							<li class="nav-item dropdown">
								<a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									{{ user.name }}
								</a>
								<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
									<router-link :to="{ name: 'MyAccount' }" class="dropdown-item">
										Mon compte
									</router-link>
									<a class="dropdown-item" @click="logout" href="#">
										Se déconnecter
									</a>
								</div>
								
							</li>
						</template>
					</ul>
				</div>
			</div>
		</nav>

		<main class="py-4">
			<slot></slot>
		</main>
		
	</div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {

	name: 'Home',

	components: {
	},

	data()
	{
		return {
		};
	},

	mounted()
	{

	},

	methods:{
		logout()
		{
			let self = this;
			this.storeUserLogout().then(function(){
				self.$router.push({ name: 'Login'});
			});
		},
		...mapActions({
			storeUserLogout: 'user/logout',
		}),
	},

	computed: {
		isDebug() { return process.env.VUE_APP_ENV == "development"; },
		...mapState({
			user: state => state.user.loggedUser,
		})
	}
}
</script>
