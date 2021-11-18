import fastify, { FastifyInstance } from "fastify";
import { getHash } from "./utils/getHash";

const server = fastify({ logger: true });

server.get("/", async (_req, res) => {
  const hash = getHash();
  console.log(hash);
  res.send(hash);
});

const start = async () => {
  try {
    await server.listen(3000, "0.0.0.0");

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Server started on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
