<template>
	<ckeditor :editor="editor" v-model="model" :config="editorConfig"></ckeditor>	
</template>

<script>

//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import FontPlugin from '@ckeditor/ckeditor5-font/src/font';

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
						'mediaEmbed',
						'todoList',
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
