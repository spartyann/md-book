import { AppBase } from "../AppBase";
import { Recovery } from "../Models/Recovery.entity";

export class RecoveryHelper extends AppBase {

	public async add(object: string, data: any, maxCount: number = 10): Promise<any>
	{
		// Insert Recovery Data
		await this.queryRunner.query('INSERT INTO recovery(object, data) VALUES (?,?)', [
			object, JSON.stringify(data, null, 2)
		]);
		
		// Delete par max count
		let recoveries = await this.find(Recovery, { select: [ 'id' ], where: { object: object }, order: { id: 'ASC' }});
		
		if (recoveries.length > maxCount)
		{
			let recoIdsToDelete = recoveries.splice(0, recoveries.length - maxCount).map((item) => item.id);
			await this.queryRunner.query('DELETE FROM recovery WHERE id IN (' + recoIdsToDelete.join(',') + ')');
		}

		// Delete per age
		const maxDays: number = 31 * 4;
		await this.queryRunner.query('DELETE FROM recovery WHERE DATEDIFF(now(), date) > ' + maxDays);
	}


}
