import { All, Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AppException } from 'src/app/Exceptions/AppException';
import { ApiService } from 'src/app/Services/Api/api.service';
import { ApiContext } from 'src/app/Services/Api/ApiContext';

@Controller('api/user')
export class ApiUserController {
	constructor(
		private readonly apiService: ApiService,
		private readonly configService: ConfigService
	) { }

	@Post('get_user')
	async getUser(@Req() request: Request, @Res() response: Response, @Session() session) {
		this.apiService.runApi(request, response, session, async function(app, context)
		{
			return await app.WFUser.get();
		});
	}


	@Post('login')
	//@ApiBody({ email: String, pwd: String })
	@ApiQuery({ name: 'email' })
	@ApiQuery({ name: 'pwd' })
	async login(@Req() request: Request, @Res() response: Response, @Session() session,
		) {

		//console.log(b);
		this.apiService.runApi(request, response, session, async function(app, context)
		{
			const email = context.getParam('email', ApiContext.TYPE_STRING);
			const pwd = context.getParam('pwd', ApiContext.TYPE_STRING);

			let user = await app.WFUser.login(email, pwd);

			return user;
		});
	}


	@Post('logout')
	async logout(@Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(request, response, session, async function(app, context)
		{
			return await app.WFUser.logout();
		});
	}


	@Post('update')
	@ApiQuery({ name: 'id', required: false })
	@ApiQuery({ name: 'first_name', required: false })
	@ApiQuery({ name: 'last_name', required: false })
	@ApiQuery({ name: 'email', required: false })
	@ApiQuery({ name: 'pwd', required: false })
	async update(@Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(request, response, session, async function(app, context)
		{
			const id = context.getParam('id', ApiContext.TYPE_INT, null);
			const first_name = context.getParam('first_name', ApiContext.TYPE_STRING, null);
			const last_name = context.getParam('last_name', ApiContext.TYPE_STRING, null);
			const email = context.getParam('email', ApiContext.TYPE_STRING, null);
			const pwd = context.getParam('pwd', ApiContext.TYPE_STRING, null);

			return await app.WFUser.update(id, first_name, last_name, email, pwd);
		});
	}

}
