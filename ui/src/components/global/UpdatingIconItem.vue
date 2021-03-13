<template>
    <span :key="'st' + status">
		<fa v-if="status == 'updating'" spin icon="spinner" ></fa>
		<span v-if="status == 'updated'" class="icon-fade-out">
			<fa icon="check" class="text-success"></fa>
		</span>
	</span>
</template>

<script>

    export default {
        props: [ 'status' ],
    }
</script>

