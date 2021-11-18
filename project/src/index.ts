import fastify, { FastifyInstance } from "fastify";
import fastifyStatic, { FastifyStaticOptions } from "fastify-static";
import path from "path";

const server: FastifyInstance = fastify({ logger: true });

const fastifyStaticOptions: FastifyStaticOptions = {
  root: path.join(process.cwd(), "public"),
  prefix: "/public/",
};

server.register(fastifyStatic, fastifyStaticOptions);

server.get("/", async (_req, res) => {
  return res.sendFile("hello.html");
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
