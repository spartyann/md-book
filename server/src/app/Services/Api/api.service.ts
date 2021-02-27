import { Injectable, RequestMapping } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { App } from 'src/app/App';
import { Connection } from 'typeorm';
import { ApiException } from '../../Exceptions/ApiException';
import { AppException } from '../../Exceptions/AppException';
import { UserException } from '../../Exceptions/UserException';
import { ApiUser } from './ApiUser';

@Injectable()
export class ApiService {

	constructor(
		private readonly connection: Connection,
		private readonly configService: ConfigService
	) { }
	
	async runApi(apiName, action, params, session: any)
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
		if (api[action] == undefined) throw new ApiException("Action does not exists");

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
	}

}
