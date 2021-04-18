import { ConfigService } from "@nestjs/config";
import { Connection, EntityManager, EntityTarget, FindManyOptions, QueryRunner, SelectQueryBuilder } from "typeorm";
import { App } from "./App";
import { ClientHelper } from "./Helpers/ClientHelper";
import { ConsultHelper } from "./Helpers/ConsultHelper";
import { UserHelper } from "./Helpers/UserHelper";
import { WikiHelper } from "./Helpers/WikiHelper";
import { ObjectTools } from "./Tools/ObjectTools";
import { WFClient } from "./WF/WFClient";
import { WFConsult } from "./WF/WFConsult";
import { WFUser } from "./WF/WFUser";
import { WFWiki } from "./WF/WFWiki";

export class AppBase {
	
	constructor(protected app: App) {
		this.connection = app.connection;
		this.queryRunner = app.queryRunner;
		this.entityManager = app.queryRunner.manager;
		this.configService = app.configService;
		this.session = app.session;
	}

	protected connection: Connection;
	protected queryRunner: QueryRunner;
	protected entityManager: EntityManager;
	protected configService: ConfigService;
	protected session: any;

	protected async find<Entity>(entityClass: EntityTarget<Entity>, options?: FindManyOptions<Entity>): Promise<Entity[]>{
		return this.entityManager.find(entityClass, options);
	}
	
	protected async query(query: string, parameters?: any[]): Promise<any[]> {
		return await this.queryRunner.query(query, parameters);
	}
	
	protected async findIndexedById<Entity>(entityClass: EntityTarget<Entity>, options?: FindManyOptions<Entity>): Promise<{ [id:string] : Entity }> {
		return ObjectTools.arrayToObjectIndexed(
			await this.find(entityClass, options ),
			'id');
	}


	protected async queryIndexedById(query: string, parameters?: any[]): Promise<{ [id:string] : any }> {
		return ObjectTools.arrayToObjectIndexed(
			await this.query(query, parameters),
			'id');
	}

	


	
	get WFUser(): WFUser { return this.app.WFUser; }
	get WFClient(): WFClient { return this.app.WFClient; }
	get WFConsult(): WFConsult { return this.app.WFConsult; }
	get WFWiki(): WFWiki { return this.app.WFWiki; }

	get UserHelper(): UserHelper { return this.app.UserHelper; }
	get ClientHelper(): ClientHelper { return this.app.ClientHelper; }
	get ConsultHelper(): ConsultHelper { return this.app.ConsultHelper; }
	get WikiHelper(): WikiHelper { return this.app.WikiHelper; }

}



