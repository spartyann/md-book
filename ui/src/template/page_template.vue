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
					<ul class="navbar-nav mr-auto">
						
						<li class="nav-item" >
							<router-link :to="{ name: 'client' }" class="nav-link">Clients</router-link>
						</li>
						<li class="nav-item" >
							<router-link :to="{ name: 'sessions' }" class="nav-link">Séances</router-link>
						</li>
					</ul>
					<!-- Right Side Of Navbar -->
					<ul class="navbar-nav ml-auto">
					<!-- Authentication Links -->
					
						<li class="nav-item">
							<a class="nav-link" href="/login">Se connecter</a>
						</li>
					
						<li class="nav-item">
							<a class="nav-link" href="/register">S'inscire</a>
						</li>
					
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

	}
}
</script>
