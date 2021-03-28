const sanitizeHtml = require('sanitize-html');

export class Sanitizer {
	static clean(html: string) {

		return sanitizeHtml(html, {
			allowedTags: [
				"address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
				"h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
				"dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
				"ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
				"em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
				"small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
				"col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "input"
			],
			disallowedTagsMode: 'discard',
			allowedAttributes: {
				a: ['href', 'name', 'target'],
				// We don't currently allow img itself by default, but this
				// would make sense if we did. You could add srcset here,
				// and if you do the URL is checked for safety
				img: ['src'],
				'*': [ 'class', 'checked',  'type', 'title', 'style', 'align', 'alt', 'center', 'bgcolor', 'colspan','rowspan','scope',
					'border','cellpadding','cellspacing','summary','width', 'height' ]
			},
			// Lots of these won't come up by default because we don't allow them
			selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
			// URL schemes we permit
			allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel'],
			allowedSchemesByTag: {},
			allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
			allowProtocolRelative: true,
			enforceHtmlBoundary: false,

			allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
		});
	}

}

