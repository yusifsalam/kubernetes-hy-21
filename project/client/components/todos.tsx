import { useEffect, useState } from "react";

interface Todo {
  id: number;
  name: string;
  done: boolean;
}

const Todos = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [newTodo, setNewTodo] = useState<null | string>(null);

  useEffect(() => {
    const getToDos = async () => {
      const data = await fetch(`/api/todos`);
      setTodos(await data.json());
    };
    getToDos();
  }, [setTodos]);

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const todo = await fetch(`/api/todos`, {
      method: "post",
      body: newTodo,
    });
    const todoJson = (await todo.json()).rows[0];
    setTodos([...todos, todoJson]);
    setNewTodo(null);
  };

  const handleChange = (e: any) => {
    setNewTodo(e.target.value);
  };

  const handleUpdate = async (id: number) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "put",
    });
    if (res.ok) {
      const index = todos.findIndex((todo) => todo.id === id);
      const todoCopy = [...todos];
      todoCopy[index].done = !todoCopy[index].done;
      setTodos(todoCopy);
    } else {
      console.error("update failed");
    }
  };

  if (!todos) return <div>No todos!</div>;
  return (
    <>
      <form onSubmit={handleAdd}>
        <div className="mt-2 flex rounded-md shadow-sm">
          <input
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-4 sm:text-sm border-gray-300"
            type="text"
            placeholder="New Todo"
            maxLength={140}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            Create todo
          </button>
        </div>
      </form>
      <div>
        <ul className="list-disc">
          {todos
            .sort((a, b) => a.id - b.id)
            .map((todo) => (
              <li
                className="hover:text-blue-400"
                key={todo.id}
                onClick={async () => await handleUpdate(todo.id)}
              >
                {todo.name} {todo.done && "???"}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Todos;
