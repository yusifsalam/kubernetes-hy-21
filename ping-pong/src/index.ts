import fastify, { FastifyInstance } from "fastify";

const server: FastifyInstance = fastify({ logger: true });

let pongs: number = 0;

server.get("/pingpong", async (_req, res) => {
  res.send(`pong ${++pongs}`);
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
