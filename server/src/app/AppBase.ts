import { ConfigService } from "@nestjs/config";
import { Connection, QueryRunner } from "typeorm";
import { App } from "./App";
import { UserHelper } from "./Helpers/UserHelper";
import { WFUser } from "./WF/WFUser";

export class AppBase {
	
	constructor(protected app: App) {
		this.connection = app.connection;
		this.queryRunner = app.queryRunner;
		this.configService = app.configService;
		this.session = app.session;
	}

	protected connection: Connection;
	protected queryRunner: QueryRunner;
	protected configService: ConfigService;
	protected session: any;

	
	get WFUser(): WFUser { return this.app.WFUser; }
	get UserHelper(): UserHelper { return this.app.UserHelper; }


}

