import { All, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('api')
export class ApiController {
	constructor() { }


	/*@Get(':api/:operation')
	getApi(@Req() request: Request): string {
		let api = request.params.api;
		let operation = request.params.operation;

		let debug = `Api: ${api}:${operation}`;

		console.log(debug);
		return JSON.stringify({ api: api});
	}*/

	//@Get(':api/:operation')
	@All(':api/:operation')
	getApi2(
		@Param('api') api: string,
		@Param('operation') operation: string,
		@Req() request: Request,
		@Res() res: Response
	) {
		
		let debug = `Api2: ${api}:${operation}`;

		console.log(debug);

		res.status(HttpStatus.OK).json({ api: api});
	}
}
