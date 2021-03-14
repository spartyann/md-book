<template>
	<div>
		<label class="mb-0"><strong>Vitesse</strong></label>

		<div><small>Tenir compte de la personne dans l'appréciation de la vitesse.</small></div>
		<p>
			<input class="form-control form-control-sm d-inline mr-3" style="width:70px" type="number" v-model="mtcData.poul.vitesse"/>
			<rating :levels="vitesseLevels" v-model="mtcData.poul.vitesseEval"></rating>
		</p>

		<div class="row">
			<div class="col-md-6" v-for="(main) in ['gauche', 'droit']" :key="main">
				<div class="mb-2 mt-2">
					<strong>{{ main == 'gauche' ? 'Main Gauche' : 'Main Droite'}}</strong>
				</div>

				<rating v-model="mtcData.poul[main].regularite" :texts="['Non régulier', 'Très régulier']"></rating>
				<rating v-model="mtcData.poul[main].force" :texts="['Faible', 'Fort']"></rating>
				<rating v-model="mtcData.poul[main].profondeur" :texts="['Superficiel', 'Profond']"></rating>
				<rating v-model="mtcData.poul[main].diametre" :texts="['Fin', 'Large']"></rating>
				<rating v-model="mtcData.poul[main].tension" :texts="['Mou', 'Tendu (corde)']"></rating>
				<rating v-model="mtcData.poul[main].longueur" :texts="['Pas long', 'Long']"></rating>
				<rating v-model="mtcData.poul[main].racine" :texts="['Sans racine', 'Avec racine']"></rating>
				<rating v-model="mtcData.poul[main].glissant" :texts="['Non glissant', 'Glissant']"></rating>
				<rating v-model="mtcData.poul[main].rugueux" :texts="['Non rugueux', 'Rugueux']"></rating>

				<div v-for="(text, field) in commentsMain" :key="field">
					<div>{{ text }}</div>
					<textarea class="form-control" type="text" v-model="mtcData.poul[main][field]" />
				</div>
			</div>

			<div class="col-12 pt-3">
				<div>Commentaire</div>
				<RichText v-model="mtcData.poul.commentaire"></RichText>
			</div>
		</div>


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
			vitesseLevels: [ ['Très lent', 'Lent'], [ 'Normal'], ['Rapide', 'Très rapide']],

			commentsMain: {
				index: 'Ressenti sur l\'index',
				majeur: 'Ressenti sur le majeur',
				annulaire: 'Ressenti sur l\'annulaire'
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
