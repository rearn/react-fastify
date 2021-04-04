/**
 * @file サーバ起動スクリプト
 */
import pino from 'pino';
import { logger } from '@backend/module/logger';
import dbConnection from '@backend/module/dbConnection';
import app from './app';

const rootLogger = logger.child({ module: 'root' });

process.on('uncaughtException', pino.final(rootLogger, (err, finalLogger) => {
  finalLogger.error(err, 'uncaughtException')
  process.exit(1)
}));

process.on('unhandledRejection', (reason, p) => {
  rootLogger.error(`Unhandled Rejection at: ${p}`);
  rootLogger.error(`reason: ${reason}`);
});

process.on('exit', () => rootLogger.info('app stop'));

(async () => {
  rootLogger.info('app start');
  const port = 3000;
  app.listen(port, '0.0.0.0');

  const handle: NodeJS.SignalsListener = (code) => {
    rootLogger.info(`receive ${code}`);
    app.close(async () => {
      rootLogger.info('Server terminated');
      await dbConnection.close;
    });
  };

  process.on('SIGINT', handle);
  process.on('SIGTERM', handle);
})();
