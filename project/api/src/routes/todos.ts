import { FastifyPluginAsync, FastifyRequest } from "fastify";

const todoController: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/api/todos", async (_req, res) => {
    const client = await fastify.pg.connect();
    const todosRes = await client.query("select * from todos;");
    const todos = todosRes.rows;
    console.log("todos", todos);
    client.release();
    res.send(todos);
  });

  fastify.post("/api/todos", async (req, res) => {
    const client = await fastify.pg.connect();
    const newTodo = await client.query(
      "insert into todos(name) values($1) returning *",
      [req.body]
    );
    req.log.info(`Created new Todo with text ${req.body}`);
    res.send(newTodo);
  });

  type PutRequest = FastifyRequest<{
    Params: { id: number };
  }>;

  fastify.put("/api/todos/:id", async (req: PutRequest, res) => {
    const client = await fastify.pg.connect();
    const { id } = req.params;
    const queryResult = await client.query(
      `update todos set done = not done where id = $1`,
      [id]
    );
    if (queryResult.rowCount === 0) {
      req.log.error(`Todo with id ${id} does not exist, could not toggle it`);
      res.code(500).send({ status: "failure" });
    }
    req.log.info(`Toggled Todo with id ${id} done param`);
    res.send({ status: "success" });
  });
};

export default todoController;
