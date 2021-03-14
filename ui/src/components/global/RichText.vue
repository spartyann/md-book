<template>
	<ckeditor :editor="editor" v-model="model" :config="editorConfig"></ckeditor>	
</template>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {

	props: {
		value: { default: null, type: String },
	},

	model: {
		prop: 'value',
		event: 'input'
	},

	data()
	{
		return {
			editor: ClassicEditor,
			editorConfig: {
				
			},
		};
	},

	computed: {
		model: {
			get() { return this.value; },
			set(val) { this.$emit('input', val); }
		}
	}
}
</script>
