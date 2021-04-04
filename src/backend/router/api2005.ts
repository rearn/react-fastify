import { FastifyPluginCallback } from 'fastify';

export default <FastifyPluginCallback>((router, opts, next) => {
  router.get('/', async (request, reply) => {
    reply.send([
      { L: 10, H: 1 },
      { L: 10, H: 0 },
      { H: 1, L: 10 },
      { H: 2, L: 3 },
    ]);
  });
  next();
});
