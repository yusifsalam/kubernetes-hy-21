import { Client, ClientConfig } from "pg";

const createClient = (): Client => {
  const connectionOptions: ClientConfig = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
  };
  const pgClient = new Client(connectionOptions);
  return pgClient;
};

const initDb = (client: Client) => {
  client.connect();
  client.query(`create table if not exists pings (id int4, pongs integer);`);
  client.query(
    `insert into pings(id, pongs) select 1, 0 where not exists (select 1 from pings where id = 1)`
  );
};

export { createClient, initDb };
