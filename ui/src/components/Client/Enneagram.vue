<template>
	
		<form class="" v-if="clientFile != null && cloneClient != null">

			<div class="row">
				
				<div class="form-group col-md-6">
					<label>Enneatype</label>
					<select v-model="enneatype" class="form-control">
						<option v-for="(text, n) in enneatypes" :value="n" :key="n">{{ text }}</option>
					</select>
				</div>

				<div class="form-group col-md-6">
					<label>Aile</label>
					<select v-model="aile" class="form-control">
						<option v-for="(text, n) in ailes" :value="n" :key="n">{{ text }}</option>
					</select>
				</div>

				<div class="form-group col-md-6">
					<label>Variante</label>
					<select v-model="variante" class="form-control">
						<option v-for="(text, n) in variantes" :value="n" :key="n">{{ text }}</option>
					</select>
				</div>

				<div class="form-group col-md-12">
					<label>Commentaire</label>
					<RichText v-model="cloneClient.data.enneagramme.comment"></RichText>
				</div>
			</div>

			<p class="tar">
				<button type="button" class="btn btn-success ctrl-s" @click="save">Enregistrer</button>
			</p>
		</form>
						
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Vue from 'vue';
import Enneagram from '../../lib/Enneagram';

// @ is an alias to /src

export default {

	components: {
	},

	data()
	{
		return {
			cloneClient: null,
		};
	},

	mounted()
	{
		this.refresh();
	},

	watch:{
		clientFile() { this.refresh(); }
	},

	methods: {

		refresh()
		{
			if (this.cloneClient == null) this.cloneClient = {};
			for (let field in this.clientFile)
			{
				Vue.set(this.cloneClient, field, this.clientFile[field]);
			}
		},
		save()
		{
			let self = this;

			this.dialogWaiting(true);

			this.storeClientUpdate(this.cloneClient).then(function()
			{
				self.dialogSuccess();
			});
		},

		...mapActions({
			storeClientUpdate: 'client/update',
		}),
	},
	computed: {
		enneatypes() { return Enneagram.enneatypes; },
		ailes() { return Enneagram.getAiles(this.cloneClient.data.enneagramme.enneatype); },
		variantes() { return Enneagram.getVariates(this.cloneClient.data.enneagramme.enneatype); },

		enneatype: {
			get() { return this.cloneClient.data.enneagramme.enneatype; },
			set(val) { this.cloneClient.data.enneagramme.enneatype = parseInt(val); }
		},

		aile: {
			get() { return this.cloneClient.data.enneagramme.aile; },
			set(val) { this.cloneClient.data.enneagramme.aile = parseInt(val); }
		},
		
		variante: {
			get() { return this.cloneClient.data.enneagramme.variante; },
			set(val) { this.cloneClient.data.enneagramme.variante = val; }
		},

		...mapState({
			clientFile: state => state.client.clientFile,
		})
	}

}
</script>
