import { Link } from "react-router-dom";

export function Announce() {
  return (
    <div className=" bg-slate-700">
      <div className="container mx-auto text-center px-2">
        <p className="text-white py-1 text-md sm:text-l">
          48-hour sale, Buy now and get free shipping on any items ♡
        </p>
      </div>
    </div>
  );
}

export function Promotion() {
  return (
    <div className="backdrop-blur px-0 py-2 my-4 rounded-xl text-slate-700 mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <span className="font-xs text-slate-700 px-1">
            Stylish Designs, Crafted for Every Occasion
          </span>
        </div>
      </div>
    </div>
  );
}

export function PromotionalBanner() {
  return (
    <div className="p-3 px-8 py-8 bg-slate-50 rounded-xl  mb-6 mx-auto">
      <div className="mx-auto flex items-center justify-between gap-6 flex-col md:flex-row">
        {/* Text Content */}
        <div className="flex-1 space-y-3 p-2 md:p-0 text-center md:text-left">
          <p className="text-xl md:text-2xl font-semibold text-slate-700 leading-tight">
            Can't Find the Bag You're Looking For?
          </p>
          <p className="text-sm md:text-base text-slate-500">
            Contact our style experts for personalized recommendations and
            exclusive offers. We're here to help you find the perfect bag for
            any occasion.
          </p>

          <button className="bg-slate-600 hover:bg-slate-700 text-white text-sm font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg mt-3">
            <Link to={"/support"}>Contact Us</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
