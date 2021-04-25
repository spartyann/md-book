<template>
	<div class="wiki-page container-fluid">
		<div class="row">
			<div class="col-12">
				<h2>
					<fa :icon="['fas', 'file-alt']"></fa> {{ page.title }}
				</h2>
				<p>
					<i>{{ page.subTitle }}</i>
				</p>
				<p class="hover-handler" v-if="editParent == false">
					<fa :icon="['far', 'folder']"></fa> {{ fullNames.join(' / ') }}
					<a class="hover-only" @click="editParent = true"><fa :icon="['far', 'edit']"></fa></a>
				</p>
				<p v-else>
					<select v-model.number="clonePage.parentId" class="form-control form-control-sm">
						<option :value="null">[Aucune]</option>
						<option v-for="(id) in wikiOrderedPageIds" :key="id" :value="id">{{ wikiPages[id].fullNames.join(' / ')}}</option>
					</select>
				</p>
			</div>
		</div>
		<div class="row mt-3">

			<div class="col-lg-6 d-print-none">

				<label for="">Titres</label>
				<div class="form-group">
					<input v-model="clonePage.title" type="text" class="form-control" placeholder="Titre">
				</div>
				<div class="form-group">
					<input v-model="clonePage.subTitle" type="text" class="form-control form-control-sm" placeholder="Sous-titre">
				</div>
			</div>
			<div class="col-lg-6 ">

				<div class="form-group d-print-none">
					<label for="">Résumé</label>
					<textarea v-model="clonePage.summary" type="text" class="form-control form-control-sm" placeholder="Résumé"></textarea>
				</div>
				
			</div>

			<div class="col-lg-12 ">
				
				<RichText v-model="clonePage.content.text"></RichText>

				<p class="tar mt-3">
					<UpdatingIconItem :status="wikiUpdateStatus"></UpdatingIconItem>
					<button type="button" class="btn btn-success ctrl-s ml-3" @click="save">Enregistrer</button>
				</p>
			</div>
			<!--<div class="col-lg-5 d-print-none">

				<embed :src="link" 
				v-for="(link) in clonePage.content.media_links" 
				:key="link" style="height: 300px;" />
				
				<p><input v-model="newMediaLink" type="text" class="form-control" placeholder="https://www.youtube.com/watch?v=xxxxxxxx"></p>
				<div class="tar"><button type="button" class="btn btn-primary" @click="addMediaLink">Ajouter</button></div>
			</div>-->

			<div class="col-12">
				<div class="pt-4 pb-4 tac">
					<div class="wiki-diagram" @click='clickDiagram'>
						<img ref="imgDiag" :src="imgSrc"/>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
// @ is an alias to /src

import WikiBaseComponent from "@/store/tools/wikiBaseComponent";
import DiagramEditor from '../../lib/DiagramEditor';

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
			newMediaLink: '',
			editParent: false
		};
	},

	watch: {
		page() { this.clonePage = { ...this.page}; }
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
				if (field == 'image') continue;
				params[field] = this.clonePage[field];
			}

			this.storePageUpdate(params).then(() => {
				self.dialogSuccess();
			});
		},

		addMediaLink(){
			this.clonePage.content.media_links.push(this.newMediaLink);
			this.newMediaLink = "";
		},


		clickDiagram()
		{
			let self = this;
			DiagramEditor.editElement(this.$refs.imgDiag, null,null, (data, image, draft) => {
				//console.log(data, draft, elt, elt.getAttribute('src'), elt.getAttribute('src').substring("data:image/svg+xml;base64,".length));
	
				if (draft == false)
				{
					let params = {
						id: this.clonePage.id,
						image: image
					};

					this.dialogWaiting(true);
					self.storePageUpdate(params).then(() => {
						self.dialogSuccess();
					});
				}
			});
		},
	},

	computed:{
		fullNames() {
			return this.wikiPages[this.page.id].fullNames;
		},

		imgSrc(){
			if (this.clonePage.image != null)
			{
				return this.clonePage.image.format + "," + btoa(this.clonePage.image.data);
			}
			return "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxMjFweCIgaGVpZ2h0PSI2MXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMTIxIDYxIiBjb250ZW50PSImbHQ7bXhmaWxlIGV0YWc9JnF1b3Q7VGdBR2JKbGNJaGw3a1JuRGFxSDQmcXVvdDsgYWdlbnQ9JnF1b3Q7TW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTRfNikgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgwLjAuMzk4Ny4xMDYgU2FmYXJpLzUzNy4zNiZxdW90OyBtb2RpZmllZD0mcXVvdDsyMDIwLTAyLTE5VDEyOjQ0OjI3LjY1OVomcXVvdDsgaG9zdD0mcXVvdDt0ZXN0LmRyYXcuaW8mcXVvdDsgdmVyc2lvbj0mcXVvdDtARFJBV0lPLVZFUlNJT05AJnF1b3Q7Jmd0OyZsdDtkaWFncmFtIGlkPSZxdW90O3JVdXh2bWFtZE5aMXpyTFhPbF82JnF1b3Q7IG5hbWU9JnF1b3Q7UGFnZS0xJnF1b3Q7Jmd0O2xaUExic0l3RUVXL0prc2t4Nll0V3dvcGZhaWxLcXFRMkpsNGNGdzVHZVFZU1ByMVRZaWRCeXphcmpJK21VZm1YaWRnczdSWUdMNVBYbEdBRGlnUlJjRG1BYVVocGF4NjFLUnN5VjFEcEZIQ3NRNnMxRGM0U0J3OUtBSDVJTkVpYXF2MlF4aGpsa0ZzQjR3Ymc2ZGgyZzcxY09xZVM3Z0NxNWpyYTdwV3dpWU5uZHlRamorQ2tvbWZIQkwzSnVVKzJZRTg0UUpQUGNTaWdNME1vbTJpdEppQnJ0WHp1cnlGNy9NeFpSK2piRU5pU2FmUlJxcFIwK3poUHlYdENnWXkrOWZXbnptWTVmYXJscFFTemJlVnIrZktsZVhHTmczOTBPeXdIZHVuWTFnc1g5YlBiSWU0THFlamJzUDJJM05iZWxVTkhqSUJkVDBKMkwzVVBNOWQzS3BVSDVvNVJ6QVdpZ3M3ZnRrbDdJMWZBS1pnVFZuVnVTN01lK0p1NWNRZFQ1M0RvVTlKZXU3ZU9zYmRwWkp0NTA2NEtuQWIrMk5QU284NjE4L3B2WitIUlQ4PSZsdDsvZGlhZ3JhbSZndDsmbHQ7L214ZmlsZSZndDsiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ij48ZGVmcy8+PGc+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PGcgZmlsbD0iIzAwMDAwMCIgZm9udC1mYW1pbHk9IkhlbHZldGljYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMnB4Ij48dGV4dCB4PSI1OS41IiB5PSIzNC41Ij5TdGFydDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==";
		}
	}
}
</script>
