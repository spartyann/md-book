<template>
	<div class="page-client" v-if="consult != null && clientFile != null && consultData !== null">
		<div class="container">

			<h2><fa icon="book"></fa> {{ $d(new Date(consult.date), 'long' ) }} - {{ clientFile.name }}</h2>

			<div class="mb-2 mt-3">
				<router-link :to="{ name: 'Client', params: { clientId: clientFile.id }, query: {tab : 2} }" class="">
					<fa icon="arrow-left"></fa> Séances
				</router-link>
			</div>
			<b-card no-body class="mt-4">
				<b-tabs card v-model="tabIndex">
					<b-tab title="Informations générales">
						<ConsultInformation></ConsultInformation>
					</b-tab>
					<b-tab title="MTC" >
						<MtcIndex></MtcIndex>
					</b-tab>
				</b-tabs>
			</b-card>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ConsultInformation from "@/components/Consult/Information";
import MtcIndex from '@/components/Consult/Pratice/Mtc/Index';

export default {


	components: {
		ConsultInformation,
		MtcIndex
	},

	data()
	{
		let tab = parseInt(this.$route.query.tab != undefined ? this.$route.query.tab : 0);

		return {
			tabIndex: tab,
			consultData : null
		};
	},

	mounted()
	{
		let self = this;

		this.dialogWaiting();

		this.storeConsultGet(this.consultId).then((consult) => {
			self.storeClientFile(consult.clientId);
			self.dialogHide();
		});

		this.refresh();
	},

	watch: {
		consult() { this.refresh(); }
	},

	methods: {
		refresh()
		{
			if (this.consult != null) this.consultData = this.consult.data;
		},
		...mapActions({
			storeClientFile: 'client/file',
			storeConsultGet: 'consult/get'
		}),
	},

	computed: {
		consultId() { return parseInt(this.$route.params.consultId); },

		...mapState({
			clientFile: state => state.client.clientFile,
			consult: state => state.consult.consult,
		})
	}
}
</script>
