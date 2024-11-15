import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Log4jsService } from 'src/shared/log4js';
import { ConfigurationsInterface } from './interfaces';

export let app: INestApplication;

async function bootstrap() {

  app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });
  const configService = app.get(ConfigService<ConfigurationsInterface>);
  app.useLogger(app.get(Log4jsService));
  if (configService.get<string>('ENVIRONMENT')?.toUpperCase() === 'LOCAL') {
    const swaggerConfig = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Real State App')
      .setDescription('Services Real State App')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(configService.get('GLOBAL_PREFIX'), app, document);
  }
  app.enableCors();
  await app.listen(configService.get('PORT'));

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Transforma el payload en instancias de DTO
    whitelist: true,  // Elimina propiedades no válidas
    forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no válidas
  }));

}
bootstrap();