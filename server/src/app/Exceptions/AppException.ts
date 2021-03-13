
export class AppException extends Error {

	constructor(message: string)
	{
		super(message);
		this.name = 'AppException';
	}

	public getResponse()
	{
		return {
			error: this.name,
			message: process.env.DEBUG == 'true' ? this.message : 'Une erreur interne est suvenue.',
			statusCode: 500
		};
	}
}
