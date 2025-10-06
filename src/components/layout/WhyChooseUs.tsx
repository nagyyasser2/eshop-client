import { FaShieldAlt, FaShippingFast, FaHeadset, FaSync } from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaShieldAlt className="text-xl sm:text-2xl" />,
      title: "Secure Payments",
      description:
        "All transactions are encrypted and secure. Your payment information is always protected.",
    },
    {
      icon: <FaShippingFast className="text-xl sm:text-2xl" />,
      title: "Fast Shipping",
      description:
        "Free shipping on orders over $50. Get your products delivered within 2-3 business days.",
    },
    {
      icon: <FaHeadset className="text-xl sm:text-2xl" />,
      title: "24/7 Support",
      description:
        "Our customer support team is available around the clock to assist you with any questions.",
    },
    {
      icon: <FaSync className="text-xl sm:text-2xl" />,
      title: "Easy Returns",
      description:
        "Not satisfied? Return within 30 days for a full refund. No questions asked.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-8 sm:py-10 lg:py-12">
      <div className="container mx-auto px-2 sm:px-6 lg:px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 w-full">
            <div className="text-center lg:text-left mb-8 lg:mb-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2 sm:px-0">
                <span className="bg-gradient-to-r from-blue-300 via-purple-400 to-pink-300 bg-clip-text text-transparent">
                  Why Choose Us
                </span>
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg px-2 sm:px-0 leading-relaxed">
                We're committed to providing an exceptional shopping experience
                with premium products, outstanding customer service, and values
                that put you first.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 px-2 sm:px-0">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-400">
                    10K+
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400">
                    5+
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    Years Experience
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-pink-400">
                    99%
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    Positive Reviews
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-500">
                    24/7
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    Customer Support
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image and Features Grid */}
          <div className="lg:w-1/2 w-full px-2 sm:px-0">
            <div className="relative">
              {/* Main Image */}
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Happy customer service representative helping a client"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg sm:rounded-xl shadow-md"
                />
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
