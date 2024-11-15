
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from '../database/prisma/user.repository';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthDto } from './auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JSON.parse(configService.get<string>('JWT_SECRET')).public_key,
      algorithms: ['ES384'],
    });
  }

  async validate(payload: GoogleAuthDto) {
    const primitiveUser = {email: payload.email, name: payload.name, lastname: payload.lastname}
    const user = await this.userRepository.findByEmail(payload.email); // Asume que `sub` es el userId
    if (!user) {
      const allFieldsValid = Object.values(primitiveUser).every(value => value !== null && value !== undefined);
      if(allFieldsValid) {
        const res = {email: primitiveUser.email, name: primitiveUser.name, lastname: primitiveUser.lastname, profilePic: payload.profilePic}
        return res
      }
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}