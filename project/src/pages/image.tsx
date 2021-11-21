const ImageOfTheDayPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p>Hello, world</p>
      <img
        src="/randomImage"
        alt="Image of the day"
        className="rounded-lg max-w-md"
      />
    </div>
  );
};

export default ImageOfTheDayPage;
