import { AppBase } from "../AppBase";
import { Configuration } from "../Models/Configuration.entity";
import { ObjectTools } from "../Tools/ObjectTools";

export class ConfigurationHelper extends AppBase {

	private _cache: { [ name: string ] : Configuration } = null;

	// Get option
	public async get(name: string): Promise<any>
	{
		if (this._cache == null)
		{
			this._cache = ObjectTools.arrayToObjectIndexed(
				await this.find(Configuration),
				'name') ;
		}

		return this._cache[name].value;
	}


}
