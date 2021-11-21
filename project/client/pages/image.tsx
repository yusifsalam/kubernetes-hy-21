const ImageOfTheDayPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p>Hello, world</p>
      <img
        src="http://localhost:8081/api/randomImage"
        alt="Image of the day"
        className="rounded-lg max-w-md"
      />
      <div className="mt-2 flex rounded-md shadow-sm">
        <input
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-4 sm:text-sm border-gray-300"
          type="text"
          placeholder="New Todo"
          maxLength={140}
        />
        <button
          type="button"
          className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          Create todo
        </button>
      </div>
      <div>
        <ul className="list-disc">
          <li>TODO 1</li>
          <li>TODO 2</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageOfTheDayPage;
