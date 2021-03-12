import { All, Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ApiService } from 'src/app/Services/Api/api.service';
import { ApiContext } from 'src/app/Services/Api/ApiContext';

@Controller('api/consult')
@ApiTags('Consult')
export class ApiConsultController {
	constructor(
		private readonly apiService: ApiService,
		private readonly configService: ConfigService
	) { }

	@Post('list')
	@ApiQuery({ name: 'clientId', required: true })
	async list(@Param() params, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, request, response, session, async function(app, context)
		{
			const clientId = context.getParam('clientId', ApiContext.TYPE_INT, null);
			return await app.WFConsult.list(clientId);
		});
	}


	@Post('create')
	@ApiQuery({ name: 'clientId', required: true })
	@ApiQuery({ name: 'date', required: true })
	async create(@Param() params, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, request, response, session, async function(app, context)
		{
			const clientId = context.getParam('clientId', ApiContext.TYPE_INT, null);
			const date = context.getParam('date', ApiContext.TYPE_STRING, null);

			return await app.WFConsult.create(clientId, date);
		});
	}

}
