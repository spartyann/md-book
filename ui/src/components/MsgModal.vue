<template>
	<b-modal id="MsgModale" centered v-model="modalVisible" data-keyboard="false"
		no-close-on-esc
		no-close-on-backdrop
		hide-header-close
		:hide-header="hideHeader"
		:hide-footer="hideFooter"
		>
		<template #modal-header v-if="effectiveMsg != null && hideHeader == false">

			<h5 v-if="effectiveMsg.type=='ApiException'">
				<fa icon="exclamation-triangle" class="text-danger"></fa>
				Api Error
			</h5>
			<h5 v-else-if="effectiveMsg.type=='error'">
				<fa icon="exclamation-triangle" class="text-danger"></fa>
				Attention
			</h5>
			<h5 v-else-if="effectiveMsg.type=='warning'">
				<fa icon="exclamation-circle" class="text-warning"></fa>
				Attention
			</h5>
			<h5 v-else-if="effectiveMsg.type=='message'">
				<fa icon="info-circle" class="text-primary"></fa>
				Information
			</h5>
			<h5 v-else-if="effectiveMsg.type=='question'">
				<fa icon="question-circle" class="text-primary"></fa>
				Question
			</h5>
			<h5 v-else>
				<fa icon="exclamation-triangle" class="text-danger"></fa>
				Erreur inattendue
			</h5>
		</template>
		<template #default v-if="effectiveMsg != null">
			<div class="tbl-100">
				<div class="td vam pr-3" v-if="isWaiting">
					<div class="spinner-border text-primary"></div>
				</div>
				<div class="td vam pr-3" v-if="isSuccess">
					<fa icon="check-circle" size="2x" class="text-success"></fa>
				</div>
				<div class="td-100">
					<p class="my-4">{{ effectiveMsg.message }}</p>
				</div>
			</div>
		</template>
		<template #modal-footer="{ ok }" v-if="effectiveMsg != null && hideFooter == false">
			<template v-if="isQuestion">
				<template v-for="(btn, index) in effectiveMsg.buttons">
					<b-button :key="index" size="sm" :variant="btn.variant" @click="answerQuestion(btn)">
						<fa v-if="btn.icon != undefined" :icon="btn.icon"></fa> {{ btn.text }}
					</b-button>
				</template>
			</template>
			<template v-else>
				<b-button size="sm" variant="success" @click="ok()">OK</b-button>
			</template>

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
			answerQuestion(btn)
			{
				// First => Hide
				this.dialogHide();

				// Second => callback
				btn.callback();
			},
			...mapActions({
				storeMessage: 'dialog',
			}),
		},

		watch:{
			dialog(val) { if (val != null) this.effectiveMsg = val; }
		},
		computed: {
			isWaiting() { return this.effectiveMsg == null ? false : this.effectiveMsg.type == 'waiting'},
			isSuccess() { return this.effectiveMsg == null ? false : this.effectiveMsg.type == 'success'},
			isQuestion() { return this.effectiveMsg == null ? false : this.effectiveMsg.type == 'question'},

			hideHeader() {
				if (this.effectiveMsg == null) return false;
				return this.effectiveMsg.type == 'waiting' || this.effectiveMsg.type == 'success';
			},
			hideFooter() {
				if (this.effectiveMsg == null) return false;
				return this.effectiveMsg.type == 'waiting' || this.effectiveMsg.type == 'success';
			},
			modalVisible: {
				get() { return this.dialog != null; },
				set(value) { if (value == false) this.storeMessage(null); }
			},
			...mapState({
				dialog: state => state.dialog,
			})
		}
	}

</script>

