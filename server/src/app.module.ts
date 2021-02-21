import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api';
import { TestController } from './test/controller';
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
		}),
	],
	controllers: [ AppController, ApiController, TestController],
	providers: [ AppService ],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
