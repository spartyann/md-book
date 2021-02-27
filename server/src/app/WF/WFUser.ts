import { AppBase } from "../AppBase";
import { ApiException } from "../Exceptions/ApiException";
import { UserException } from "../Exceptions/UserException";
import { PasswordTools } from "../Tools/PasswordTools";

export class WFUser extends AppBase {

	async login(email, pwd)
	{
		
		let user = await this.UserHelper.getUserByEmail(email);

		if (user == null || await PasswordTools.matchPassword(pwd, user.password) == false)
		{
			throw new UserException('Login ou mot de passe invalide');
		}

		this.session.user = user;

		return user;
	}

	async logout()
	{
		this.session.user = null;
		return 'ok';
	}

	async getUser()
	{
		if (this.session.user == null) throw new ApiException('No user logged');

		return this.session.user;
	}

}
