/**
 * @file logger の設定
 */
import pino from 'pino';
import { FileLogger, Logger } from 'typeorm';

/**
 * logger 取得
 */
export const logger = pino({
  level: 'http',
  customLevels: { http: 29 },
  timestamp: pino.stdTimeFunctions.isoTime,
}).child({ file: __filename });

/**
 * DB の logger を設定する
 */
export class TypeOrmPinoLogger extends FileLogger implements Logger {
  protected logger: pino.Logger;

  constructor(options?: boolean | 'all' | ('error' | 'log' | 'info' | 'warn' | 'query' | 'schema' | 'migration')[] | undefined) {
    super(options);
    this.logger = logger.child({ module: 'typeorm' });
  }

  protected write(strings: string | string[]): void {
    const log = strings instanceof Array ? JSON.stringify(strings) : strings;
    this.logger.info(log);
  }
}
