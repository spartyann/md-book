import { AppBase } from "../AppBase";
import { PasswordTools } from "../Tools/PasswordTools";

export class UserHelper extends AppBase {

	public async get(id: Number): Promise<any>
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

	async update(id: Number, name: string, firstName: string, lastName: string, email: string, clearPwd: string)
	{
		let values = [];
		let strings = [];

		if (name !== null) { values.push("name = ?"); strings.push(name); }
		if (firstName !== null) { values.push("first_name = ?"); strings.push(firstName); }
		if (lastName !== null) { values.push("last_name = ?"); strings.push(lastName); }
		if (email !== null) { values.push("email = ?"); strings.push(email); }
		if (clearPwd !== null) { values.push("password = ?"); strings.push(await PasswordTools.hashPassword(clearPwd)); }
		
		if (values.length == 0) return;

		let sql = 'UPDATE users SET ' + values.join(',') + " WHERE id = " + id;

		await this.queryRunner.query(sql, strings);
	}

}
