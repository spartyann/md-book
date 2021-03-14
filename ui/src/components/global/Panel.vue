<template>
	<div class="card mb-3">
		<div class="card-header clickable" @click="toogle">
			<div class="tbl-100">
				<div class="td-100 vam">
					{{ title }}
					<slot name="header"></slot>
				</div>
				<div class="td pl-3 vam">
					
					<fa v-if="opened" icon="chevron-down"></fa>
					<fa v-else icon="chevron-up"></fa>
					
				</div>
			</div>
		</div>

		<div class="card-body" v-if="opened">
			<slot></slot>
		</div>
	</div>
</template>

<script>

    export default {

		props: {
			title: { default: null, type: String },
			closed: { default: false, type: Boolean }
		},
        data() {
			return {
				opened: this.closed == false,
			}
		},
		methods: {
			toogle(){ this.opened = ! this.opened }
		}

    }
</script>

