import { Client, ClientConfig } from "pg";

const createClient = (): Client => {
  const connectionOptions: ClientConfig = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    connectionTimeoutMillis: 60000,
  };
  const pgClient = new Client(connectionOptions);
  return pgClient;
};

export { createClient };
