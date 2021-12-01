import { FastifyPluginAsync } from "fastify";

const rootRoute: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/api", async (_req, res) => {
    res.sendFile("hello.html");
  });

  fastify.get("/", async (_req, res) => {
    res.send({ status: "ok" });
  });
};

export default rootRoute;
