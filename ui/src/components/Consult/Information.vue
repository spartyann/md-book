<template>
	
		<form class="" v-if="consult != null && cloneConsult != null">

			<div class="row">

				<template v-for="(fieldParams, field) in fields">
					<div class="form-group col-md-12" :key="field">

						<label class="mb-0"><strong>{{fieldParams.title }}</strong></label>
						<div class="text-muted mb-1"><small>{{fieldParams.description }}</small></div>

						<div v-if="fieldParams.level != false" class="mb-2">
							<SmileyLevels v-model="cloneConsult[fieldParams.level]"></SmileyLevels>
						</div>

						<template v-if="field == 'date'">
							<DateTime v-model="cloneConsult.date"></DateTime>
						</template>
						<template v-else>
							<RichText v-model="cloneConsult[field]"></RichText>
						</template>

						<div class="tar mt-1">
							<span v-if="fieldsUpdating.indexOf(field) != -1" class="mr-3">
								<UpdatingIconItem :status="updateStatus"></UpdatingIconItem>
							</span>
							
							<!--<button type="button" class="btn btn-success" @click="save(fieldParams.level ? [ field, field + 'Level']: [ field ])">Enregistrer</button>-->
							<button type="button" class="btn btn-success" @click="save">
								Enregistrer
							</button>
						</div>
					</div>
				</template>

				<!--<div class="col-md-12">
					<button type="button" class="btn btn-success" @click="save()">Enregistrer tout</button>
				</div>-->
			</div>

			
		</form>
						
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Vue from 'vue';
// @ is an alias to /src

export default {

	components: {
	},

	data()
	{
		return {

			date: null,
			cloneConsult: null,

			fields: {
				date: { 
					title: "Date",
					description: "",
					level: false
				},
				preConsult: { 
					title: "Entretien",
					description: "Notez l'état actuel dui client et l'entretien de début de séance.",
					level: "currentClientLevel"
				},

				hypothesis: {
					title:"Hypothèses",
					description: "Notez vos hypothèses sur les problèmatiques du client, ses déséquilibres énergétiques.",
					level: false
				},
				report: { 
					title:"Compte rendu de séance",
					description: "Notez ce qu'il s'est passé pendant la séance, ce que vous avez fait.",
					level: false
				},
				reportClient: {
					title:"Retour immédiat du client",
					description: "Notez ce que le client a ressenti, ses impressions sur la séance.",
					level: "reportClientLevel"
				},
				reportClientPostConsult: {
					title:"Retour post-séance du client",
					description: "Notez les retours du client plusieurs jours après la séance.",
					level: "reportClientPostConsultLevel"
				},
			},
			
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
			let self = this;
			if (this.cloneConsult == null) this.cloneConsult = {};
			for (let field in this.consult)
			{
				if (field == 'date') self.cloneConsult.date = new Date(this.consult.date);
				else if (field == 'data') self.cloneConsult.data = this.consult.data;
				else setTimeout(() => { Vue.set(self.cloneConsult, field, self.consult[field]); }, 10);
			}
		},
		save()//fields = null)
		{
			let params = {
				id: this.consult.id,
			}
			/*if (fields != null)
			{
				for (let i in fields) params[fields[i]] = this.cloneConsult[fields[i]];
			}
			else
			{*/
				for (let field in this.cloneConsult)
				{
					if (field == 'data') continue;
					params[field] = this.cloneConsult[field];
				}
			//}

			this.storeConsultUpdate(params);
		},

		...mapActions({
			storeConsultUpdate: 'consult/update',
		}),
	},
	computed: {
		...mapState({
			consult: state => state.consult.consult,
			fieldsUpdating: state => state.consult.fieldsUpdating,
			updateStatus: state => state.consult.updateStatus,
		})
	}

}
</script>
