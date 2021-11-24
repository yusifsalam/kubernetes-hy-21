import fastify, { FastifyInstance } from "fastify";
import { createClient, initDb } from "./db";

const server: FastifyInstance = fastify({});
const pgClient = createClient();

let pongs: number = 0;

server.get("/pingpong", async (_req, res) => {
  pgClient.query(`update pings set pongs = ${++pongs} where id = 1;`);
  res.send(`pong ${pongs}`);
});

const start = async () => {
  try {
    initDb(pgClient);
    const pings = await pgClient.query("select pongs from pings where id = 1");
    pongs = Number(pings.rows[0].pongs);
    await server.listen(3000, "0.0.0.0");

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Server started on port ${port}`);
  } catch (err) {
    server.log.error(err);
    await pgClient.end();
    process.exit(1);
  }
};

start();
