import { App } from "src/app/App";
import { ApiService } from "./api.service";
import { ApiBase } from "./ApiBase";

export class ApiUser extends ApiBase {

	public actions = ['login', 'logout', 'get_user'];
	
	async login()
	{
		const email = this.getParam('email', ApiBase.TYPE_STRING);
		const pwd = this.getParam('pwd', ApiBase.TYPE_STRING);

		let user = await this.app.WFUser.login(email, pwd);

		return user;
	}

	async logout()
	{
		return await this.app.WFUser.logout();
	}

	async get_user()
	{
		return await this.app.WFUser.getUser();
	}

}
