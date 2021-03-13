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
}
