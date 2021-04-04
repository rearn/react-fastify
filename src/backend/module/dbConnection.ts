import { createConnection, getConnectionOptions, Connection } from 'typeorm';
import { logger, TypeOrmPinoLogger } from '@backend/module/logger';
import runMode from '@backend/module/runMode';

const connections: { connection: Connection, mode: string }[] = [];

export default new Proxy(<{[key: string]: Promise<Connection>}>{}, {
  get: async (target, mode: string): Promise<Connection> => {
    if (mode === 'close') {
      await Promise.all(
        connections.map((v) => v.connection.close().then(() => logger.info(`disconnection DB (${v.mode})`))),
      );
      return <Connection>{};
    }
    const t = connections.find((v) => v.mode === mode);
    if (t === undefined) {
      const v = await getConnectionOptions(`${runMode}_${mode}`);
      const connection = await createConnection(
        Object.assign(v, { logger: new TypeOrmPinoLogger(true) }),
      );
      connections.push({ connection, mode });
      logger.info(`Connection DB (${mode})`);
      return connection;
    }
    return t.connection;
  },
  set: () => {
    throw new Error('Do not call');
  },
});
