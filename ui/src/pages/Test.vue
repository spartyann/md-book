

<template>
	<div class="page-my-account">
		<div class="container-fluid">
			<div class="row">
				<div class="col-12">
					<h1>Modales</h1>
					
					<p>
						<button class="btn btn-primary" @click="modalWait">Waiting</button>
						&nbsp;
						<button class="btn btn-primary" @click="dialogError('Erreur !!!')">Error</button>
						&nbsp;
						<button class="btn btn-primary" @click="dialogWarning('Attention !!!')">Warning</button>
						&nbsp;
						<button class="btn btn-primary" @click="dialogMessage('Un message')">Message</button>
						&nbsp;
						<button class="btn btn-primary" @click="modalSuccess">Success</button>
						&nbsp;
						<button class="btn btn-primary" @click="modalYesNo">Question Yes No</button>
						&nbsp;
						<button class="btn btn-primary" @click="modalQuestion">Question Custom</button>

					</p>
					<p>
						Dernière réponse: {{ lastAnswer }}
					</p>

					<p>
						<CopyText>Text à copier</CopyText>
						<DeleteBtn text="Supprimer"></DeleteBtn>
					</p>


					<h1>Diagrammes</h1>

					<img @click='clickDiagram' ref="imgDiag" style="min-width:20px; min-height: 20px; cursor:pointer;"
						src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxMjFweCIgaGVpZ2h0PSI2MXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMTIxIDYxIiBjb250ZW50PSImbHQ7bXhmaWxlIGV0YWc9JnF1b3Q7VGdBR2JKbGNJaGw3a1JuRGFxSDQmcXVvdDsgYWdlbnQ9JnF1b3Q7TW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTRfNikgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgwLjAuMzk4Ny4xMDYgU2FmYXJpLzUzNy4zNiZxdW90OyBtb2RpZmllZD0mcXVvdDsyMDIwLTAyLTE5VDEyOjQ0OjI3LjY1OVomcXVvdDsgaG9zdD0mcXVvdDt0ZXN0LmRyYXcuaW8mcXVvdDsgdmVyc2lvbj0mcXVvdDtARFJBV0lPLVZFUlNJT05AJnF1b3Q7Jmd0OyZsdDtkaWFncmFtIGlkPSZxdW90O3JVdXh2bWFtZE5aMXpyTFhPbF82JnF1b3Q7IG5hbWU9JnF1b3Q7UGFnZS0xJnF1b3Q7Jmd0O2xaUExic0l3RUVXL0prc2t4Nll0V3dvcGZhaWxLcXFRMkpsNGNGdzVHZVFZU1ByMVRZaWRCeXphcmpJK21VZm1YaWRnczdSWUdMNVBYbEdBRGlnUlJjRG1BYVVocGF4NjFLUnN5VjFEcEZIQ3NRNnMxRGM0U0J3OUtBSDVJTkVpYXF2MlF4aGpsa0ZzQjR3Ymc2ZGgyZzcxY09xZVM3Z0NxNWpyYTdwV3dpWU5uZHlRamorQ2tvbWZIQkwzSnVVKzJZRTg0UUpQUGNTaWdNME1vbTJpdEppQnJ0WHp1cnlGNy9NeFpSK2piRU5pU2FmUlJxcFIwK3poUHlYdENnWXkrOWZXbnptWTVmYXJscFFTemJlVnIrZktsZVhHTmczOTBPeXdIZHVuWTFnc1g5YlBiSWU0THFlamJzUDJJM05iZWxVTkhqSUJkVDBKMkwzVVBNOWQzS3BVSDVvNVJ6QVdpZ3M3ZnRrbDdJMWZBS1pnVFZuVnVTN01lK0p1NWNRZFQ1M0RvVTlKZXU3ZU9zYmRwWkp0NTA2NEtuQWIrMk5QU284NjE4L3B2WitIUlQ4PSZsdDsvZGlhZ3JhbSZndDsmbHQ7L214ZmlsZSZndDsiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ij48ZGVmcy8+PGc+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PGcgZmlsbD0iIzAwMDAwMCIgZm9udC1mYW1pbHk9IkhlbHZldGljYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMnB4Ij48dGV4dCB4PSI1OS41IiB5PSIzNC41Ij5TdGFydDwvdGV4dD48L2c+PC9nPjwvc3ZnPg=="/>

				</div>
			</div>
		</div>

	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DiagramEditor from '../lib/DiagramEditor';

// @ is an alias to /src

export default {

	name: 'MyAccount',

	components: {
	},

	data()
	{
		return {
			lastAnswer: ""
		};
	},

	mounted()
	{
	},

	methods: {
		clickDiagram()
		{
			DiagramEditor.editElement(this.$refs.imgDiag, null,null, (data, draft, elt) => {
				console.log("diagram updated");
				if (draft == false) console.log(data, draft, elt);
			});
		},
		modalWait()
		{
			let self = this;
			self.dialogWaiting(true);
			setTimeout(function() { self.dialogWaiting("Message perso"); }, 2000)
			setTimeout(function() { self.dialogHide(); }, 4000)
		},

		modalSuccess()
		{
			let self = this;
			this.dialogSuccess();		

			setTimeout(function() { self.dialogSuccess("Message perso"); }, 1500)
		},

		modalYesNo()
		{
			let self = this;
			this.dialogYesNoQuestion("Question ?",
				function(){ self.lastAnswer = "Yes" },
				function(){ self.lastAnswer = "No" }
			);
		},

		modalQuestion()
		{
			let self = this;

			this.dialogQuestion("Question ?",
				{
					text: "Tout à fait",
					variant: "success",
					icon: "check",
					callback: function(){ self.lastAnswer = "Tout à fait" },
				},
				{
					text: "Un peu",
					variant: "secondary",
					icon: "arrow-up",
					callback: function(){ self.lastAnswer = "Un peu" }
				},
				{
					text: "Pas du tout",
					variant: "danger",
					icon: "times",
					callback: function(){ self.lastAnswer = "Pas du tout" }
				}
			);
		},

		...mapActions({
		}),
	},
	computed: {
		
		...mapState({

		})
	}

}
</script>
