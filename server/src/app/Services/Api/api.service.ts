import { HttpStatus, Injectable, RequestMapping } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { App } from 'src/app/App';
import { Connection } from 'typeorm';
import { ApiException } from '../../Exceptions/ApiException';
import { AppException } from '../../Exceptions/AppException';
import { UserException } from '../../Exceptions/UserException';
import { ApiContext } from './ApiContext';

@Injectable()
export class ApiService {

	constructor(
		private readonly connection: Connection,
		private readonly configService: ConfigService
	) { }
	
	async runApi(request: Request, res: Response, session: any, func: (app: App, context: ApiContext) => any)
	{
		const debug = this.configService.get('DEBUG') == "true";

		// Get post and Get params
		const params = Object.assign({}, request.query, request.body);

		// Create a query runner
		const queryRunner = this.connection.createQueryRunner();

		// Create App
		const app = new App(this.configService, this.connection, queryRunner, session);

		// Connect and create transaction
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			// Execute Api and get result
			let apiRes = func(app, new ApiContext(app, params));

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
				res.status(resp.code).json(resp);
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

	/*async runApi(apiName, action, params, session: any)
	{
		let api = null;

		// Create a query runner
		const queryRunner = this.connection.createQueryRunner();

		// Create App
		const app = new App(this.configService, this.connection, queryRunner, session);

		// Create Api
		if (apiName == "user") api = new ApiUser(app, params);

		// Api and Action exists ?
		if (api == null) throw new ApiException("Api does not exists");
		if (api.actions.indexOf(action) == -1) throw new ApiException("Action does not exists");

		// Connect and create transaction
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			// Execute Api and get result
			let apiRes = api[action]();

			// If promise await
			if (apiRes instanceof Promise) apiRes = await apiRes;
		
			// Commit Transaction
			await queryRunner.commitTransaction();

			// Return result
			return apiRes;
		}
		catch (err)
		{
			await queryRunner.rollbackTransaction();

			throw new AppException(err.message);
		}
		finally
		{
			await queryRunner.release();
		}
	}*/

}
