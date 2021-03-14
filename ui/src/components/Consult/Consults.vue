<template>
	<div>
		<NewConsultModal ref="newConsultModal" :clientId="clientId"></NewConsultModal>

		<div class="tbl-100 mb-1">
			<div class="td vab">
				<b>Consultations</b>
			</div>
			<div class="td-50 tar">
				<button class="btn btn-primary float-right" @click="openNewConsultModal"><fa icon="plus-circle"></fa> Nouvelle séance</button>
			</div>
		</div>

		<b-table 
			striped
			hover
			small
			bordered
			:items="consults === null ? [] : consults"
			:fields="fields"
			:busy="consults === null"
		>
			<template #table-busy>
				<div class="text-center text-primary my-2">
					<b-spinner class="align-middle mr-3"></b-spinner>
					<strong>Chargement des consultations...</strong>
				</div>
			</template>

			<template #cell(date)="row">
				<!--<a @click="row.toggleDetails">
					{{ row.value }}
				</a>-->

				<router-link :to="{ name: 'Consult', params: { consultId: row.item.id } }">
					{{ row.value }}
				</router-link>
			</template>

			<template #cell(currentClientLevel)="row">
				<IconLevels :level="row.value" :readonly="true"></IconLevels>
			</template>

			<template #cell(reportClientPostConsultLevel)="row">
				<IconLevels :level="row.value" :readonly="true"></IconLevels>
			</template>

			<template #cell(reportClientLevel)="row">
				<IconLevels :level="row.value" :readonly="true"></IconLevels>
			</template>
		</b-table>



	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import NewConsultModal from './NewConsultModal';
// @ is an alias to /src

export default {

	props: {
		clientId: { type: Number }
	},
	components: {
		NewConsultModal
	},

	data()
	{
		let self = this;
		return {
			fields: [
				{
					key: 'id',
					label: "Id",
					sortable: true
				},
				{
					key: 'date',
					label: "Date",
					sortable: true,
					sortKey: 'date',
					sortByFormatted: false,
					formatter: (value) => {
						return self.$d(new Date(value), 'long')
					}
				},
				{
					key: 'currentClientLevel',
					label: "Etat courant du client",
					sortable: true
				},
				{
					key: 'reportClientLevel',
					label: "Retour client immédiat",
					sortable: true
				},
				{
					key: 'reportClientPostConsultLevel',
					label: "Retour post-séance",
					sortable: true
				},
			],
		};
	},

	mounted()
	{
		this.storeConsultList(this.clientId);
	},
	methods: {
		openNewConsultModal()
		{
			this.$refs.newConsultModal.open();
		},
		...mapActions({
			storeConsultList: 'consult/list',
		}),
	},

	computed: {
		...mapState({
			consults: state => state.consult.consults,
		})
	}
}
</script>
