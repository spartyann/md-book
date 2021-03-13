import { AppException } from "./AppException";

export class ApiException extends AppException {
	constructor(message: string)
	{
		super(message);
		this.name = 'ApiException';
	}

	public getResponse()
	{
		return {
			error: this.name,
			message: this.message,
			statusCode: 540
		};
	}
}
