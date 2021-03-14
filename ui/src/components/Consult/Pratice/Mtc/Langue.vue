<template>
	<div>

		<label class="mb-0"><strong>Aspect global</strong></label>
		<div class="row">

			<div class="col-12 mt-2">
				<div class="d-inline-block mr-4 mb-2" v-for="(params, field) in globalLevels" :key="field">
					<rating v-model="mtcData.langue.global[field]" :texts="params.texts" :levels="params.levels"></rating>
				</div>

			</div>
			
			<div class="col-md-6 mt-2">
				<div>Enduit</div>
				<div class="d-inline-block mr-4 mb-2" v-for="(params, field) in globalEnduit" :key="field">
					<rating v-model="mtcData.langue.global[field]" :texts="params.texts" :levels="params.levels"></rating>
				</div>
			</div>
			
			<div class="col-md-6  mt-2">
				<div>Points rouges</div>
				<div class="d-inline-block mr-4 mb-2" v-for="(params, field) in globalPoints" :key="field">
					<rating v-model="mtcData.langue.global[field]" :texts="params.texts" :levels="params.levels"></rating>
				</div>
			</div>

			<div class="col-md-6  mt-2">
				<div>Fissure</div>
				<div class="d-inline-block mr-4 mb-2">
					<rating v-model="mtcData.langue.fissure.profondeur" :texts="['Aucune', 'Légère', 'Profonde']"></rating>

					<b-button-group size="sm">
						<b-button
							v-for="(text, field) in fissureLocations"
							:key="field"
							:pressed="mtcData.langue.fissure.zones[field] == true"
							@click="mtcData.langue.fissure.zones[field] == true ? mtcData.langue.fissure.zones[field] = false : mtcData.langue.fissure.zones[field] = true"
							variant="light"
							class="btn-level">
							{{ text }}
						</b-button>
					</b-button-group>

				</div>
			</div>

			<div class="col-12 pt-3">
				<div>Commentaire</div>
				<RichText v-model="mtcData.langue.global.commentaire"></RichText>
			</div>
		</div>

		

		<pre>{{ mtcData.langue }}</pre>


	</div>
</template>

<script>
import { mapState } from 'vuex';
// @ is an alias to /src

export default {

	props: {
		mtcData: { type: Object }
	},
	components: {
		
	},

	data()
	{
		return {
			globalLevels: {
				epaisseur: { texts: ['Fine', 'Epaisse / Enflée'] },
				longueur:  { texts: ['Courte', 'Longue'] },
				durete:  { texts: ['Flasque / Molle', 'Dure / Rigide'] },
				humidite:  { texts: ['Sèche', 'Humide', 'Très humide'] },
				indentee:  { texts: ['Non indentée', 'Très indentée'] },

				couleur:  { levels: [ ['Blanche'], ['Rose' ], ['Rouge', 'Rouge foncé', 'Pourpre', 'Bleue'] ], },
				
			},

			globalEnduit: {
				enduit:  { levels: [ ['Aucun'], ['Fin' ], ['Epais'] ], },
				enduitCouleur:  { levels: [ ['Blanc'], ["Jaune clair", 'Jaune' ], ['Gris', 'Noir'] ], },
			},
			globalPoints: {
				pointsRouges:  { levels: [ ['Aucun'], ['Petits' ], ['Gros'] ], },
			},

			fissureLocations: {
				rein: "Rein, Vessie, Intestins",
				rate: "Rate, Estomac",
				poumon: "Poumon",
				coeur: "Coeur",
			}
		};
	},

	mounted()
	{
		
	},
	methods: {
		
	},

	computed: {
		...mapState({
			
		})
	}
}
</script>
