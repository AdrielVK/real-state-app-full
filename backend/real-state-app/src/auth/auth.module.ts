import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule,  } from 'src/database';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtFactory } from 'src/config/factories';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { GoogleStrategy } from './google.strategy';
import googleOauthConfig from './google.config';

@Module({
    imports: [
        PrismaModule,
        ConfigModule.forFeature(googleOauthConfig),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: jwtFactory,
        }),
        
        CloudinaryModule
    ],
    providers: [AuthService, JwtStrategy, GoogleStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
