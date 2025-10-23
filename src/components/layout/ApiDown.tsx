const ApiDown = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl  text-center">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-600">
          Service Unavailable
        </h3>
        <p className="mt-4 text-lg sm:text-xl text-slate-500">
          Our service is temporarily down. Please try again later.
        </p>
        <button
          className="mt-6 px-6 py-3 rounded-xl font-semibold underline cursor-pointer"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ApiDown;
