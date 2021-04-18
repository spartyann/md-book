
export default {

	methods: {
		dialogHide()
		{
			this.$store.dispatch("dialog", null);
		},

		dialogError(message)
		{
			this.$store.dispatch("dialog", {
				type: "error",
				message
			});
		},

		dialogWarning(message)
		{
			this.$store.dispatch("dialog", {
				type: "warning",
				message
			});
		},
		dialogMessage(message)
		{
			this.$store.dispatch("dialog", {
				type: "message",
				message
			});
		},
		dialogWaiting(waiting = true)
		{
			if (waiting === false) throw new Error('dialogWaiting(false) is not supported, use dialogHide()');

			this.$store.dispatch("dialog", {
				type: "waiting",
				message: (typeof waiting == 'string') ? waiting : "Veuillez patienter"
			});
		},
		dialogSuccess(success = true)
		{
			if (success === false) throw new Error('dialogSuccess(false) is not supported, use dialogHide()');

			let isCutomMessage = typeof success == 'string';

			this.$store.dispatch("dialog", {
				type: "success",
				message: isCutomMessage ? success : "Terminé"
			});

			let self = this;
			// Hide success 1 second after show
			setTimeout(function()
			{
				if (self.$store.state.dialog != null 
					&& self.$store.state.dialog.type == 'success') self.dialogHide();
			}, isCutomMessage ? 3000 : 1500);
		},


		/**
		 * 
		 * @param {*} message 
		 * @param  {...{text: string, variant: string, icon: "string", callback: () => {}}} buttons 
		 */
		dialogQuestion(message, ...buttons)
		{
			this.$store.dispatch("dialog", {
				type: "question",
				message,
				buttons
			});
		},

		/**
		 * 
		 * @param {string} message 
		 * @param {() => {}} yesCallback 
		 * @param {() => {}} noCallback 
		 */
		dialogYesNoQuestion(message, yesCallback = null, noCallback = null)
		{
			if (yesCallback == null) yesCallback = function() {};
			if (noCallback == null) noCallback = function() {};

			this.$store.dispatch("dialog", {
				type: "question",
				message,
				buttons: [
					{
						text: "Oui",
						variant: "success",
						icon: "check",
						callback: yesCallback
					},
					{
						text: "Non",
						variant: "danger",
						icon: "times",
						callback: noCallback
					}
				]
			});
		},
		
	}
}

