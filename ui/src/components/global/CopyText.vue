<template>
	<span class="hover-handler">
		<span ref="text" class="mr-1" ><slot></slot></span>
		<template v-if="active">
			<a v-if="copied == false" @click="copy" class="hover-only">
				<fa icon="copy"></fa>
			</a>
			<span v-if="copied"><fa icon="check"></fa> Copié</span>
		</template>
	</span>
</template>

<script>
import $ from 'jquery'
let permissionCopyTextGranted = false;

export default {
	props:
	{
		textToCopy: { default: null, type: String },
	},

	data(){
		return {
			active: permissionCopyTextGranted, 
			copied: false
		}
	},
	mounted() {
		let self = this;

		if (permissionCopyTextGranted == false)
		{
			navigator.permissions.query({name: "clipboard-write"}).then(result => { 
				if (result.state == "granted" || result.state == "prompt") {
					// ?
				}

				if (result.state == "granted") {
					permissionCopyTextGranted = true;
					self.active = true;
				}
			});
		}
	},
	methods:
	{
		copy()
		{
			let self = this;
			let text = this.textToCopy;

			if (text === null) text = $(this.$refs.text).text().trim();

			//console.log(text, $(this.$refs.text))
			
			navigator.clipboard.writeText(text).then(function() {
				self.copied = true;
				setTimeout(function()
				{
					self.copied = false;
				}, 1000);
			}, function() {
				/* clipboard write failed */
			});
		},
	}
}
</script>
