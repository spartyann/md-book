<template>
	<div class="wiki-page container-fluid">
		<div class="row">
			<div class="col-12">
				<h2><fa :icon="['fas', 'file-alt']"></fa> {{ page.title }}</h2>

				<div>
					<div v-for="(catId) in wikiPageCatMaps[page.id]" :key="catId">
						<fa :icon="['far', 'folder']"></fa> {{ wikiCats[catId].fullNames.join(' / ') }}
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-lg-7 ">

				<div class="form-group d-print-none">
					<input v-model="clonePage.title" type="text" class="form-control">
				</div>

				<RichText v-model="clonePage.content.text"></RichText>
				<p class="tar mt-3">
					<UpdatingIconItem :status="wikiUpdateStatus"></UpdatingIconItem>
					<button type="button" class="btn btn-success ctrl-s ml-3" @click="save">Enregistrer</button>
				</p>
			</div>
			<div class="col-lg-5 d-print-none">

				<embed :src="link" 
				v-for="(link) in clonePage.content.media_links" 
				:key="link" style="height: 300px;" />
				
				<p><input v-model="newMediaLink" type="text" class="form-control" placeholder="https://www.youtube.com/watch?v=xxxxxxxx"></p>
				<div class="tar"><button type="button" class="btn btn-primary" @click="addMediaLink">Ajouter</button></div>
			</div>
		</div>
		
	</div>
</template>

<script>
// @ is an alias to /src

import WikiBaseComponent from "@/store/tools/wikiBaseComponent";

export default {

	name: 'WikiPage',

	extends: WikiBaseComponent,

	components: {
		
	},

	props: {
		page: {}
	},

	data()
	{
		return {
			clonePage: { ...this.page},
			newMediaLink: ''
		};
	},

	mounted()
	{
		//storePageUpdate
	},

	methods: {
		save(){
			let self = this;
			let params = {
				id: this.clonePage.id,
			}

			for (let field in this.clonePage)
			{
				if (field == 'data') continue;
				params[field] = this.clonePage[field];
			}

			this.storePageUpdate(params).then(() => {
				self.dialogSuccess();
			});
		},

		addMediaLink(){
			this.clonePage.content.media_links.push(this.newMediaLink);
			this.newMediaLink = "";
		}
	}
}
</script>
