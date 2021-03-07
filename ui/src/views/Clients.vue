<template>
	<div class="page-clients">
		<div class="container">

			<h2><fa icon="users"></fa> Clients</h2>

			<p class="tar">
				<button class="btn btn-primary"><fa icon="plus-circle"></fa> Nouveau client</button>
			</p>

			<b-table 
				striped
				hover
				small
				:items="clients === null ? [] : clients"
				:fields="fields"
				:busy="clients === null"
			>
				<template #table-busy>
					<div class="text-center text-primary my-2">
						<b-spinner class="align-middle mr-3"></b-spinner>
						<strong>Chargement des clients...</strong>
					</div>
				</template>

				<template #cell(name)="row">
					<a :href="`#${row.value.replace(/[^a-z]+/i,'-').toLowerCase()}`" @click="row.toggleDetails">
						{{ row.value }}
					</a>
				</template>

				<template #row-details="row">
					<b-card>
						<p>
							<button class="btn btn-light"><fa icon="edit"></fa> Editer</button>
							&nbsp;
							<router-link :to="{ name: 'Consults', params: { clientId:row.item.id } }" class="btn btn-light">
								<fa icon="book"></fa> Séances
							</router-link>
							&nbsp;
							<button class="btn btn-light"><fa icon="plus"></fa> Nouvelle séance</button>
						</p>
						<h4>Commentaire</h4>
						<div v-html="row.item.comment"></div>
					</b-card>
				</template>
			</b-table>
				
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
// @ is an alias to /src

export default {

	name: 'Clients',

	components: {
	},

	data()
	{
		return {
		fields: [
			{
				key: 'id',
				label: "Id",
				sortable: true
			},
			{
				key: 'name',
				label: "Nom complet",
				sortable: true
			},
			{
				key: 'last_name',
				label: "Nom",
				sortable: true
			},
			{
				key: 'first_name',
				label: "Prénom",
				sortable: true
			},
			{
				key: 'email',
				label: 'Email',
				sortable: true,
			}
		],
		};
	},

	mounted()
	{
		this.storeClientList();
	},
	methods: {
		
		...mapActions({
			storeClientList: 'client/list',
		}),
	},

	computed: {
		...mapState({
			clients: state => state.client.clients,
		})
	}
}
</script>
