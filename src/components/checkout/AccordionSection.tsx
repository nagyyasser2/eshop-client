import { Check, ChevronDown, ChevronUp } from "lucide-react";
import type { ReactNode } from "react";

interface AccordionSectionProp {
  title: string;
  icon: any;
  isOpen: boolean;
  onToggle: () => void;
  isComplete: boolean | undefined;
  children: ReactNode;
}

export default function AccordionSection({
  title,
  icon: Icon,
  isOpen,
  onToggle,
  isComplete,
  children,
}: AccordionSectionProp) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isComplete
                ? "bg-gradient-to-br from-green-500 to-green-600"
                : "bg-gradient-to-br from-purple-400 to-pink-300"
            }`}
          >
            {isComplete ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <Icon className="w-4 h-4 text-white" />
            )}
          </div>
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        </div>
        <div className="text-purple-600">
          {isOpen ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </div>
      </button>

      {isOpen && <div className="p-4 sm:px-8">{children}</div>}
    </div>
  );
}
