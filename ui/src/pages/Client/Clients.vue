<template>
	<div class="page-clients">
		<div class="container">

			<NewClientModal ref="NewClientModal"></NewClientModal>

			<h2><fa icon="users"></fa> Clients</h2>

			<p class="tar">
				<button class="btn btn-primary" @click="newClient"><fa icon="plus-circle"></fa> Nouveau client</button>
			</p>

			<b-table 
				striped
				hover
				small
				bordered
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
					<a @click="row.toggleDetails">
						{{ row.value }}
					</a>
				</template>

				<template #row-details="row">
					<b-card>
						<p>

							<router-link :to="{ name: 'Client', params: { clientId:row.item.id } }" class="btn btn-light">
								<fa icon="address-card"></fa> Ouvrir la fiche
							</router-link>
							&nbsp;
							<router-link :to="{ name: 'Client', params: { clientId:row.item.id }, query: {tab : 2} }" class="btn btn-light">
								<fa icon="book"></fa> Séances
							</router-link>
						</p>
						<h4>Commentaire</h4>
						<div class="ck-content" v-html="row.item.comment"></div>
					</b-card>
				</template>
			</b-table>
				
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import NewClientModal from '@/components/Client/NewClientModal';

// @ is an alias to /src

export default {

	name: 'Clients',

	components: {
		NewClientModal: NewClientModal
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
				key: 'lastName',
				label: "Nom",
				sortable: true
			},
			{
				key: 'firstName',
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
		newClient(){
			this.$refs.NewClientModal.open();
		},
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
