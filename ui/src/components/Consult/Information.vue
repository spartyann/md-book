<template>
	
		<form class="" v-if="consult != null && cloneConsult != null">

			<div class="row">
				
				<div class="col-md-12">
					<DateTime v-model="cloneConsult.date"></DateTime>
					<div class="tar mt-1">
						<span v-if="fieldsUpdating.indexOf('date') != -1" class="mr-3">
							<UpdatingIconItem :status="updateStatus"></UpdatingIconItem>
						</span>

						<button type="button" class="btn btn-success" @click="save('date')">Enregistrer</button>
					</div>
				</div>

				<template v-for="(title, field) in fields">
					<div class="form-group col-md-12" :key="field">
						<label>{{title}}</label>
						<ckeditor :editor="editor" v-model="cloneConsult[field]" :config="editorConfig"></ckeditor>
						<div class="tar mt-1">
							<span v-if="fieldsUpdating.indexOf(field) != -1" class="mr-3">
								<UpdatingIconItem :status="updateStatus"></UpdatingIconItem>
							</span>

							<button type="button" class="btn btn-success" @click="save(field)">Enregistrer</button>
						</div>
					</div>
				</template>

				<div class="col-md-12">
					<button type="button" class="btn btn-success" @click="save()">Enregistrer tout</button>
				</div>
			</div>

			
		</form>
						
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Vue from 'vue';
// @ is an alias to /src

export default {

	components: {
	},

	data()
	{
		return {
			editor: ClassicEditor,
			editorConfig: {
				// The configuration of the editor.
			},

			date: null,
			cloneConsult: null,

			fields: {
				preConsult: "Entretien",
				hypothesis: "Hypothèses",
				report: "Comtpe rendu de séance",
				reportClient: "Retour immédiat du client",
				reportClientPostConsult: "Retour post-séance du client",
			}
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
				else setTimeout(() => { Vue.set(self.cloneConsult, field, self.consult[field]); }, 10);
			}
		},
		save(field = null)
		{
			this.fieldSaving = field;

			let params = {
				id: this.consult.id,
			}
			if (field != null)
			{
				params[field] = this.cloneConsult[field];
			}
			else
			{
				for (let i in this.cloneConsult) params[i] = this.cloneConsult[i];
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
			fieldsUpdating: state => state.consult.fieldsUpdating,
			updateStatus: state => state.consult.updateStatus,
		})
	}

}
</script>
