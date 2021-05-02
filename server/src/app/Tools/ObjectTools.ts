
export class ObjectTools {

	static arrayToObjectIndexed<T>(array: Array<T>, field: string): { [id:string] : T } {
		let res = {};

		for (let i = 0; i < array.length; i++)
		{
			res[array[i][field]] = array[i];
		}

		return res;
	}

}

