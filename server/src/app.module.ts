import { Module } from '@nestjs/common';
import { AppController } from './http/app.controller';
import { ApiService } from './app/Services/Api/api.service';
import { TestController } from './http/test/controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiUserController } from './http/api/ApiUserController';
import { ApiClientController } from './http/api/ApiClientController';
import { ApiConsultController } from './http/api/ApiConsultController';
import { ApiWikiController } from './http/api/ApiWikiController';
import { User } from './app/Models/User.entity';
import { Consult } from './app/Models/Consult.entity';
import { Client } from './app/Models/Client.entity';
import { WikiPage } from './app/Models/WikiPage.entity';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'mysql',
				host: configService.get('DB_HOST'),
				port: +configService.get<number>('DB_PORT'),
				username: configService.get('DB_USERNAME'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_DATABASE'),
				charset : 'utf8mb4',
				//entities: ["dist/**/*.entity{.ts,.js}"],
				entities: [ User, Consult, Client ],
				synchronize: false,
				autoLoadEntities: true,
				migrations: ["dist/migrations/*{.ts,.js}"],
				migrationsTableName: "migrations",
				migrationsRun: true,
			}),
		  	inject: [ConfigService],
		}),
		TypeOrmModule.forFeature([ User, Consult, Client, WikiPage ]),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '../../ui/dist'),
			serveStaticOptions: {
				//index: false,
				//redirect: false
			}
		}),
	],
	controllers: [
		AppController,
		ApiUserController,
		ApiClientController,
		ApiConsultController,
		ApiWikiController,
		TestController
	],
	providers: [ ApiService ],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
