<template>
	<div class="home text-primary">
		
	</div>
</template>

<script>
// @ is an alias to /src
import Communication from '@/lib/Communication';

export default {

	name: 'Home',

	components: {
	},

	data()
	{
		return {
			myvar: '0'
		};
	},

	mounted()
	{
		let self = this;

		Communication.call("test2", "op", { "var": "var hihi"}).then(function(data){
			self.myvar = data;
		});
	}
}
</script>
