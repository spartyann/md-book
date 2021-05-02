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
				<div v-if="editParent == false && canUpdate">

					<div class="tbl-100">
						<div class="tr hover-handler" v-if="fullNames != null">
							<div class="td pr-2"><fa :icon="['far', 'folder']"></fa></div>
							<div class="td-100" >
								{{ fullNames.join(' / ') }} <a class="hover-only" @click="editParent = true"><fa :icon="['far', 'edit']"></fa></a>
							</div>
						</div>
						<div class="tr d-print-none" v-if="clonePage.shareAlias != null">
							<div class="td pr-2"><fa :icon="['fas', 'share-alt']"></fa></div>
							<div class="td-100">
								<CopyText :textToCopy="shareLink">
									<a :href="shareLink" target="_blank">{{ shareLink.replace('https://', "") }}</a>
								</CopyText>
							</div>
						</div>
					</div>

				</div>
				<p v-else-if="editParent && wikiPages != null">
					<select v-model.number="clonePage.parentId" class="form-control form-control-sm">
						<option :value="null">[Aucune]</option>
						<option v-for="(id) in wikiOrderedPageIds" :key="id" :value="id">{{ wikiPages[id].fullNames.join(' / ')}}</option>
					</select>
				</p>
			</div>
		</div>
		<div class="row mt-2">

			<div class="col-lg-6 d-print-none" v-if="canUpdate">

				<label for="">Titres</label>
				<div class="form-group">
					<input v-model="clonePage.title" type="text" class="form-control" placeholder="Titre" :disabled="canUpdate == false">
				</div>
				<div class="form-group">
					<input v-model="clonePage.subTitle" type="text" class="form-control form-control-sm" placeholder="Sous-titre" :disabled="canUpdate == false">
				</div>
			</div>
			<div class="col-lg-6 " v-if="canUpdate">
				<div class="form-group d-print-none">
					<label for="">Résumé</label>
					<textarea v-model="clonePage.summary" type="text" class="form-control form-control-sm" placeholder="Résumé" :disabled="canUpdate == false"></textarea>
				</div>
			</div>

			<div class="col-lg-12 col-xl-7 ">
				<p v-if="canUpdate == false">
					{{ clonePage.summary }}
				</p>
				<RichText v-model="clonePage.content.text" :disabled="canUpdate == false"></RichText>

				<p class="tar mt-3" v-if="canUpdate">
					<UpdatingIconItem :status="wikiUpdateStatus"></UpdatingIconItem>
					<button type="button" class="btn btn-success ctrl-s ml-3" @click="save(false)">Enregistrer</button>
				</p>

				<div v-if="clonePage.image != null || canUpdate" :class="'pt-4 pb-4 tac ' + (clonePage.image == null ? 'd-print-none' : '')">
					<div :class="'wiki-diagram ' + ( canUpdate ? 'clickable': '')" @click='clickDiagram'>
						<img ref="imgDiag" :src="imgSrc"/>
					</div>
				</div>
			</div>

			<div class="col-lg-12 col-xl-5">

				<div v-for="(link, index) in clonePage.content.media_links"
					:key="link" class="mb-3 hover-handler">
					
					<embed :src="formatMediaUrl(link)" class="d-print-none"/>

					<div class="tbl-100">
						<div class="td-100">
							<small><a :href="link" target="_blank">{{link}}</a></small>
						</div>
						<div class="td hover-only d-print-none" v-if="canUpdate"><a @click="deleteMediaLink(index)"><fa :icon="['fas', 'trash']"></fa></a></div>
					</div>
				</div>
				
				<div class="d-print-none" v-if="canUpdate">
					<p>
						<input v-model="newMediaLink" type="text" class="form-control" placeholder="https://www.youtube.com/watch?v=xxxxxxxx">
					</p>
					<div class="tar"><button type="button" class="btn btn-primary" @click="addMediaLink">Ajouter</button></div>
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
		page() { this.clonePage = { ...this.page }; }
	},

	mounted()
	{
		//storePageUpdate
	},

	methods: {
		save(includeImage)
		{
			let self = this;
			let params = {
				id: this.clonePage.id,
			}

			for (let field in this.clonePage)
			{
				if (includeImage == false && field == 'image') continue;
				params[field] = this.clonePage[field];
			}

			this.storePageUpdate(params).then(() => {
				self.dialogSuccess();
			});
		},

		addMediaLink(){
			
			let mediaLink = this.newMediaLink;
			
			if (this.clonePage.content.media_links.indexOf(mediaLink) >= 0) return;

			this.clonePage.content.media_links.push(mediaLink);
			this.newMediaLink = "";
		},

		deleteMediaLink(index)
		{
			this.clonePage.content.media_links.splice(index, 1);
		},

		formatMediaUrl(url)
		{
			//https://www.youtube.com/embed/gr9N8Zkc4Z0
			//https://www.youtube.com/watch?v=gr9N8Zkc4Z0
			//https://youtu.be/RTCxBMcPLFI
			url = url.replace(/(?:www.youtube\.com)\/(?:watch\?.*v=)([^&]+).*/g, 'www.youtube.com/embed/$1');
			url = url.replace(/(?:youtu\.be)\/(.+)/g, 'www.youtube.com/embed/$1');

			return url;
		},


		clickDiagram()
		{
			if (this.canUpdate == false) return;
			DiagramEditor.editElement(this.$refs.imgDiag, null,null, (data, image, draft) => {
				//console.log(data, draft, elt, elt.getAttribute('src'), elt.getAttribute('src').substring("data:image/svg+xml;base64,".length));
	
				if (draft == false)
				{
					this.clonePage.image = image;
					this.save(true);
				}
			});
		},
	},

	computed:{
		fullNames() {
			if (this.wikiPages == null) return null;
			return this.wikiPages[this.page.id].fullNames;
		},

		canUpdate() { return this.page.acl.update; },

		imgSrc(){
			if (this.clonePage.image != null)
			{
				return this.clonePage.image.format + "," + btoa(this.clonePage.image.data);
			}

			return "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNDFweCIgaGVpZ2h0PSI0MXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMTQxIDQxIiBjb250ZW50PSImbHQ7bXhmaWxlIGV0YWc9JnF1b3Q7ZF9ubjBrQzlPd196cnZqZHAxdl8mcXVvdDsgYWdlbnQ9JnF1b3Q7NS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg5LjAuNDM4OS45MCBTYWZhcmkvNTM3LjM2JnF1b3Q7IG1vZGlmaWVkPSZxdW90OzIwMjEtMDUtMDFUMTE6NDE6MjguMTU4WiZxdW90OyBob3N0PSZxdW90O2VtYmVkLmRpYWdyYW1zLm5ldCZxdW90OyB2ZXJzaW9uPSZxdW90OzE0LjYuOSZxdW90OyB0eXBlPSZxdW90O2VtYmVkJnF1b3Q7Jmd0OyZsdDtkaWFncmFtIGlkPSZxdW90O3JVdXh2bWFtZE5aMXpyTFhPbF82JnF1b3Q7IG5hbWU9JnF1b3Q7UGFnZS0xJnF1b3Q7Jmd0O2xaUExib013RUVXL3hzdEl4cVpSdWt4Sm1qN1VwbXBVUmNyT3dBUm9EUk1aazBDL3ZqeHNIc29tbFZqWXgzZG1QTmNENFY1YWJwUTR4VzhZZ2lTTWhpWGhLOEtZNHpKR21vK0dWVWZtZE42QlNDV2hFUTFnbC95Q2dkVFFJZ2tobndnMW90VEphUW9EekRJSTlJUUpwZkF5bFIxUlRxdWVSQVJYWUJjSWVVMzNTYWpqamk3dTZNQ2ZJSWxpVzltaDVpUVZWbXhBSG9zUUx5UEUxNFI3Q2xGM3E3VDBRRGJtV1YvZW5ZK1Z5L2puTER2UUlHTEw5U0ZLWmwyeXgvK0U5QzBveVBTdHFiOXlVRnYvdTdHVVVTbjgrbG5iU0U4Umo1UGxQYWlhRjFuVFZ4QjNLQlZkSVh1WnJQQmQvWHgyeXUzci9vVWZFZmZWY2paMDNsOCsxNVYxVzJHUmhkREVVOElmSWlueTNLeDc5OXFOVnZnREhrcFViUnlmQnd2d2ovWEpqYTBhUzg2Z05KU2poellYMndDbW9GVlZTOHdwdDY5b3huaGh0cGRoSmh6WHNIZzBENVlKTTRaUm4zbXd1bDRZTCt4MlpMNUZ3NXkwOHRIZnh0ZC8mbHQ7L2RpYWdyYW0mZ3Q7Jmx0Oy9teGZpbGUmZ3Q7Ij48ZGVmcy8+PGc+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM4ZWJmIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PGcgZmlsbD0iIzAwMDAwMCIgZm9udC1mYW1pbHk9IkhlbHZldGljYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMnB4Ij48dGV4dCB4PSI2OS41IiB5PSIyNC41Ij5DcsOpZXIgdW4gc2Now6ltYTwvdGV4dD48L2c+PC9nPjwvc3ZnPg==";
			//return "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxMjFweCIgaGVpZ2h0PSI2MXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMTIxIDYxIiBjb250ZW50PSImbHQ7bXhmaWxlIGV0YWc9JnF1b3Q7VGdBR2JKbGNJaGw3a1JuRGFxSDQmcXVvdDsgYWdlbnQ9JnF1b3Q7TW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTRfNikgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgwLjAuMzk4Ny4xMDYgU2FmYXJpLzUzNy4zNiZxdW90OyBtb2RpZmllZD0mcXVvdDsyMDIwLTAyLTE5VDEyOjQ0OjI3LjY1OVomcXVvdDsgaG9zdD0mcXVvdDt0ZXN0LmRyYXcuaW8mcXVvdDsgdmVyc2lvbj0mcXVvdDtARFJBV0lPLVZFUlNJT05AJnF1b3Q7Jmd0OyZsdDtkaWFncmFtIGlkPSZxdW90O3JVdXh2bWFtZE5aMXpyTFhPbF82JnF1b3Q7IG5hbWU9JnF1b3Q7UGFnZS0xJnF1b3Q7Jmd0O2xaUExic0l3RUVXL0prc2t4Nll0V3dvcGZhaWxLcXFRMkpsNGNGdzVHZVFZU1ByMVRZaWRCeXphcmpJK21VZm1YaWRnczdSWUdMNVBYbEdBRGlnUlJjRG1BYVVocGF4NjFLUnN5VjFEcEZIQ3NRNnMxRGM0U0J3OUtBSDVJTkVpYXF2MlF4aGpsa0ZzQjR3Ymc2ZGgyZzcxY09xZVM3Z0NxNWpyYTdwV3dpWU5uZHlRamorQ2tvbWZIQkwzSnVVKzJZRTg0UUpQUGNTaWdNME1vbTJpdEppQnJ0WHp1cnlGNy9NeFpSK2piRU5pU2FmUlJxcFIwK3poUHlYdENnWXkrOWZXbnptWTVmYXJscFFTemJlVnIrZktsZVhHTmczOTBPeXdIZHVuWTFnc1g5YlBiSWU0THFlamJzUDJJM05iZWxVTkhqSUJkVDBKMkwzVVBNOWQzS3BVSDVvNVJ6QVdpZ3M3ZnRrbDdJMWZBS1pnVFZuVnVTN01lK0p1NWNRZFQ1M0RvVTlKZXU3ZU9zYmRwWkp0NTA2NEtuQWIrMk5QU284NjE4L3B2WitIUlQ4PSZsdDsvZGlhZ3JhbSZndDsmbHQ7L214ZmlsZSZndDsiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ij48ZGVmcy8+PGc+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PGcgZmlsbD0iIzAwMDAwMCIgZm9udC1mYW1pbHk9IkhlbHZldGljYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMnB4Ij48dGV4dCB4PSI1OS41IiB5PSIzNC41Ij5TdGFydDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==";
		},

		shareLink() {
			if (this.clonePage.shareAlias == null) return null;

			return window.location.protocol + '//' + window.location.hostname  + ( window.location.port == 443 ? '': ':' + window.location.port ) + this.$router.resolve({ 
				name: 'ShareWikiPage',
				params: { alias: this.clonePage.shareAlias  },
			}).route.fullPath;
		}
	}
}
</script>
