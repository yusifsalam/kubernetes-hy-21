import fastify, { FastifyInstance } from "fastify";
import autoload from "fastify-autoload";
import fastifyNextJS from "fastify-nextjs";
import fastifyStatic, { FastifyStaticOptions } from "fastify-static";
import path from "path";

const server: FastifyInstance = fastify({
  logger: {
    prettyPrint: true,
  },
  pluginTimeout: 20000,
});

server
  .register(fastifyNextJS, {
    dev: process.env.NODE_ENV !== "production",
    noServeAssets: false,
  })
  .after(() => {
    server.next("/image");
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
