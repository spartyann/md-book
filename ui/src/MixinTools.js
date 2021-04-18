let entityMap = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
	'/': '&#x2F;',
	'`': '&#x60;',
	'=': '&#x3D;'
};

export default {

	methods: {

		localStorageGet(key, defaultVal = null)
		{
			const val = localStorage.getItem(key);
			if (val === null) return defaultVal;
			return JSON.parse(val);
		},

		localStorageSet(key, val)
		{
			localStorage.setItem(key, JSON.stringify(val));
		},

		localStorageRemove(key)
		{
			localStorage.removeItem(key);
		},
	
		escapeHtml(string)
		{
			return String(string).replace(/[&<>"'`=/]/g, function fromEntityMap (s) {
				return entityMap[s];
			});
		},
	

		uuid: function()
		{
			let s4 = function(){ return Math.floor( ( 1 + Math.random() ) * 0x10000 ).toString(16).substring(1);}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		},

	}
}

