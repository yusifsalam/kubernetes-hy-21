import Head from "next/head";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Next Kube Todo!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          There is nothing here, go
          <a className="text-blue-600 ml-2" href="/image">
            here
          </a>
        </h1>
      </main>
    </div>
  );
};

export default HomePage;
