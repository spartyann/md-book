import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
const FileStore = require('session-file-store')(session);

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService: ConfigService = app.get(ConfigService);

	const isDebug = configService.get('DEBUG', 'false') == 'true';

	if (isDebug)
	{
		app.enableCors({
			origin : "http://localhost:8080",
			credentials: true
		});
	}
	else
	{
		//app.enableCors();
	}

	let sessionOptions: session.SessionOptions = {
		secret: configService.get('SECRET', 'my-secret'),
		resave: false,
		saveUninitialized: false,
		/*cookie: {
			secure: true
		}*/
	};

	if (isDebug)
	{
		// Set file session storage to avoid session delete after code update
		sessionOptions.store = new FileStore({
			path: './sessions'
		});
	}

	app.use(session(sessionOptions));
	app.use(compression());

	// Swagger
	const config = new DocumentBuilder()
		.setTitle('Api Documentation')
		.setDescription('')
		.setVersion('1.0')
		//.addTag('api')
		.build();
	const document = SwaggerModule.createDocument(app, config, { });
	SwaggerModule.setup('api', app, document, { });

	// Validation Pipe
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true
	}));

	// Run
	await app.listen(configService.get<number>('PORT', 3000));
}
bootstrap();
