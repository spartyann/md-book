<template>
	<div class="page-clients" v-if="client != null">
		<div class="container">

			<h3>{{ client.name }}</h3>
				
			<Consults :clientId="clientId"></Consults>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Consults from '../components/Consult/Consults';

// @ is an alias to /src

export default {

	components: {
		Consults: Consults
	},

	data()
	{
		return {
		
		};
	},

	mounted()
	{
		this.storeClientGet(this.clientId)
	},
	methods: {
		...mapActions({
			storeClientGet: "client/get"
		}),
	},

	computed: {
		clientId() { return parseInt(this.$route.params.clientId); },
		
		...mapState({
			client: state => state.client.client,
		})
	}
}
</script>
