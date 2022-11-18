import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  app.use(helmet());

  //cors
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  //importar configService
  const configService = app.get(ConfigService);

  //prefijo global para todas las apis, configurado en app.module en los valores config default
  app.setGlobalPrefix(configService.get<string>('API_GLOBAL_PREFIX'));

  //version de api por default para los que no esten decorados con @Version
  app.enableVersioning({
    prefix: 'v',
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  //obtener el environment de ejecución
  const environment = configService.get('NODE_ENV');

  //en desarrollo levantar swagger
  if (environment === 'development') {
    //obtener valores del package.json
    const appPackage = JSON.parse(readFileSync('package.json').toString());

    //configurar swagger
    const config = new DocumentBuilder()
      .setTitle(appPackage.name)
      .setDescription(appPackage.description)
      .setVersion(appPackage.version)
      .setLicense(appPackage.license, appPackage.repository.url)
      .setContact(
        appPackage.author.name,
        appPackage.author.url,
        appPackage.author.email,
      )
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  //activar validación global en los controllers por medio de los DTOs
  //decorados con class-validator
  app.useGlobalPipes(new ValidationPipe());

  //levantar el api
  await app.listen(configService.get('PORT'));
}
bootstrap();
