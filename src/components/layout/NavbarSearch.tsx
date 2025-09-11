import { useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

function NavbarSearch() {
  // State to toggle popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // State to control overlay height state: full or minimized
  const [overlayMinimized, setOverlayMinimized] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);

  // Open search popup and full overlay
  const openPopup = () => {
    setIsPopupOpen(true);
    setOverlayMinimized(false);
    setTimeout(() => searchRef.current?.focus(), 0);
  };

  // Close popup and minimize overlay
  const closePopup = () => {
    setIsPopupOpen(false);
    setOverlayMinimized(true);
    setSearchQuery("");
  };

  // Handle overlay click: close the popup and minimize the overlay
  const onOverlayClick = () => {
    if (isPopupOpen) {
      closePopup();
    }
  };

  return (
    <>
      {/* Navbar icon */}
      <div className="navbar">
        <FaSearch
          className="cursor-pointer text-slate-700 w-6 h-6"
          onClick={openPopup}
        />
      </div>

      {/* Overlay */}
      {(isPopupOpen || overlayMinimized) && (
        <div
          className={`fixed left-0 right-0 bg-black bg-opacity-50 transition-all duration-300 z-50 ${
            isPopupOpen ? "top-0 bottom-0" : "top-0 h-[100px]"
          }`}
          onClick={onOverlayClick}
        />
      )}

      {/* Popup search */}
      {isPopupOpen && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-60 bg-white p-4 rounded shadow-lg max-w-lg w-full">
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3 text-slate-400 h-4 w-4" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-full border border-slate-300 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute right-3 p-1 rounded-full hover:bg-slate-200"
                onClick={closePopup}
              >
                <FaTimes className="h-3 w-3 text-slate-600" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default NavbarSearch;
