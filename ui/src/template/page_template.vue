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
								<router-link :to="{ name: 'client' }" class="nav-link">Clients</router-link>
							</li>
							<li class="nav-item" >
								<router-link :to="{ name: 'sessions' }" class="nav-link">Séances</router-link>
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
								<a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
									User Name
								</a>
								<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
									<a class="dropdown-item" href="/logout"
										onclick="event.preventDefault();
														document.getElementById('logout-form').submit();">
										Logout
									</a>
									<form id="logout-form" action="/logout" method="POST" class="d-none">
										@csrf
									</form>
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

import { mapState } from 'vuex'

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

	computed: {


		...mapState({
			user: state => state.user,
		})
	}
}
</script>
