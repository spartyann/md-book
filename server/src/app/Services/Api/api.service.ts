import { HttpStatus, Injectable, RequestMapping } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { App } from 'src/app/App';
import { Client } from 'src/app/Models/Client.entity';
import { Consult } from 'src/app/Models/Consult.entity';
import { User } from 'src/app/Models/User.entity';
import { Connection, Repository } from 'typeorm';
import { ApiException } from '../../Exceptions/ApiException';
import { AppException } from '../../Exceptions/AppException';
import { UserException } from '../../Exceptions/UserException';
import { ApiContext } from './ApiContext';

@Injectable()
export class ApiService {

	constructor(
		private readonly connection: Connection,
		private readonly configService: ConfigService,
		@InjectRepository(User)
    	private userRepository: Repository<User>,
		@InjectRepository(Client)
    	private clientRepository: Repository<Client>,
		@InjectRepository(Consult)
    	private consultRepository: Repository<Consult>,
	) { }
	
	async runApi(params: any, body: any, request: Request, res: Response, session: any, func: (app: App, context: ApiContext) => any)
	{
		const debug = this.configService.get('DEBUG') == "true";

		// Get post and Get params
		const allParams = Object.assign({}, params, request.query, body == null ? request.body : body);

		// Create a query runner
		const queryRunner = this.connection.createQueryRunner();

		// Create App
		const app = new App(
			this.configService,
			this.connection,
			queryRunner,
			session,
			this.userRepository,
			this.clientRepository,
			this.consultRepository
		);

		// Connect and create transaction
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			// Execute Api and get result
			let apiRes = func(app, new ApiContext(app, allParams));

			// If promise await
			if (apiRes instanceof Promise) apiRes = await apiRes;
		
			// Commit Transaction
			await queryRunner.commitTransaction();

			// Return result
			res.status(HttpStatus.OK).json(apiRes);

		}
		catch (ex)
		{
			await queryRunner.rollbackTransaction();

			if (ex instanceof AppException)
			{
				const resp = ex.getResponse();
				res.status(resp.statusCode).json(resp);
			}
			else if (debug)
			{
				res.status(500).json( { error: "Exception", message: ex.message } );
				throw ex;
			}
			else res.status(500).json( { error: "Exception", message: "Une erreur interne est suvenue." } );

		}
		finally
		{
			await queryRunner.release();
		}
	}

}
