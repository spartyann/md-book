import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestController } from "src/http/test/controller";
import { Connection, QueryRunner } from "typeorm";
import { AppBase } from "./AppBase";
import { UserHelper } from "./Helpers/UserHelper";
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
		if (name == 'WFUser') return new WFUser(this);
		if (name == 'UserHelper') return new UserHelper(this);
	}

	public getModule(name: string): any {
		if (this._modules[name] == undefined) this._modules[name] = this.getModuleFromName(name);
		return this._modules[name];
	}


	get WFUser(): WFUser { return this.getModule('WFUser'); }
	get UserHelper(): UserHelper { return this.getModule('UserHelper'); }


}
