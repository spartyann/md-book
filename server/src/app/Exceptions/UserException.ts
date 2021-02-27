import { AppException } from "./AppException";

export class UserException extends AppException {

	public static readonly TYPE_ERROR = 'error';
	public static readonly TYPE_WARNING = 'warning';

	public type;

	constructor(message: string, type: string = UserException.TYPE_ERROR)
	{
		super(message);
		this.name = 'UserException';
		this.type = type;
	}

	public getResponse()
	{
		return {
			error: this.name,
			message: this.message,
			type: this.type,
			code: 550
		};
	}
}
