
export default {

	locale: 'fr', // set locale
	messages: {  // set locale messages
		en: {
			message: {
				title: 'MD Book'
			}
		},
		fr: {
			message: {
				title: 'MD Book'
			}
		}
	},

	dateTimeFormats: {
		'fr': {
			short: {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			},
			longDate: {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				weekday: 'short',
			},
			long: {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				weekday: 'long',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true
			}
		},
	}
}
