import fastify, { FastifyError, FastifyInstance } from "fastify";
import autoload from "fastify-autoload";
import { fastifyPostgres } from "fastify-postgres";
import fastifyStatic, { FastifyStaticOptions } from "fastify-static";
import path from "path";
import { initDb, config } from "./db";

const server: FastifyInstance = fastify({
  logger: {
    level: "info",
    serializers: {
      req(request) {
        return {
          method: request.method,
          url: request.url,
          headers: request.headers,
          hostname: request.hostname,
          remoteAddress: request.ip,
          remotePort: request.socket.remotePort,
        };
      },
    },
    prettyPrint: true,
  },
  pluginTimeout: 20000,
});

const connectionString = `postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;

server.register(fastifyPostgres, {
  connectionString,
});

const fastifyStaticOptions: FastifyStaticOptions = {
  root: path.join(process.cwd(), "public"),
  prefix: "/public/",
};

server.register(fastifyStatic, fastifyStaticOptions);
server.register(autoload, {
  dir: path.join(__dirname, "routes"),
});

const start = async () => {
  try {
    await server.listen(4000, "0.0.0.0");

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    const pgClient = await server.pg.connect();
    await initDb(pgClient);
    console.log(`Server started on port ${port}`);
  } catch (err) {
    server.log.error(err);
    const error = err as FastifyError;
    console.log("error", error);
    if (error.code !== "ECONNREFUSED" && error.code !== "ENOTFOUND") {
      await server.pg.Client.end();
      process.exit(1);
    }
  }
};

start();
