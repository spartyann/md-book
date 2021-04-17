import { All, Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ApiService } from 'src/app/Services/Api/api.service';
import { ApiContext } from 'src/app/Services/Api/ApiContext';
import { ConsultCreate, ConsultUpdate } from './Schemas';

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

}
