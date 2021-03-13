import { UserUpdate } from "src/http/api/Schemas";
import { AppBase } from "../AppBase";
import { PasswordTools } from "../Tools/PasswordTools";

export class UserHelper extends AppBase {

	public async get(id: number): Promise<any>
	{
		let res = await this.queryRunner.query("SELECT * FROM user WHERE id = ?", [ id ]);
		if (res.length == 1) return res[0];
		return null;
	}

	public async getUserByEmail(email: string): Promise<any>
	{
		let res = await this.queryRunner.query("SELECT * FROM user WHERE email = ?", [ email ]);
		if (res.length == 1) return res[0];
		return null;
	}

	async update(user: UserUpdate)
	{
		let values = [];
		let strings = [];

		let name = user.firstName + " " + user.lastName;

		values.push("name = ?");
		strings.push(name);

		values.push("firstName = ?");
		strings.push(user.firstName);

		values.push("lastName = ?");
		strings.push(user.lastName);

		values.push("email = ?");
		strings.push(user.email);


		if (user.pwd != null)
		{
			values.push("password = ?"); 
			strings.push(await PasswordTools.hashPassword(user.pwd));
		}
		

		let sql = 'UPDATE user SET ' + values.join(',') + " WHERE id = " + user.id;

		await this.queryRunner.query(sql, strings);
	}

}
