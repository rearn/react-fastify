import path from 'path';
import fastify, { FastifyInstance } from 'fastify';
import fastifyStatic from 'fastify-static';
import { logger } from '@backend/module/logger';
import api2005 from '@backend/router/api2005';

const app: FastifyInstance = fastify({
  logger: logger.child({ module: 'fastify' }),
})

app.register(fastifyStatic, {
  root: path.join(__dirname, 'frontend'),
  prefix: '/', // optional: default '/'
})
app.register(api2005, { prefix: '/api2005' });

export default app;
