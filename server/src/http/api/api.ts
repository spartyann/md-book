import { All, Controller, Get, HttpStatus, Param, Post, Req, Res, Session } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AppException } from 'src/app/Exceptions/AppException';
import { ApiService } from 'src/app/Services/Api/api.service';

@Controller('api')
export class ApiController {
	constructor(private readonly apiService: ApiService, private readonly configService: ConfigService) { }

	/*@Get(':api/:action')
	getApi(@Req() request: Request): string {
		let api = request.params.api;
		let action = request.params.action;

		let debug = `Api: ${api}:${action}`;

		console.log(debug);
		return JSON.stringify({ api: api});
	}*/

	//@Get(':api/:action')
	@All(':api/:action')
	async getApi2(
		@Param('api') api: string,
		@Param('action') action: string,
		@Req() request: Request,
		@Res() res: Response,
		@Session() session
	) {

		try
		{
			//console.log(request);
			let resApi = await this.apiService.runApi(api, action, Object.assign({}, request.query, request.body), session);
			res.status(HttpStatus.OK).json(resApi);
		}
		catch(ex)
		{
			if (ex instanceof AppException)
			{
				const resp = ex.getResponse();
				res.status(resp.code).json(resp);
			}
			else res.status(500).json( { error: "Exception", message: "Une erreur interne est suvenue." } );
		}
	}
}
