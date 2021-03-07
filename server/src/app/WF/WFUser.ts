import { AppBase } from "../AppBase";
import { AccessDeniedException } from "../Exceptions/AccessDeniedException";
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

		this.session.userId = user.id;

		return user;
	}

	async logout()
	{
		this.session.userId = null;
		return 'ok';
	}

	async get()
	{
		if (this.session.userId == null) return null;

		return this.UserHelper.getUser(this.session.userId);
	}

	async update(id: Number, first_name: string, last_name: string, email: string, clearPwd: string)
	{
		// User logged ?
		if (this.session.userId == null) throw new AccessDeniedException();

		// Current user
		if (id === null) id = this.session.userId;

		// Not current User ?
		if (this.session.userId != id) throw new AccessDeniedException();

		// Current User
		let currentUser = await this.UserHelper.getUser(id);

		if (first_name == null) first_name = currentUser.first_name;
		if (last_name == null) last_name = currentUser.last_name;
		if (email == null) email = currentUser.email;
		let name = first_name + " " + last_name;

		// Update User
		await this.UserHelper.update(id, name, first_name, last_name, email, clearPwd);

		// Return user
		return await this.UserHelper.getUser(id);
	}

}
