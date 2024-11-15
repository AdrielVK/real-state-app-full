export interface LoggingEventInterface {
  startTime: Date;
  categoryName: string;
  data: string[];
  level: {
    level: number;
    levelStr: string;
    colour: string;
  };
  context: object;
  pid: number;
  error: undefined | string;
}
