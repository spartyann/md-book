<template>
	<b-modal id="MsgModale" centered v-model="modalVisible" data-keyboard="false"
		no-close-on-esc
		hide-header-close
		>
		<template #modal-header >
			<h5><fa icon="plus-circle" class="text-primary"></fa> Nouvelle page</h5>
		</template>
		<template #default >
			<div>
				<form class="">
					<div class="form-group">
						<label>Titre</label>
						<input v-model="title" type="text" class="form-control">
					</div>
					<div class="form-group">
						<label>Page parente</label>
						<select v-model.number="parentId" class="form-control form-control-sm">
							<option :value="null">[Aucune]</option>
							<option v-for="(id) in wikiOrderedPageIds" :key="id" :value="id">{{ wikiPages[id].fullNames.join(' / ')}}</option>
						</select>
					</div>
				</form>
			</div>
		</template>
		<template #modal-footer="">
			<b-button size="sm" variant="secondary" @click="cancel">Annuler</b-button>
			<b-button size="sm" variant="success" @click="create">Créer la page</b-button>
		</template>
	</b-modal>

</template>

<script>
import WikiBaseComponent from "@/store/tools/wikiBaseComponent";
// @ is an alias to /src

export default {

	extends: WikiBaseComponent,
	props: {

	},
	components: {
	},

	data()
	{
		return {
			modalVisible: false,
			title: "",
			parentId: null,
		};
	},

	mounted()
	{
		
	},
	methods: {
		open()
		{
			this.modalVisible = true;
		},
		cancel()
		{
			this.modalVisible = false;
		},
		create()
		{
			let self = this;

			this.dialogWaiting(true);

			this.storeCreatePage({
				title: this.title,
				parentId: this.parentId,
			}).then(function(page)
			{
				self.dialogSuccess();
				self.modalVisible = false;

				self.$router.push({ name: 'WikiPage', params: { pageId: page.id } });
			});
			
		},

	},

	computed: {
		
	}
}
</script>
