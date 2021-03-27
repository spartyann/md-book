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

/**
 * Tools
 * 
 */
export default class Tools
{

	/**
	 * Escape string for HTML print
	 * 
	 * @param {*} string String to escape
	 * 
	 * @returns {*} Escaped string
	 */
	static escapeHtml(string)
    {
		return String(string).replace(/[&<>"'`=/]/g, function fromEntityMap (s) {
			return entityMap[s];
		});
	}

	/**
	 * generate new uuid
	 */
	static uuid()
	{
		let s4 = function() { return Math.floor( ( 1 + Math.random() ) * 0x10000 ).toString(16).substring(1); }
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}


	static calculateAge = function(birthday)
	{
		if (birthday == null) return '';

		if (birthday instanceof Date == false) birthday = new Date(birthday);

		// diff = now (in ms) - birthday (in ms)
		// diff = age in ms
		const diff = Date.now() - birthday.getTime(); 
		
		// [2] new Date(value); -> value = ms since 1970
		// = do as if person was born in 1970
		// this works cause we are interested in age, not a year
		const ageDate = new Date(diff); 
		
		// age = year if person was born in 1970 (= 1989) - 1970 = 19
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	};
}
