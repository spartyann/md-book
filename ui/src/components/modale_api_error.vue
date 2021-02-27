<template>
	<b-modal id="apiErrorModale" centered v-model="apiErrorModelVisible">
		<template #modal-header v-if="effectiveApiError != null">
			<template v-if="effectiveApiError.error == 'UserException'">
				<h5>
					<fa icon="exclamation-triangle" class="text-danger" v-if="effectiveApiError.type=='error'"></fa>
					<fa icon="exclamation-circle" class="text-warning" v-if="effectiveApiError.type=='warning'"></fa>
					Message
				</h5>
			</template>
			<template v-else-if="effectiveApiError.error == 'ApiException'">
				<h5>Api Error</h5>
			</template>
			<template v-else><h5>Erreur inattendue</h5></template>
		</template>
		<template #default v-if="effectiveApiError != null">
			<p class="my-4">{{ effectiveApiError.message }}</p>
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
				effectiveApiError: null
			}
		},
		methods: {
			...mapActions({
				storeError: 'error',
			}),
		},

		watch:{
			apiError(val) { if (val != null) this.effectiveApiError = val; }
		},
		computed: {

			apiErrorModelVisible: {
				get()
				{
					return this.apiError != null;
				},
				set(value)
				{
					if (value == false) this.storeError(null);
				}

			},
			...mapState({
				apiError: state => state.apiError,
			})
		}
	}

</script>

