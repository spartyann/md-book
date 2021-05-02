import { Body, Controller, Get, HttpStatus, Param, Req, Res, Session } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { ApiService } from '../app/Services/Api/api.service';
import { readFileSync } from 'fs';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Connection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { App } from 'src/app/App';
import {encode} from 'html-entities';

@Controller()
export class AppController {
	constructor(
		private readonly connection: Connection,
		private readonly configService: ConfigService
	) { }
	//@Get()
	//getHome(): string {
	//	return this.ApiService.getHello();
	//}

	@Get("/")
	@ApiExcludeEndpoint()
	getHome(): string {
		let indexFile = join(__dirname, '../../../ui/dist/index.html');
		const data = readFileSync(indexFile).toString();
		return data;
	}


	@Get("/share/wiki/:alias")
	@ApiExcludeEndpoint()
	async getShareWiki(@Param() params, @Session() session) {
		
		// Create a query runner
		const queryRunner = this.connection.createQueryRunner();
	
		// Create App
		const app = new App(
			this.configService,
			this.connection,
			queryRunner,
			session
		);

		let page = await app.WikiHelper.getPageByShareAlias(params.alias);
		
	
		let indexFile = join(__dirname, '../../../ui/dist/index.html');
		let data = readFileSync(indexFile).toString();

		data = data.replace(/<title>.*<\/title>/g, "<title>" + encode(page.title) + "</title>");

		let description = page.subTitle;
		if (description != "" && page.summary != "") description += "\n";
		description = description + page.summary;

		data = data.replace(/<meta +name *= *"description" +content="[^"]*">/g, '<meta name="description" content="' + encode(description) + '">');

		return data;
	}
}
