import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "How long does shipping usually take?",
      answer:
        "We typically process orders within 1-2 business days. Domestic shipping takes 3-5 business days, while international shipping may take 7-14 business days depending on the destination.",
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for unused items in their original packaging. Returns are free for domestic customers. International return shipping fees are the responsibility of the customer.",
    },
    {
      id: 3,
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a confirmation email with a tracking number and link. You can also view order status and tracking information by logging into your account on our website.",
    },
    {
      id: 4,
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. You can see the exact costs during checkout before completing your purchase.",
    },
    {
      id: 5,
      question: "How do I contact customer support?",
      answer:
        "Our customer support team is available Monday-Friday, 9am-6pm EST. You can reach us via email at support@yourcompany.com, through the contact form on our website, or by calling +1 (555) 123-4567.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-left mb-12">
          <h4 className="text-md sm:text-xl lg:text-2xl font-normal mb-3 sm:mb-4 sm:px-0 text-slate-500">
            <span>Frequently Asked Questions</span>
          </h4>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl">
            Find quick answers to common questions about our products, shipping,
            returns, and more. Can't find what you're looking for? Contact our
            support team.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                className="flex justify-between items-center w-full py-5 text-left font-semibold text-slate-500 hover:text-blue-500 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span>{faq.question}</span>
                {activeIndex === index ? (
                  <FaMinus className="text-blue-500 flex-shrink-0 ml-4" />
                ) : (
                  <FaPlus className="text-gray-500 flex-shrink-0 ml-4" />
                )}
              </button>
              <div
                id={`faq-answer-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index
                    ? "max-h-96 opacity-100 pb-5"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
