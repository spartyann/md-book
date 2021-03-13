import { All, Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AppException } from 'src/app/Exceptions/AppException';
import { ApiService } from 'src/app/Services/Api/api.service';
import { ApiContext } from 'src/app/Services/Api/ApiContext';
import { UserUpdate } from './Schemas';

@Controller('api/user')
@ApiTags('User')
export class ApiUserController {
	constructor(
		private readonly apiService: ApiService,
	) { }

	@Post('get_user')
	async getUser(@Param() params, @Body() body, @Req() request: Request, @Res() response: Response, @Session() session) {
		this.apiService.runApi(params, body, request, response, session, async function(app, context)
		{
			return await app.WFUser.get();
		});
	}


	@Post('login')
	//@ApiBody({ email: String, pwd: String })
	@ApiQuery({ name: 'email' })
	@ApiQuery({ name: 'pwd' })
	async login(@Param() params, @Body() body, @Req() request: Request, @Res() response: Response, @Session() session,
		) {

		//console.log(b);
		this.apiService.runApi(params, body, request, response, session, async function(app, context)
		{
			const email = context.getParam('email', ApiContext.TYPE_STRING);
			const pwd = context.getParam('pwd', ApiContext.TYPE_STRING);

			let user = await app.WFUser.login(email, pwd);

			return user;
		});
	}


	@Post('logout')
	async logout(@Param() params, @Body() body, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, body, request, response, session, async function(app, context)
		{
			return await app.WFUser.logout();
		});
	}


	@Post('update')
	async update(@Param() params, @Body() user: UserUpdate, @Req() request: Request, @Res() response: Response, @Session() session) {

		this.apiService.runApi(params, user, request, response, session, async function(app, context)
		{
			return await app.WFUser.update(user);
		});
	}

}
