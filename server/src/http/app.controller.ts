import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { AppService } from '../app/services/app.service';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }
	//@Get()
	//getHome(): string {
	//	return this.appService.getHello();
	//}

	@Get("/")
	getHome(): string {
		let indexFile = join(__dirname, '../../../ui/dist/index.html');
		const data = readFileSync(indexFile);
		return data.toString();
	}

	@Get('/p/*')
	getPage() {
		return this.getHome();
	}
}
