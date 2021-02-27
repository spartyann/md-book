import * as bcrypt from 'bcrypt';

export class PasswordTools
{
	static async hashPassword(password: string)
	{
		return await bcrypt.hash(password, 20);
	}

	static async matchPassword(password: string, hash: string)
	{
		return await bcrypt.compare(password, hash);
	}
}

  