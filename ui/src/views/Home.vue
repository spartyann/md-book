<template>
	<div class="home">
		<img alt="Vue logo" src="@/assets/logo.png">
		<HelloWorld msg="Welcome to Your Vue.js App"/>
		{{ myvar }}
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";
import { server } from "@/helper";

export default {

	name: 'Home',

	components: {
		HelloWorld
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
		const url = `${server.baseURL}/api/test2/op`;
		console.log("URL = " + url)

		axios.post(url, { "var": "var hihi" }).then(data => {
			self.myvar = data;
		});

		console.log(process.env.VUE_APP_ENV); // OUTPUT: production

	}
}
</script>
