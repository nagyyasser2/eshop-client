import { Link } from "react-router-dom";

export function Promotion() {
  return (
    <div className="backdrop-blur bg-white/100 p-3 my-4 rounded-xl text-slate-600 mx-auto">
      <div className="flex items-center justify-between gap-4">
        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <p className="text-base sm:text-lg font-semibold truncate">
            Find Your Perfect Bag Match
          </p>
          <p className="text-xs sm:text-sm truncate">
            Stylish Designs, Crafted for Every Occasion
          </p>
        </div>

        {/* SVG Icon - Bags Collection */}
        <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Tote Bag - Left */}
            <g>
              <path
                d="M 10 30 L 15 20 L 25 20 L 30 30 L 30 50 Q 30 55 25 55 L 15 55 Q 10 55 10 50 Z"
                fill="#8b5cf6"
                stroke="#7c3aed"
                strokeWidth="1.5"
              />
              <path d="M 15 20 L 15 15" stroke="#7c3aed" strokeWidth="1.5" />
              <path d="M 25 20 L 25 15" stroke="#7c3aed" strokeWidth="1.5" />
              <rect
                x="13"
                y="32"
                width="12"
                height="15"
                fill="#ffffff"
                opacity="0.3"
              />
            </g>

            {/* Crossbody Bag - Center */}
            <g>
              <ellipse
                cx="50"
                cy="40"
                rx="12"
                ry="15"
                fill="#6366f1"
                stroke="#4f46e5"
                strokeWidth="1.5"
              />
              <path
                d="M 40 25 Q 50 20 60 25"
                stroke="#4f46e5"
                strokeWidth="1.5"
                fill="none"
              />
              <rect
                x="43"
                y="32"
                width="14"
                height="12"
                fill="#ffffff"
                opacity="0.3"
                rx="2"
              />
              <circle cx="50" cy="45" r="1.5" fill="#ffffff" opacity="0.6" />
            </g>

            {/* Backpack - Right */}
            <g>
              <rect
                x="68"
                y="25"
                width="18"
                height="28"
                rx="2"
                fill="#ec4899"
                stroke="#db2777"
                strokeWidth="1.5"
              />
              <path d="M 72 25 L 72 18" stroke="#db2777" strokeWidth="1.2" />
              <path d="M 82 25 L 82 18" stroke="#db2777" strokeWidth="1.2" />
              <rect x="72" y="17" width="10" height="2" fill="#db2777" />
              <rect
                x="71"
                y="33"
                width="14"
                height="8"
                fill="#ffffff"
                opacity="0.3"
                rx="1"
              />
              <circle cx="75" cy="30" r="1" fill="#ffffff" opacity="0.6" />
              <circle cx="85" cy="30" r="1" fill="#ffffff" opacity="0.6" />
            </g>

            {/* Sparkle effects */}
            <circle cx="8" cy="12" r="2" fill="#fbbf24" opacity="0.7" />
            <circle cx="92" cy="58" r="2.5" fill="#34d399" opacity="0.7" />
            <path
              d="M 60 12 L 61 14 L 63 15 L 61 16 L 60 18 L 59 16 L 57 15 L 59 14 Z"
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
    <div className="p-3 px-8 bg-gradient-to-r from-pink-100 via-pink-100 to-purple-100 rounded-xl shadow-lg mb-6 mx-auto">
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

          <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg mt-3">
            <Link to={"/support"}>Contact Us</Link>
          </button>
        </div>

        {/* SVG Illustration - Bags Collection Scene */}
        <div className="flex-shrink-0 w-48 h-48 md:w-60 md:h-60">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Large Tote Bag - Left */}
            <g transform="translate(20, 70)">
              <path
                d="M 0 20 L 8 5 L 32 5 L 40 20 L 40 55 Q 40 62 32 62 L 8 62 Q 0 62 0 55 Z"
                fill="#8b5cf6"
                stroke="#7c3aed"
                strokeWidth="2"
              />
              <path d="M 8 5 L 8 0" stroke="#7c3aed" strokeWidth="2" />
              <path d="M 32 5 L 32 0" stroke="#7c3aed" strokeWidth="2" />
              <rect
                x="5"
                y="25"
                width="30"
                height="20"
                fill="#c4b5fd"
                opacity="0.4"
                rx="2"
              />
            </g>

            {/* Medium Crossbody Bag - Center Top */}
            <g transform="translate(95, 45)">
              <ellipse
                cx="15"
                cy="20"
                rx="14"
                ry="18"
                fill="#6366f1"
                stroke="#4f46e5"
                strokeWidth="2"
              />
              <path
                d="M 0 10 Q 15 0 30 10"
                stroke="#4f46e5"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <rect
                x="6"
                y="15"
                width="18"
                height="14"
                fill="#c4b5fd"
                opacity="0.4"
                rx="2"
              />
              <circle cx="15" cy="32" r="2" fill="#ffffff" opacity="0.7" />
            </g>

            {/* Backpack - Right */}
            <g transform="translate(135, 55)">
              <rect
                x="0"
                y="0"
                width="25"
                height="38"
                rx="3"
                fill="#ec4899"
                stroke="#db2777"
                strokeWidth="2"
              />
              <path d="M 6 0 L 6 -8" stroke="#db2777" strokeWidth="2" />
              <path d="M 19 0 L 19 -8" stroke="#db2777" strokeWidth="2" />
              <rect x="3" y="-8" width="19" height="4" fill="#db2777" rx="2" />
              <rect
                x="3"
                y="12"
                width="19"
                height="12"
                fill="#fbcfe8"
                opacity="0.4"
                rx="2"
              />
              <circle cx="8" cy="8" r="1.5" fill="#db2777" opacity="0.8" />
              <circle cx="17" cy="8" r="1.5" fill="#db2777" opacity="0.8" />
            </g>

            {/* Small Clutch - Bottom Left */}
            <g transform="translate(15, 140)">
              <rect
                x="0"
                y="0"
                width="28"
                height="18"
                rx="2"
                fill="#a78bfa"
                stroke="#9333ea"
                strokeWidth="1.5"
              />
              <path
                d="M 4 0 L 6 -4 L 22 -4 L 24 0"
                stroke="#9333ea"
                strokeWidth="1.5"
                fill="none"
              />
              <rect
                x="3"
                y="5"
                width="22"
                height="8"
                fill="#e9d5ff"
                opacity="0.4"
                rx="1"
              />
            </g>

            {/* Decorative elements - Fashion icons */}
            <circle cx="160" cy="20" r="10" fill="#fbbf24" opacity="0.6" />
            <circle cx="25" cy="25" r="8" fill="#34d399" opacity="0.6" />
            <circle cx="170" cy="160" r="12" fill="#a78bfa" opacity="0.4" />

            {/* Decorative symbols */}
            <path
              d="M 35 100 L 40 105 L 35 110"
              stroke="#8b5cf6"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 155 130 L 160 135 L 155 140"
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
