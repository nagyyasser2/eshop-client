import React from "react";

type NoProductsFoundProps = {
  searchQuery?: string;
};

const NoProductsFound: React.FC<NoProductsFoundProps> = ({ searchQuery }) => {
  return (
    <div className="flex flex-col items-center justify-center mb-8 pb-20">
      {/* Empty Box SVG Illustration */}
      <div className="mb-6">
        <svg
          className="w-48 h-48 text-gray-300"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Box */}
          <path
            d="M40 70L100 40L160 70V130L100 160L40 130V70Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M40 70L100 100L160 70"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M100 100V160"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Magnifying Glass */}
          <circle
            cx="145"
            cy="145"
            r="18"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M158 158L170 170"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Question Mark inside box */}
          <text
            x="100"
            y="95"
            fontSize="40"
            fill="currentColor"
            textAnchor="middle"
            fontWeight="bold"
            opacity="0.3"
          >
            ?
          </text>
        </svg>
      </div>

      {/* Message */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        No Products Found
      </h3>

      <p className="text-gray-500 text-center max-w-md mb-4">
        We couldn't find any products matching your criteria.
      </p>

      {searchQuery && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md">
          <p className="text-sm text-blue-800 font-medium mb-2">
            💡 Try these suggestions:
          </p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Check your spelling or try different keywords</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Adjust or clear your filters</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Browse all categories to discover products</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NoProductsFound;
