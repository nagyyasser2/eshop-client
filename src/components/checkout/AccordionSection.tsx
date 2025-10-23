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
    <div className="bg-white rounded-xl  overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isComplete ? "bg-blue-400" : "bg-blue-100"
            }`}
          >
            {isComplete ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <Icon className="w-4 h-4 text-white" />
            )}
          </div>
          <h2 className="text-lg font-semibold text-slate-600">{title}</h2>
        </div>
        <div className="text-blue-500">
          {isOpen ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </div>
      </button>

      {isOpen && <div>{children}</div>}
    </div>
  );
}
