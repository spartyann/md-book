import { All, Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ApiService } from 'src/app/Services/Api/api.service';
import { ApiContext } from 'src/app/Services/Api/ApiContext';
import { ConsultCreate, ConsultUpdate, wikiPageUpdate } from './Schemas';

@Controller('api/wiki')
@ApiTags('Wiki')
export class ApiWikiController {
	constructor(
		private readonly apiService: ApiService,
	) { }

	@Post('list')
	async list(@Param() params, @Body() body, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, body, request, response, session, async function(app, context)
		{
			return await app.WFWiki.list();
		});
	}

	@Post('page/:id')
	@ApiParam({ name: 'id', required: true })
	async get(@Param() params, @Body() body, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, body, request, response, session, async function(app, context)
		{
			const id = context.getParam('id', ApiContext.TYPE_INT, null);

			return await app.WFWiki.getPage(id);
		});
	}

	@Post('page/:id/update')
	@ApiParam({ name: 'id', required: true })
	async update(@Param() params, @Body() body: wikiPageUpdate, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, body, request, response, session, async function(app, context)
		{
			body.id = context.getParam('id', ApiContext.TYPE_INT, null);
			return await app.WFWiki.update(body);
		});
	}


}
