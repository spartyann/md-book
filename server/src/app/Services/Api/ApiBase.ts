import { App } from "src/app/App";
import { ApiException } from "src/app/Exceptions/ApiException";

export class ApiBase {

	constructor(protected readonly app: App, protected readonly params: any) { }

	public actions = [];
	public static readonly TYPE_STRING = 'string';
	public static readonly TYPE_INT = 'int';
	public static readonly TYPE_JSON = 'json';

	protected getParam(name: string, type: string, defaultValue: any = undefined)
	{
		// Check Exists
		if (this.params[name] === undefined && defaultValue == undefined) throw new ApiException("Missing parameter: " + name);

		// Default Value
		if (this.params[name] === undefined) return defaultValue;

		// Types of param
		let val:any = this.params[name];

		if (type == ApiBase.TYPE_STRING)
		{
			if (val === null) return '';
			if (typeof val === 'string') return val;
			throw new ApiException("Bad parameter: " + name);
		}
		if (type == ApiBase.TYPE_INT)
		{
			if (val === null) return 0;
			val = parseInt(val);
			if (Number.isInteger(val)) return val;
			throw new ApiException("Bad parameter: " + name);
		}
		if (type == ApiBase.TYPE_JSON)
		{
			if (val === null) return 0;
			if (typeof val === 'string')
			{
				try {
					return JSON.parse(val);
				} catch (ex) { throw new ApiException("Bad parameter (invalid json): " + name); }
			}
			throw new ApiException("Bad parameter: " + name);
		}

	}

}
