import { FaHeadset, FaLock, FaShippingFast, FaSync } from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaShippingFast className="text-xl sm:text-2xl lg:text-3xl" />,
      title: "Fast Shipping",
      description:
        "Free shipping on orders over $50. Get your products delivered within 2-3 business days.",
    },
    {
      icon: <FaSync className="text-xl sm:text-2xl lg:text-3xl" />,
      title: "Easy Returns",
      description:
        "Not satisfied? Return within 30 days for a full refund. No questions asked.",
    },
    {
      icon: <FaLock className="text-xl sm:text-2xl lg:text-3xl" />,
      title: "Secure Payments",
      description:
        "Your transactions are encrypted and protected with industry-leading security standards.",
    },
    {
      icon: <FaHeadset className="text-xl sm:text-2xl lg:text-3xl" />,
      title: "24/7 Support",
      description:
        "Need help? Our customer support team is available around the clock to assist you.",
    },
  ];

  return (
    <div className="container mx-auto px-2 sm:px-3 py-8 sm:py-12 lg:py-16">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <h4 className="text-lg sm:text-2xl font-semibold text-slate-700">
          Why Choose Us?
        </h4>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white  text-center flex flex-col items-center"
          >
            <div className=" text-slate-600 p-3 sm:p-4 rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base lg:text-lg">
              {feature.title}
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyChooseUs;
