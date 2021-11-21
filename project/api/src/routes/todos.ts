import { FastifyPluginAsync } from "fastify";

let todos = [
  {
    id: 1,
    payload: "TODO 1",
  },
  {
    id: 2,
    payload: "TODO 2",
  },
];

const todoController: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/api/todos", async (_req, res) => {
    res.send(todos);
  });

  fastify.post("/api/todos", async (req, res) => {
    console.log("req body", req.body);
    const newTodo = {
      id: todos[todos.length - 1].id + 1,
      payload: req.body as string,
    };
    todos.push(newTodo);
    res.send(newTodo);
  });
};

export default todoController;
