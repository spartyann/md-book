import { ConfigService } from "@nestjs/config";
import { Connection, QueryRunner, Repository } from "typeorm";
import { ClientHelper } from "./Helpers/ClientHelper";
import { ConfigurationHelper } from "./Helpers/ConfigurationHelper";
import { ConsultHelper } from "./Helpers/ConsultHelper";
import { RecoveryHelper } from "./Helpers/RecoveryHelper";
import { UserHelper } from "./Helpers/UserHelper";
import { WikiHelper } from "./Helpers/WikiHelper";
import { WFClient } from "./WF/WFClient";
import { WFConsult } from "./WF/WFConsult";
import { WFUser } from "./WF/WFUser";
import { WFWiki } from "./WF/WFWiki";

export class App{

	private _modules = {};

	constructor(
		readonly configService: ConfigService,
		readonly connection: Connection,
		readonly queryRunner: QueryRunner,
		readonly session: any
	)
	{

	}

	private createModuleFromName(name: string): any
	{
		// WFs
		if (name == 'WFUser') return new WFUser(this);
		if (name == 'WFClient') return new WFClient(this);
		if (name == 'WFConsult') return new WFConsult(this);
		if (name == 'WFWiki') return new WFWiki(this);

		// Helpers
		if (name == 'UserHelper') return new UserHelper(this);
		if (name == 'ClientHelper') return new ClientHelper(this);
		if (name == 'ConsultHelper') return new ConsultHelper(this);
		if (name == 'WikiHelper') return new WikiHelper(this);
		if (name == 'RecoveryHelper') return new RecoveryHelper(this);
		if (name == 'ConfigurationHelper') return new ConfigurationHelper(this);
	}

	public getModule(name: string): any {
		if (this._modules[name] == undefined) this._modules[name] = this.createModuleFromName(name);
		return this._modules[name];
	}

	// Wfs
	get WFUser(): WFUser { return this.getModule('WFUser'); }
	get WFClient(): WFClient { return this.getModule('WFClient'); }
	get WFConsult(): WFConsult { return this.getModule('WFConsult'); }
	get WFWiki(): WFWiki { return this.getModule('WFWiki'); }


	// Helpers
	get UserHelper(): UserHelper { return this.getModule('UserHelper'); }
	get ClientHelper(): ClientHelper { return this.getModule('ClientHelper'); }
	get ConsultHelper(): ConsultHelper { return this.getModule('ConsultHelper'); }
	get WikiHelper(): WikiHelper { return this.getModule('WikiHelper'); }
	get RecoveryHelper(): RecoveryHelper { return this.getModule('RecoveryHelper'); }
	get ConfigurationHelper(): ConfigurationHelper { return this.getModule('ConfigurationHelper'); }

}
