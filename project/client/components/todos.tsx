import { useEffect, useState } from "react";

interface Todo {
  id: number;
  payload: string;
}

const Todos = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [newTodo, setNewTodo] = useState<null | string>(null);

  useEffect(() => {
    const getToDos = async () => {
      const data = await fetch(`http://localhost:8081/api/todos`);
      setTodos(await data.json());
    };
    getToDos();
  }, [setTodos]);

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const todo = await fetch(`http://localhost:8081/api/todos`, {
      method: "post",
      body: newTodo,
    });
    setTodos([...todos, await todo.json()]);
    setNewTodo(null);
  };

  const handleChange = (e: any) => {
    setNewTodo(e.target.value);
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
          {todos.map((todo) => (
            <li key={todo.id}>{todo.payload}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todos;