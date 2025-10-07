import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePublishedPickerProps {
  selectedDateRange: string;
  setSelectedDateRange: (value: string) => void;
}

export default function DatePublishedPicker({
  selectedDateRange,
  setSelectedDateRange,
}: DatePublishedPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Label shown on button
  const label =
    startDate && endDate
      ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      : selectedDateRange || "Any Time";

  // Update parent when range changes
  useEffect(() => {
    if (startDate && endDate) {
      setSelectedDateRange(
        `${startDate.toISOString()}|${endDate.toISOString()}`
      );
    } else if (!startDate && !endDate) {
      setSelectedDateRange("");
    }
  }, [startDate, endDate]);

  return (
    <div className="relative" ref={dateRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex items-center gap-2 min-w-[180px] justify-between"
      >
        <span className="font-medium text-gray-700">{label}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 w-72">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 w-16">Start:</span>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start date"
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 w-16">End:</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate ?? undefined}
                placeholderText="End date"
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
                setSelectedDateRange("");
                setIsOpen(false);
              }}
              className="mt-2 text-sm text-blue-600 hover:underline self-end"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
