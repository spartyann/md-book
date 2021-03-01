import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as compression from 'compression';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService: ConfigService = app.get(ConfigService);

	if (configService.get('DEBUG', 'false') == 'true')
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

	app.use(
		session({
			secret: configService.get('SECRET', 'my-secret'),
			resave: false,
			saveUninitialized: false,
			/*cookie: {
				secure: true
			}*/
		}),
	);
	app.use(compression());

	// Swagger
	const config = new DocumentBuilder()
		.setTitle('Api Documentation')
		.setDescription('')
		.setVersion('1.0')
		//.addTag('api')
		.build();
	const document = SwaggerModule.createDocument(app, config, {

	});
	SwaggerModule.setup('api', app, document, {

	});

	// Run		
	await app.listen(configService.get<number>('PORT', 3000));
}
bootstrap();
