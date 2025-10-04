import { Link } from "react-router-dom";

export function Promotion() {
  return (
    <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 p-4 my-4 rounded-2xl">
      <div className="flex items-center justify-between gap-4">
        {/* Text Content */}
        <div className="flex-1">
          <h4 className="text-lg md:text-xl font-bold text-gray-900">
            Find Your Perfect Tech Match
          </h4>
          <p className="text-lg text-gray-700">
            Cutting-Edge Devices, Customized to Your Needs
          </p>
        </div>

        {/* SVG Icon */}
        <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Phone */}
            <g>
              <rect
                x="15"
                y="20"
                width="20"
                height="35"
                rx="2"
                fill="#8b5cf6"
                stroke="#7c3aed"
                strokeWidth="1.5"
              />
              <rect
                x="17"
                y="24"
                width="16"
                height="27"
                fill="#ffffff"
                opacity="0.3"
              />
              <circle cx="25" cy="53" r="1" fill="#ffffff" />
            </g>

            {/* Laptop */}
            <g>
              <rect
                x="42"
                y="30"
                width="30"
                height="20"
                rx="1"
                fill="#6366f1"
                stroke="#4f46e5"
                strokeWidth="1.5"
              />
              <rect
                x="45"
                y="33"
                width="24"
                height="14"
                fill="#ffffff"
                opacity="0.3"
              />
              <path d="M 38 50 L 76 50 L 78 54 L 36 54 Z" fill="#4f46e5" />
            </g>

            {/* Smartwatch */}
            <g>
              <rect
                x="78"
                y="35"
                width="12"
                height="15"
                rx="2"
                fill="#ec4899"
                stroke="#db2777"
                strokeWidth="1.5"
              />
              <rect
                x="80"
                y="37"
                width="8"
                height="11"
                fill="#ffffff"
                opacity="0.3"
              />
              <rect x="82" y="32" width="4" height="3" fill="#db2777" />
              <rect x="82" y="50" width="4" height="3" fill="#db2777" />
            </g>

            {/* Sparkle effects */}
            <circle cx="12" cy="15" r="2" fill="#fbbf24" opacity="0.7" />
            <circle cx="90" cy="65" r="2.5" fill="#34d399" opacity="0.7" />
            <path
              d="M 70 18 L 71 20 L 73 21 L 71 22 L 70 24 L 69 22 L 67 21 L 69 20 Z"
              fill="#a78bfa"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function PromotionalBanner() {
  return (
    <div className="p-4 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 rounded-2xl mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 flex-col md:flex-row">
        {/* Text Content */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg text-gray-700">
            Contact our tech experts for personalized recommendations and
            exclusive deals. We're here to help you find the perfect device.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300">
            <Link to={"/support"}>Contact Us</Link>
          </button>
        </div>

        {/* SVG Illustration */}
        <div className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Laptop */}
            <g transform="translate(30, 60)">
              <rect
                x="0"
                y="0"
                width="80"
                height="50"
                rx="2"
                fill="#6366f1"
                stroke="#4f46e5"
                strokeWidth="2"
              />
              <rect
                x="5"
                y="5"
                width="70"
                height="35"
                fill="#93c5fd"
                opacity="0.5"
              />
              <path d="M -5 50 L 85 50 L 90 60 L -10 60 Z" fill="#4f46e5" />
              <circle cx="40" cy="55" r="2" fill="#cbd5e1" />
            </g>

            {/* Smartphone */}
            <g transform="translate(120, 50)">
              <rect
                x="0"
                y="0"
                width="35"
                height="60"
                rx="4"
                fill="#8b5cf6"
                stroke="#7c3aed"
                strokeWidth="2"
              />
              <rect
                x="3"
                y="8"
                width="29"
                height="44"
                fill="#c4b5fd"
                opacity="0.5"
              />
              <circle cx="17.5" cy="55" r="2" fill="#ddd6fe" />
            </g>

            {/* Smartwatch */}
            <g transform="translate(130, 125)">
              <rect
                x="0"
                y="8"
                width="25"
                height="30"
                rx="3"
                fill="#ec4899"
                stroke="#db2777"
                strokeWidth="2"
              />
              <rect
                x="3"
                y="11"
                width="19"
                height="24"
                fill="#fbcfe8"
                opacity="0.5"
              />
              <rect x="8" y="0" width="9" height="8" fill="#db2777" />
              <rect x="8" y="38" width="9" height="8" fill="#db2777" />
            </g>

            {/* Decorative elements */}
            <circle cx="170" cy="30" r="8" fill="#fbbf24" opacity="0.6" />
            <circle cx="25" cy="140" r="6" fill="#34d399" opacity="0.6" />
            <circle cx="180" cy="160" r="10" fill="#a78bfa" opacity="0.4" />

            {/* Tech icons/symbols */}
            <path
              d="M 15 25 L 20 30 L 15 35"
              stroke="#6366f1"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 185 100 L 190 105 L 185 110"
              stroke="#ec4899"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
