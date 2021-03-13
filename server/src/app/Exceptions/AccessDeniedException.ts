import { AppException } from "./AppException";

export class AccessDeniedException extends AppException {


	constructor(message: string = null)
	{
		super(message == null ? 'Accès non autorisé' : message);
		this.name = 'AccessDeniedException';
	}

	public getResponse()
	{
		return {
			error: this.name,
			message: this.message,
			statusCode: 403
		};
	}
}
