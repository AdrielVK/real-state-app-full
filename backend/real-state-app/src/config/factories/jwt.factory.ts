import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigurationsInterface } from 'src/interfaces';

export const jwtFactory = async (
  config: ConfigService<ConfigurationsInterface>,
): Promise<JwtModuleOptions> => {
  return {
    publicKey: JSON.parse(config.get('JWT_SECRET')).public_key,
    privateKey: JSON.parse(config.get('JWT_SECRET')).private_key,
    signOptions: {
      expiresIn: config.get('JWT_EXPIRES_IN'),
      algorithm: 'ES384',
    },
    verifyOptions: { algorithms: ['ES384'] },
  };
};
