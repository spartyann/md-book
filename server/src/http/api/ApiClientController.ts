import { All, Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ApiService } from 'src/app/Services/Api/api.service';
import { ApiContext } from 'src/app/Services/Api/ApiContext';
import { ClientCreate } from './Schemas';

@Controller('api/client')
@ApiTags('Client')
export class ApiClientController {
	constructor(
		private readonly apiService: ApiService,
	) { }

	@Post('list')
	async list(@Param() params, @Body() body, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, body, request, response, session, async function(app, context)
		{
			return await app.WFClient.list();
		});
	}

	@Post('create')
	async create(@Param() params, @Body() client: ClientCreate, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, client, request, response, session, async function(app, context)
		{
			return await app.WFClient.create(client);
		});
	}

	@Post(':id')
	@ApiParam({ name: 'id', required: true })
	async get(@Param() params, @Body() body, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, body, request, response, session, async function(app, context)
		{
			const clientId = context.getParam('id', ApiContext.TYPE_INT, null);
			return await app.WFClient.get(clientId);
		});
	}

	@Post(':id/file')
	@ApiParam({ name: 'id', required: true })
	async file(@Param() params, @Body() body, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, body, request, response, session, async function(app, context)
		{
			const clientId = context.getParam('id', ApiContext.TYPE_INT, null);
			return await app.WFClient.get(clientId);
		});
	}



	@Post(':id/update')
	@ApiParam({ name: 'id', required: true })
	@ApiQuery({ name: 'name', required: false })
	@ApiQuery({ name: 'firstName', required: false })
	@ApiQuery({ name: 'lastName', required: false })
	@ApiQuery({ name: 'email', required: false })
	@ApiQuery({ name: 'comment', required: false })
	async update(@Param() params, @Body() body, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, body, request, response, session, async function(app, context)
		{
			const id = context.getParam('id', ApiContext.TYPE_INT, null);
			const name = context.getParam('name', ApiContext.TYPE_STRING, null);
			const firstName = context.getParam('firstName', ApiContext.TYPE_STRING, null);
			const lastName = context.getParam('lastName', ApiContext.TYPE_STRING, null);
			const email = context.getParam('email', ApiContext.TYPE_STRING, null);
			const comment = context.getParam('comment', ApiContext.TYPE_STRING, null);

			return await app.WFClient.update(id, name, firstName, lastName, email, comment);
		});
	}

}
