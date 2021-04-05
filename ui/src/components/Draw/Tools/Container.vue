<template>
	<svg :style="style" ref="root" >
		<g>
			<image ref="img" x="15" y="10"
				style="height: calc(100% - 20px)"
				:xlink:href="imgUrl" /> 

			<slot></slot>
		</g>
	</svg>
</template>

<script>
import $ from "jquery"
// @ is an alias to /src

export default {

	props: {
		imgUrl: { default: "/img/human.jpg", type: String },
		maxHeight: { default: 400, type: Number },
		maxWidth: { default: 400, type: Number },
	},

	components: {

	},

	data()
	{
		return {
			height: 300,
			imgRatio: null,
			effectiveMaxWidth: null,
			effectiveMaxHeight: null
		};
	},

	mounted()
	{
		const img = $(this.$refs.img);
		const root = $(this.$refs.root);
		this.imgRatio = img.innerHeight() / img.innerWidth();

		this.height = this.imgRatio * root.innerWidth();
	},

	methods:
	{
		

	},
	
	computed:
	{
		style()
		{
			let res = "width: 100%; height:" + this.height + "px; ";

			if (this.effectiveMaxWidth !== null) res += "max-width: " + this.effectiveMaxWidth + "px; "
			if (this.effectiveMaxHeight !== null) res += "max-height: " + this.effectiveMaxHeight + "px; "

			return res;
		}
	
	}

}
</script>
