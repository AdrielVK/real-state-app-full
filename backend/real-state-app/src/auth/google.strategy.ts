import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from './auth.service';
import { Inject, Injectable } from '@nestjs/common';
import googleOauthConfig from './google.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(
        @Inject(googleOauthConfig.KEY)
        private googleConfiguration: ConfigType<typeof googleOauthConfig>,
        private readonly authService: AuthService,
    ){
        super({
            clientID: googleConfiguration.clientID,
            clientSecret: googleConfiguration.clientSecret,
            scope: ['email', 'profile'],
            callbackURL: 'http://localhost:3002/auth/google/callback',
            
        })
    }

    async validate(accessToken:string,refreshToken: string,profile:any, done:VerifyCallback): Promise<any>{
        console.log(profile)
        console.log('**************************')
        /*const user = await this.authService.validateGoogleUser( {
            email: profile.emails[0].value,
            name: profile.name.givenName,
            lastname: profile.name.familyName,
            phoneNumber: '',
            password: ''
        })*/

        const user = {
            email: profile.emails[0].value,
            name: profile.name.givenName,
            lastname: profile.name.familyName,
            profilePic: profile.photos[0].value
        }
        
        done(null, user)

    };
}