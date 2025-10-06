import { type ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean; // controlled open state (from parent)
  onToggle?: () => void; // controlled toggle (from parent)
}

export default function AccordionSection({
  title,
  icon,
  children,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
}: AccordionSectionProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  // If parent provides isOpen → use that, else fallback to internal state
  const isOpen = controlledIsOpen ?? internalIsOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <div className="rounded-2xl p-4 mb-3 border border-purple-100 bg-white transition-all duration-200">
      <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            {icon}
          </div>
          <h4 className="text-lg md:text-xl font-semibold text-gray-900">
            {title}
          </h4>
        </div>
        <div className="text-purple-500">
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="mt-6 animate-fadeIn transition-all duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
