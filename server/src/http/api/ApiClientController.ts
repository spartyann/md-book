import { All, Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ApiService } from 'src/app/Services/Api/api.service';
import { ApiContext } from 'src/app/Services/Api/ApiContext';

@Controller('api/client')
@ApiTags('Client')
export class ApiClientController {
	constructor(
		private readonly apiService: ApiService,
		private readonly configService: ConfigService
	) { }

	@Post('list')
	async list(@Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(request, response, session, async function(app, context)
		{
			return await app.WFClient.list();
		});
	}

	@Post('get')
	@ApiQuery({ name: 'id', required: true })
	async get(@Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(request, response, session, async function(app, context)
		{
			const clientId = context.getParam('id', ApiContext.TYPE_INT, null);
			return await app.WFClient.get(clientId);
		});
	}

}
