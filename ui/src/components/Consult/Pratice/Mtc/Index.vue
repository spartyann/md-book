<template>
	<div v-if="mtcData != null">

		<Panel>
			<span slot="header"><fa icon="sign-language"></fa> Prise de poul</span>
			<Poul :mtcData="mtcData"></Poul>

			<BtnSaveData @click="save">Enregistrer</BtnSaveData>
		</Panel>

		<Panel>
			<span slot="header"><fa icon="grin-tongue"></fa> Observation de la langue</span>
			<Langue :mtcData="mtcData"></Langue>

			<BtnSaveData @click="save">Enregistrer</BtnSaveData>
		</Panel>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Poul from './Poul';
import Langue from './Langue';

import BtnSaveData from '../../BtnSaveData';

export default {

	props: {
	},
	components: {
		Poul,
		Langue,
		BtnSaveData,
	},

	data()
	{
		return {
			mtcData: null
		};
	},

	mounted()
	{
		this.refresh();
	},
	watch:{
		consult() { this.refresh(); }
	},

	methods: {
		refresh()
		{
			if (this.consult == null) return;
			this.mtcData = this.consult.data.mtc;
		},
		save()
		{
			let data = this.consult.data;
			data.mtc = this.mtcData;

			let params = {
				id: this.consult.id,
				data: data
			}

			this.storeConsultUpdate(params);
		},
		...mapActions({
			storeConsultUpdate: 'consult/update',
		}),
	},

	computed: {
		...mapState({
			consult: state => state.consult.consult,
		})
	}
}
</script>
