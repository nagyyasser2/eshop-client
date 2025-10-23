import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function OrderNotRegistered() {
  return (
    <div className=" py-10 sm:py-12 ">
      <div className="container text-center mx-auto px-4 max-w-md sm:max-w-2xl">
        <div className="rounded-2xl p-4 sm:p-6 mb-5 sm:mb-6">
          <p className="text-sm sm:text-base md:text-lg text-slate-500 font-medium">
            Please log in to view your orders!
          </p>
        </div>
        <Link
          to="/login"
          className="inline-flex items-center gap-2  text-slate-500 px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-semibold text-sm sm:text-base "
        >
          <FaUser className="text-sm sm:text-base" />
          Log In
        </Link>
      </div>
    </div>
  );
}
