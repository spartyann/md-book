import { Module } from '@nestjs/common';
import { AppController } from './http/app.controller';
import { ApiService } from './app/Services/Api/api.service';
import { ApiController } from './http/api/api';
import { TestController } from './http/test/controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
				//entities: ["dist/**/*.entity{.ts,.js}"],
				entities: [],
				synchronize: true,
				migrations: ["dist/migrations/*{.ts,.js}"],
				migrationsTableName: "migrations",
				migrationsRun: true,
			}),
		  	inject: [ConfigService],
		}),

		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '../../ui/dist'),
			serveStaticOptions: {
				//index: false,
				//redirect: false
			}
		}),
	],
	controllers: [ AppController, ApiController, TestController],
	providers: [ ApiService ],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
