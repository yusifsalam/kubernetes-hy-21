import fastify, { FastifyInstance } from "fastify";
import { Client } from "pg";
import { createClient } from "./db";

const server: FastifyInstance = fastify({});
let pgClient: Client;

let pongs: number = 0;
let dbSuccess = false;
let dbConnectAttemps = 0;

const PORT = Number(process.env.MY_PORT) || 8080;

server.get("/pingpong", async (_req, res) => {
  pgClient.query(`update pings set pongs = ${++pongs} where id = 1;`);
  res.send(`pong ${pongs}`);
});

server.get("/healthz", async (_req, res) => {
  if (!dbSuccess) {
    res.code(500).send();
  } else {
    const test = await pgClient.query("select count(id) from pings");
    res.send({ status: test.rows });
  }
});

const connectToDb = async () => {
  pgClient = createClient();

  pgClient.connect(async (err) => {
    if (err) {
      console.error(err);
      if (dbConnectAttemps < 50) {
        // 50 connection attempts allowed
        await pgClient.end();
        console.log(
          `failed to connect to the database, attempting again.\n Attempts so far: ${++dbConnectAttemps}`
        );
        setTimeout(async () => await connectToDb(), 10000); // try again in 10 seconds
      } else return;
    } else {
      await pgClient.query(
        `create table if not exists pings (id int4, pongs integer);`
      );
      await pgClient.query(
        `insert into pings(id, pongs) select 1, 0 where not exists (select 1 from pings where id = 1)`
      );
      const pings = await pgClient.query(
        "select pongs from pings where id = 1"
      );
      pongs = Number(pings.rows[0].pongs);
      dbSuccess = true;
      return;
    }
  });
};

const start = async () => {
  try {
    await connectToDb();
    await server.listen(PORT, "0.0.0.0");
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
