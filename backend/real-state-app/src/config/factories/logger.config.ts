import { ConfigService } from '@nestjs/config';
import { ConfigurationsInterface } from 'src/interfaces';

export const loggerFactory = async (
  configService: ConfigService<ConfigurationsInterface>,
) => ({
  appenders: {
    custom: { type: '/shared/log4js/appendBD' },
    console: { type: 'stdout' },
    logstash: {
      type: '@log4js-node/logstashudp',
      host: configService.get('HOST_LOGSTASH'),
      port: 4560,
      extraDataProvider: () => ({
        appName: 'api-onboarding-cl',
      }),
    },
  },
  categories: {
    default: { appenders: ['logstash', 'console', 'custom'], level: 'info' }, 
  },
});
