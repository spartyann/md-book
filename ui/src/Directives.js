import Vue from "vue";
import Tools from "./lib/Tools"
import $ from 'jquery'

export default
{
	registerDirectives()
	{
		// Single click directive
		Vue.directive('single-click', {
			inserted: function (el) {
				$(el).click(function() {
					$(el).css("pointer-events", "none");
				});
			}
		});

		Vue.directive('prevent-double', {
			inserted: function (el) {
				$(el).click(function() {
					$(el).css("pointer-events", "none");
					setTimeout(() => {
						$(el).css("pointer-events", "auto");
					}, 1000)
				});
			}
		});

		// Single click directive with icon replacement
		Vue.directive('single-click-icon', {
			inserted: function (el) {
				const iconCode = '<i class="fa fa-spinner fa-pulse icon-default"></i>';

				$(el).click(function(){
					$(el).css("pointer-events", "none");

					let icons = $(el).find('i');
					if (icons.length == 0) $(el).html('<i class="fa fa-spinner fa-pulse icon-default"></i>');
					else 
					{
						icons.hide();
						$(iconCode).insertAfter(icons[0]);
					}
				});
			}
		});

		// Like v-show but with Visibility
		Vue.directive('visibility', function (el, binding) {
			$(el).css('visibility', (binding.value ? 'visible' : 'hidden')) ;
		})

		// Like v-show but with Visibility
		Vue.directive('visible', function (el, binding) {
			$(el).css('visibility', (binding.value ? 'visible' : 'hidden')) ;
		})

		// Like v-show but with Visibility
		Vue.directive('pointer-event-none', function (el, binding) {
			if (binding.value == true) $(el).css('pointer-events', 'none') ;
		})



		// print text with <br />
		let printTextHtmlMl = function(el, value){
			if (value == undefined) return;
			if (value == null) return;
			let string = Tools.escapeHtml(value);
			el.innerHTML = string.replace(/\n/g, "\n<br />");
		}

		Vue.directive('text-ml', {
			inserted: function (el, binding) {
				printTextHtmlMl(el, binding.value);
			},
			update: function (el, binding) {
				printTextHtmlMl(el, binding.value);
			}
		});


		


	}
}