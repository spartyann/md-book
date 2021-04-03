<template>
	<div class="page-client" v-if="clientFile != null">
		<div class="container">

			<h2>
				<fa icon="address-card"></fa>
				{{clientFile.name}}
				<template v-if="age != ''">( {{ age }} ans )</template>
			</h2>

			
			<b-card no-body class="mt-4">
				<b-tabs card v-model="tabIndex">
					<b-tab title="Informations">
						<ClientInformation></ClientInformation>
					</b-tab>

					<b-tab title="Ennéagramme">
						<ClientEnneagram></ClientEnneagram>
					</b-tab>

					<b-tab title="Séances">
						<Consults :clientId="clientId"></Consults>
					</b-tab>

					<b-tab title="Stats">
						<GlobalClientsStatesChart :clientId="clientId"></GlobalClientsStatesChart>
					</b-tab>
				</b-tabs>
			</b-card>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Consults from '@/components/Consult/Consults';
import ClientInformation from '@/components/Client/Information';
import ClientEnneagram from '@/components/Client/Enneagram';

import GlobalClientsStatesChart from '@/components/Client/Stats/GlobalClientsStatesChart'
import Tools from "@/lib/Tools";

export default {


	components: {
		Consults,
		ClientInformation,
		GlobalClientsStatesChart,
		ClientEnneagram
	},

	data()
	{
		let tab = parseInt(this.$route.query.tab != undefined ? this.$route.query.tab : 0);

		return {
			tabIndex: tab
		};
	},

	mounted()
	{
		this.storeClientFile(this.clientId);

	},
	methods: {

		...mapActions({
			storeClientFile: 'client/file'
		}),
	},

	computed: {
		age() { return Tools.calculateAge(this.clientFile.birthday); },
		clientId() { return parseInt(this.$route.params.clientId); },
		...mapState({
			clientFile: state => state.client.clientFile
		})
	}
}
</script>
