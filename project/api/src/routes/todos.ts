import { FastifyPluginAsync } from "fastify";

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
    res.send(newTodo);
  });
};

export default todoController;
