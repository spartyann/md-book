
export class ObjectTools {

	static arrayToObjectIndexed(array: Array<any>, field: string): any {
		let res = {};
		for (let i = 0; i < array.length; i++)
		{
			res[array[i][field]] = array[i];
		}
		return res;
	}

}

