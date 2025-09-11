const ApiDown = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#f093fb] to-[#f5576c] bg-clip-text text-transparent">
          Service Unavailable
        </h1>
        <p className="mt-4 text-lg text-gray-200">
          Our service is temporarily down. Please try again later.
        </p>
        <button
          className="mt-6 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#f093fb] to-[#f5576c] hover:opacity-90 transition"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ApiDown;
