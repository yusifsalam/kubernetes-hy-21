import Todos from "../components/todos";

interface Todo {
  id: number;
  payload: string;
}

const ImageOfTheDayPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p>Hello, world</p>
      <img
        src="http://localhost:8081/api/randomImage"
        alt="Image of the day"
        className="rounded-lg max-w-md"
      />
      <Todos />
    </div>
  );
};

export default ImageOfTheDayPage;
