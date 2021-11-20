import fastify, { FastifyInstance } from "fastify";
import { getHash, getPongs } from "./utils/getFile";

const server: FastifyInstance = fastify({ logger: true });

server.get("/", (_req, res) => {
  const hash = getHash();
  const pongs = getPongs();
  res.send(hash.concat("\n", "Ping / Pongs: ", pongs));
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
