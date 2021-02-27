import { AppBase } from "../AppBase";

export class UserHelper extends AppBase {

	public async getUser(id: Number): Promise<any>
	{
		let res = await this.queryRunner.query("SELECT * FROM users WHERE id = ?", [ id ]);
		if (res.length == 1) return res[0];
		return null;
	}

	public async getUserByEmail(email: string): Promise<any>
	{
		let res = await this.queryRunner.query("SELECT * FROM users WHERE email = ?", [ email ]);
		if (res.length == 1) return res[0];
		return null;
	}

}
