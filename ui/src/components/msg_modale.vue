<template>
	<b-modal id="MsgModale" centered v-model="modelVisible">
		<template #modal-header v-if="effectiveMsg != null">

			<h5 v-if="effectiveMsg.type=='ApiException'">
				<fa icon="exclamation-triangle" class="text-danger"></fa>
				Api Error
			</h5>
			<h5 v-else-if="effectiveMsg.type=='mrror'">
				<fa icon="exclamation-triangle" class="text-danger"></fa>
				Message
			</h5>
			<h5 v-else-if="effectiveMsg.type=='marning'">
				<fa icon="exclamation-circle" class="text-warning"></fa>
				Message
			</h5>
			<h5 v-else-if="effectiveMsg.type=='message'">
				<fa icon="info-circle" class="text-primary"></fa>
				Information
			</h5>
			<h5 v-else>
				Erreur inattendue
			</h5>
		</template>
		<template #default v-if="effectiveMsg != null">
			<p class="my-4">{{ effectiveMsg.message }}</p>
		</template>
		<template #modal-footer="{ ok }">
			<b-button size="sm" variant="success" @click="ok()">OK</b-button>
		</template>
	</b-modal>

</template>

<script>
	import { mapActions, mapState } from 'vuex';

	export default {

		components: {

		},

		data(){
			return {
				effectiveMsg: null
			}
		},
		methods: {
			...mapActions({
				storeMessage: 'message',
			}),
		},

		watch:{
			message(val) { if (val != null) this.effectiveMsg = val; }
		},
		computed: {

			modelVisible: {
				get()
				{
					return this.message != null;
				},
				set(value)
				{
					if (value == false) this.storeMessage(null);
				}

			},
			...mapState({
				message: state => state.message,
			})
		}
	}

</script>

