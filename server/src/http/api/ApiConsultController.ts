import { All, Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ApiService } from 'src/app/Services/Api/api.service';
import { ApiContext } from 'src/app/Services/Api/ApiContext';
import { ConsultCreate, ConsultUpdate } from './Schemas';

@Controller('api/consult')
@ApiTags('Consult')
export class ApiConsultController {
	constructor(
		private readonly apiService: ApiService,
	) { }

	@Post('list')
	@ApiQuery({ name: 'clientId', required: true })
	async list(@Param() params, @Body() body, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, body, request, response, session, async function(app, context)
		{
			const clientId = context.getParam('clientId', ApiContext.TYPE_INT, null);
			return await app.WFConsult.list(clientId);
		});
	}


	@Post('create')
	async create(@Param() params, @Body() body: ConsultCreate, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, body, request, response, session, async function(app, context)
		{
			return await app.WFConsult.create(body);
		});
	}

	@Post(':id')
	@ApiParam({ name: 'id', required: true })
	async get(@Param() params, @Body() body, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, body, request, response, session, async function(app, context)
		{
			const consultId = context.getParam('id', ApiContext.TYPE_INT, null);

			return await app.WFConsult.get(consultId);
		});
	}


	@Post(':id/update')
	@ApiParam({ name: 'id', required: true })
	async update(@Param() params, @Body() body: ConsultUpdate, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, body, request, response, session, async function(app, context)
		{
			body.id = context.getParam('id', ApiContext.TYPE_INT, null);
			return await app.WFConsult.update(body);
		});
	}

}
