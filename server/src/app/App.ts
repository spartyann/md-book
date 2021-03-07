import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestController } from "src/http/test/controller";
import { Connection, QueryRunner } from "typeorm";
import { AppBase } from "./AppBase";
import { ClientHelper } from "./Helpers/ClientHelper";
import { ConsultHelper } from "./Helpers/ConsultHelper";
import { UserHelper } from "./Helpers/UserHelper";
import { WFClient } from "./WF/WFClient";
import { WFConsult } from "./WF/WFConsult";
import { WFUser } from "./WF/WFUser";

export class App{

	private _modules = {};

	constructor(
		readonly configService: ConfigService,
		readonly connection: Connection,
		readonly queryRunner: QueryRunner,
		readonly session: any)
	{

	}

	private getModuleFromName(name: string): any
	{
		// WFs
		if (name == 'WFUser') return new WFUser(this);
		if (name == 'WFClient') return new WFClient(this);
		if (name == 'WFConsult') return new WFConsult(this);

		// Helpers
		if (name == 'UserHelper') return new UserHelper(this);
		if (name == 'ClientHelper') return new ClientHelper(this);
		if (name == 'ConsultHelper') return new ConsultHelper(this);
	}

	public getModule(name: string): any {
		if (this._modules[name] == undefined) this._modules[name] = this.getModuleFromName(name);
		return this._modules[name];
	}

	// Wfs
	get WFUser(): WFUser { return this.getModule('WFUser'); }
	get WFClient(): WFClient { return this.getModule('WFClient'); }
	get WFConsult(): WFConsult { return this.getModule('WFConsult'); }

	// Helpers
	get UserHelper(): UserHelper { return this.getModule('UserHelper'); }
	get ClientHelper(): ClientHelper { return this.getModule('ClientHelper'); }
	get ConsultHelper(): ConsultHelper { return this.getModule('ConsultHelper'); }

}
