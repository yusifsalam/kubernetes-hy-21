import fastify, { FastifyInstance } from "fastify";
import { getHash } from "./utils/getFile";
const fetch = require("node-fetch");

const server: FastifyInstance = fastify({ logger: true });

server.get("/", async (_req, res) => {
  const hash = getHash();
  // const pongs = getPongs();
  const pongsResponse: Response = await fetch(
    "http://ping-pong-svc:2345/pingpong"
  );
  const body = await pongsResponse.text();
  console.log("pongs in http", body);
  res.send(hash.concat("\n", "Ping / Pongs: ", body));
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
