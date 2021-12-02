import fastify, { FastifyInstance } from "fastify";
import { getHash } from "./utils/getFile";
const fetch = require("node-fetch");

const server: FastifyInstance = fastify({ logger: true });

server.get("/", async (_req, res) => {
  const hash = getHash();
  const pongsResponse: Response = await fetch(
    "http://ping-pong-svc:2345/pingpong"
  );
  const body = await pongsResponse.text();
  const msg = process.env.MESSAGE || "No message env!";
  const returnStr = msg.concat("\n", hash, "\n", "Ping / Pongs: ", body);
  res.send(returnStr);
});

server.get("/healthz", async (_req, res) => {
  const pingpongReachable = await fetch("http://ping-pong-svc:2345/healthz");
  const resJson = await pingpongReachable.json();
  res.send({ status: resJson });
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
