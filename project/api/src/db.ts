import { ClientConfig, PoolClient } from "pg";

const config: ClientConfig = {
  user: process.env.POSTGRES_USER || "pg_test",
  password: process.env.POSTGRES_PASSWORD || "pg_test",
  database: process.env.POSTGRES_DB || "test_db",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
};

const initDb = async (client: PoolClient) => {
  try {
    await client.query(
      `create table if not exists todos(id serial primary key, name text not null check (char_length(name) < 140));`
    );
    const dbAlreadyInitiated = await client
      .query("select * from todos where id = 2;")
      .then((res) => res.rows[0] !== undefined);
    if (!dbAlreadyInitiated) {
      // db data has not been seeded yet, so we do it here
      await client.query(
        `insert into todos(id, name) values (1, 'first todo') on conflict do nothing;`
      );
      await client.query(
        `insert into todos(id, name) values (2, 'second todo') on conflict do nothing;`
      );
      // manual inserts don't update the sequence, so we need to also alter it manually
      await client.query(`alter sequence todos_id_seq restart with 3;`);
    }
  } catch (err) {
    console.log("something went wrong, stack:\n", err);
  }
};

export { config, initDb };
