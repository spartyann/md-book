import { All, Controller, Get, HttpStatus, Param, Post, Req, Res, Session } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Connection } from 'typeorm';

@Controller('test')
export class TestController {
	constructor(private connection: Connection) { }

	@Get('test1')
	@ApiExcludeEndpoint()
	async getApi2(@Req() req: Request, @Session() session) {
		
		console.log(await this.connection.query("SELECT 1"));
		
		session.test = 1;

		session.views = (session.views || 0) + 1;

    	return session.views;
	}

	/*@Get(':api/:action')
	getApi(@Req() request: Request): string {
		let api = request.params.api;
		let action = request.params.action;

		let debug = `Api: ${api}:${action}`;

		console.log(debug);
		return JSON.stringify({ api: api});
	}*/
}
