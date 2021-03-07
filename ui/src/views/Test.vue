

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

				</div>
			</div>
		</div>

	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
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
