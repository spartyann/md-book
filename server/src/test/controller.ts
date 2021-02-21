import { All, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Connection } from 'typeorm';

@Controller('test')
export class TestController {
	constructor(private connection: Connection) { }

	@Get('test1')
	async getApi2(@Req() request: Request, @Res() res: Response) {
		
		console.log(await this.connection.query("SELECT 1"));

		
		res.status(HttpStatus.OK).json({ });
	}
}
