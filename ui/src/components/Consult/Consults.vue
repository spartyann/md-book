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
				<a :href="`#${row.value.replace(/[^a-z]+/i,'-').toLowerCase()}`" @click="row.toggleDetails">
					{{ row.value }}
				</a>
			</template>

			<template #row-details="row">
				<b-card>
					<p>
						<button class="btn btn-light"><fa icon="edit"></fa> Editer</button>
					</p>

					<div class="row">
						<div class="col-md-6">
							<h4>Entretien</h4>
							<div v-html="row.item.pre_consult"></div>
						</div>
						<div class="col-md-6">
							<h4>Rapport de séance</h4>
							<div v-html="row.item.report"></div>
						</div>
						<div class="col-md-6">
							<h4>Retour du client</h4>
							<div v-html="row.item.report_client"></div>
						</div>
						<div class="col-md-6">
							<h4>Retour du client quelques jours après</h4>
							<div v-html="row.item.report_client_post_consult"></div>
						</div>
					</div>
				</b-card>
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
					formatter: (value) => {
						return self.$d(new Date(value), 'longDate')
					}
				}
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
