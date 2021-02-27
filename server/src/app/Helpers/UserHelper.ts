import { AppBase } from "../AppBase";

export class UserHelper extends AppBase {

	public getUser(id: Number): any
	{
		
		return {};
	}

	public async getUserByEmail(email: string): Promise<any>
	{
		let res = await this.queryRunner.query("SELECT * FROM users WHERE email = ?", [ email ]);
		if (res.length == 1) return res[0];
		return null;
	}

}
