<template>
	<span :style="popoverShow || deleting ? 'visibility: visible' : ''">
		<button class="btn btn-link p-0" :id="popoverId" @click.prevent.stop="popoverShow = true"
			:style="deleting ? 'pointer-events: none;': ''">
			<template v-if="showIcon">
				<fa v-if="deleting == false" icon="trash"></fa> 
				<fa v-if="deleting == true" spin icon="spinner" ></fa>
			</template>
			<span v-if="text != null" class="ml-1">{{ text }}</span>
		</button>

		<b-popover :show.sync="popoverShow" :target="popoverId" :placement="'bottom'" :no-fade="true" >
			<div>
				<p v-html="confirm_text"></p>
				<div>
					<button @click.prevent.stop="click()" v-single-click class="btn btn-warning btn-sm mr-2"> Supprimer </button>
					<button @click.prevent.stop="onClose" class="btn btn-outline-primary btn-sm"> Annuler </button>
				</div>
			</div>
		</b-popover>

	</span>
</template>

<script>
	export default
	{
		data: function()
		{
			return {
				deleting: false,
				popoverShow: false,
				popoverId: this.$uuid()
			};
		},

		props:
		{
			//deleting: { default: false, type: Boolean },
			text: { default: null, type: String },
			confirm_text: { default: function() { return "Etes-vous sûr de vouloir supprimer cet élément ?" }, type: String },
			showIcon: { default: true, type: Boolean },
		},


		methods:
		{
			onClose ()
			{
				this.popoverShow = false;
			},
			click: function()
			{
				if (this.deleting == false)
				{
					this.popoverShow = false;
					this.deleting = true;
					this.$emit('click');
				}

			},
		}
	}
</script>
