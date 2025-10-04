import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    <div className="bg-gradient-to-br from-gray-50 to-white py-12 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-300 via-purple-400 to-pink-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about our products, shipping,
            returns, and more. Can't find what you're looking for? Contact our
            support team.
          </p>
        </div>

        {/* FAQ Items */}
        <div className=" mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                className="flex justify-between items-center w-full py-5 text-left font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span>{faq.question}</span>
                {activeIndex === index ? (
                  <FaChevronUp className="text-blue-600 flex-shrink-0 ml-4" />
                ) : (
                  <FaChevronDown className="text-gray-500 flex-shrink-0 ml-4" />
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
