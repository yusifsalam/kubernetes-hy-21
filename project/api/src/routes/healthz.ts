import { FastifyPluginAsync } from "fastify";

const healthzRoute: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/healthz", async (_req, res) => {
    const client = await fastify.pg.connect();
    if (!client) {
      console.log("client could not be reached");
      res.code(500).send("failed to connect to database");
    } else {
      client.release();
      res.send({ status: "ok", listenerCount: client.listenerCount });
    }
  });
};

export default healthzRoute;
