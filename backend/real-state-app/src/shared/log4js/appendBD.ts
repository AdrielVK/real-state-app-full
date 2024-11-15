//import { LogRepository } from '@prisma';
import { LoggingEventInterface } from 'src/interfaces';
import { app } from 'src/main';

class AppendBD {
  private async insetLog(loggingEvent: LoggingEventInterface) {
    /* const logRepository = app.get(LogRepository);
    const log = this.normalizeLog(loggingEvent.data);
    const url = log?.url || '';
    const method = log?.method || '';
    const code = log?.code || null;
    delete log.url;
    delete log.method;
    delete log.code;

    await logRepository.db.create({
      data: {
        startTime: loggingEvent.startTime,
        categoryName: loggingEvent.categoryName,
        data: JSON.stringify(log),
        url,
        method,
        code,
        error: loggingEvent?.error || '',
        level: loggingEvent.level.levelStr,
      },
    }); */
  }

  public stdoutAppender(layout, timezoneOffset) {
    // This is the appender function itself
    return (loggingEvent) => {
      this.insetLog(loggingEvent);
    };
  }

  private normalizeLog(logs: string[]) {
    const logsParse = this.parseToJson(logs);
    const log = logsParse.length > 0 ? logsParse[0] : [];
    if (log.responseBody) log.responseBody = JSON.parse(log.responseBody);
    return log;
  }

  private parseToJson(logs: string[]) {
    return logs.map((log) => {
      try {
        return JSON.parse(log);
      } catch (error) {
        return log;
      }
    });
  }
}

// stdout configure doesn't need to use findAppender, or levels
function configure(config, layouts) {
  // the default layout for the appender
  let layout = layouts.colouredLayout;
  // check if there is another layout specified
  if (config.layout) {
    // load the layout
    layout = layouts.layout(config.layout.type, config.layout);
  }
  //create a new appender instance
  return new AppendBD().stdoutAppender(layout, config.timezoneOffset);
}
//export the only function needed
exports.configure = configure;