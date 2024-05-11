import Link from "next/link";

const DefaultError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <section
      className="bg-gradient-to-b from-gray-100 to-white"
      data-aos="zoom-y-out"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
              {/* <h1 className="text-9xl font-black text-gray-200">{error.name}</h1> */}

              <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Uh-oh!
              </p>

              <p className="mt-4 text-gray-500">
                Something went wrong!
              </p>
            <div className="flex-row space-x-4">
            <Link
                href="/"
                className="mt-6 inline-block rounded bg-blue-700 px-5 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring"
              >
                Go Back Home
              </Link>
              <Link
                href="/"
                className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                Try again
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefaultError;
