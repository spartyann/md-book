<template>
	<div class="mt-2">
		<button type="button" class="btn btn-success ctrl-s" @click="$emit('click')">
			Enregistrer
		</button>
		<span v-if="fieldsUpdating.indexOf('data') != -1" class="ml-3">
			<UpdatingIconItem :status="updateStatus"></UpdatingIconItem>
		</span>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState({
			fieldsUpdating: state => state.consult.fieldsUpdating,
			updateStatus: state => state.consult.updateStatus,
		})
	}
}
</script>
