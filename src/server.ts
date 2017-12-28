import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

import { AppModule } from './apps/demo/app.module';
import { CustomExceptionFilter } from './libs/core/exceptions/custom-exception.filter';
import { ValidationPipe } from './libs/core/pipes/validation.pipe';


async function bootstrap() {
	const packageBody = require('../package.json');
	config();
	const app = await NestFactory.create(AppModule);
	app.useGlobalFilters(new CustomExceptionFilter());
	app.useGlobalPipes(new ValidationPipe());

	const options = new DocumentBuilder()
		.setTitle(packageBody.name)
		.setDescription(packageBody.description)
		.setVersion(packageBody.version)
		.addBearerAuth('Authorization', 'header')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	/*
		const stt = require('swagger-test-templates');
		const testsConfig = {
			assertionFormat: 'should',
			testModule: 'request'
		};
		const tests = stt.testGen(document, testsConfig);
		tests.forEach(test => {
			fs.writeFileSync(path.resolve(__dirname, '..', 'tests', test.name), test.test);
		});
	*/
	SwaggerModule.setup('/swagger', app, document);

	await app.listen(process.env.PORT && isNaN(+process.env.PORT) ? 5000 : 3000);
}
bootstrap();
