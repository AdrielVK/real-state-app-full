import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { Log4jsInterceptor, Log4jsModule } from 'src/shared/log4js';
import { AllExceptionsFilter } from './config';
import { loggerFactory } from './config/factories';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthController } from './auth/auth.controller';
import { PostModule } from './post/post.module';
import { PostController } from './post/post.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    Log4jsModule.forRootAsync({
      useFactory: loggerFactory,
      inject: [ConfigService],
    }),
    AuthModule,
    CloudinaryModule,
    PostModule
  ],
  controllers: [
    AuthController,
    PostController
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: Log4jsInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    
  ],
})
export class AppModule {}
