import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { ApiService } from '../app/Services/Api/api.service';
import { readFileSync } from 'fs';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
	constructor(private readonly ApiService: ApiService) { }
	//@Get()
	//getHome(): string {
	//	return this.ApiService.getHello();
	//}

	@Get("/")
	@ApiExcludeEndpoint()
	getHome(): string {
		let indexFile = join(__dirname, '../../../ui/dist/index.html');
		const data = readFileSync(indexFile);
		return data.toString();
	}

	@Get('/p/*')
	@ApiExcludeEndpoint()
	getPage() {
		return this.getHome();
	}
}
