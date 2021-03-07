import { ConfigService } from "@nestjs/config";
import { Connection, QueryRunner } from "typeorm";
import { App } from "./App";
import { ClientHelper } from "./Helpers/ClientHelper";
import { ConsultHelper } from "./Helpers/ConsultHelper";
import { UserHelper } from "./Helpers/UserHelper";
import { WFClient } from "./WF/WFClient";
import { WFConsult } from "./WF/WFConsult";
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
	get WFClient(): WFClient { return this.app.WFClient; }
	get WFConsult(): WFConsult { return this.app.WFConsult; }

	get UserHelper(): UserHelper { return this.app.UserHelper; }
	get ClientHelper(): ClientHelper { return this.app.ClientHelper; }
	get ConsultHelper(): ConsultHelper { return this.app.ConsultHelper; }

}

