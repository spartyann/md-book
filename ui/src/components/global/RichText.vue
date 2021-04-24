<template>
	<ckeditor :editor="editor" v-model="model" :config="editorConfig"></ckeditor>	
</template>

<script>

// https://ckeditor.com/ckeditor-5/online-builder/

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
			editor: window.CKSource.Editor,
			editorConfig: {
				
				toolbar: {
					items: [
						'heading',
						'|',
						'bold',
						'italic',
						'link',
						'bulletedList',
						'numberedList',
						'|',
						'alignment',
						'fontSize',
						'fontColor',
						'fontBackgroundColor',
						'highlight',
						'|',
						'outdent',
						'indent',
						'|',
						'insertTable',
						'horizontalLine',
						'blockQuote',
						'removeFormat',
						//'mediaEmbed',
						//'todoList',
						//'imageUpload',
						'undo',
						'redo',
						//'htmlEmbed'
					]
				},
				language: 'fr',
				image: {
					toolbar: [
						'imageTextAlternative',
						'imageStyle:full',
						'imageStyle:side',
						'linkImage'
					]
				},
				table: {
					contentToolbar: [
						'tableColumn',
						'tableRow',
						'mergeTableCells',
						'tableCellProperties',
						'tableProperties'
					]
				},
				licenseKey: '',
				
				
			}
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
